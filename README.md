# nx-release-test

NX monorepo with automated versioning, Docker image publishing, and staged deployments.

## Structure

```
apps/
  toolbox/            Next.js web application
  storybook/          Storybook UI documentation
  sample-dotnet-app/  ASP.NET Core API
libs/
  ui/                 Shared React component library
  config/             Shared Biome and TypeScript configuration
```

Each app under `apps/` that contains a `Dockerfile` gets a Docker image built and published on release.

## Development setup

**Prerequisites:** Node 20+, pnpm 10.24+, .NET 10 SDK, Docker

```bash
pnpm install

# Run an app locally
pnpm exec nx run toolbox:docker:run
pnpm exec nx run storybook:docker:run
pnpm exec nx run sample-dotnet-app:docker:run
```

---

## PR workflow

Every pull request to `main` runs four parallel checks:

| Check | What it does |
|-------|-------------|
| `validate-pr-title` | Enforces Conventional Commits format on the PR title |
| `lint` | Runs lint on all affected projects |
| `test` | Runs tests on all affected projects |
| `build` | Builds all affected projects |

All four must pass before merge. Only squash merges are allowed — the PR title becomes the squash commit message, which drives automatic versioning.

---

## Commit convention

| Type | Version bump | Changelog entry |
|------|-------------|----------------|
| `feat: …` | minor (`0.x.0`) | Yes — Features |
| `feat!: …` or `BREAKING CHANGE` footer | major (`x.0.0`) | Yes — Breaking Changes |
| `fix: …` | patch (`0.0.x`) | Yes — Bug Fixes |
| `perf: …` | none | Yes — Performance |
| `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `test:`, `build:` | none | No |

Scope is optional: `feat(toolbox): add export button` groups the entry under **toolbox** in the changelog.

---

## Release process

Merging to `main` triggers the release workflow automatically.

### Step-by-step

1. **Version** — `git-cliff` reads commits since the last tag and calculates the next SemVer version. If no version-bumping commits exist (`chore:` only, for example), the workflow exits cleanly with no release.

2. **Changelog** — `CHANGELOG.md` is regenerated and committed back to `main` with message `chore(release): publish [skip ci]`. A git tag (`v1.4.0`) is created and pushed.

3. **Affected apps** — NX determines which apps changed since the previous release tag. Only those apps get Docker images built and pushed.

4. **Docker build** — For each affected app, `nx run <app>:docker:build` compiles the app and builds the image. Two tags are pushed to GHCR:
   - `ghcr.io/<org>/<app>:<version>` — immutable versioned image
   - `ghcr.io/<org>/<app>:staging` — mutable staging pointer

5. **GitHub Release** — A GitHub Release is created with the changelog body and a list of published images.

6. **Staging deployment** — Affected apps are deployed to the `staging` environment automatically using the `:staging` tag.

7. **Production deployment** — Requires manual approval from a configured reviewer. On approval, the versioned image is re-tagged as `:latest` and deployed to production.

### Race condition protection

Two PRs merged in quick succession are handled safely by two mechanisms:
- **Concurrency group `release-pipeline`** with `cancel-in-progress: false` queues the second run rather than cancelling it.
- **Checkout on trigger SHA** ensures each run reads only the commits that belong to its own merge, never HEAD.

### No release scenario

If a push to `main` contains only non-bumping commits (`chore:`, `ci:`, `docs:`, etc.), the release job detects this, logs "No version-bumping commits found" and exits cleanly. No tag, no changelog update, no Docker builds.

---

## Docker images

Images are published to GitHub Container Registry:

```
ghcr.io/<org>/toolbox:<version>          # versioned, immutable
ghcr.io/<org>/toolbox:staging            # updated on every release
ghcr.io/<org>/toolbox:latest             # updated on production approval

ghcr.io/<org>/storybook:<version>
ghcr.io/<org>/storybook:staging
ghcr.io/<org>/storybook:latest

ghcr.io/<org>/sample-dotnet-app:<version>
ghcr.io/<org>/sample-dotnet-app:staging
ghcr.io/<org>/sample-dotnet-app:latest
```

`<org>` is the GitHub organization or user that owns this repository (`${{ github.repository_owner }}`).

All images include OCI standard labels (`title`, `source`, `revision`, `created`) and `APP_VERSION` / `BUILD_DATE` build args baked in.

---

## Manual GitHub setup

The following must be configured in the repository settings before the workflow goes live.

### Branch protection on `main`

Settings → Branches → Add rule for `main`:

- [x] Require a pull request before merging
- [x] Require status checks to pass: `validate-pr-title`, `lint`, `test`, `build`
- [x] Allow squash merging only (disable merge commits and rebase merge)
- Use pull request title as the squash commit message
- [x] Allow specified actors to bypass required pull requests → add **GitHub Actions** bot (needed for the release workflow's `chore(release): publish` commit)

### GitHub Environments

Settings → Environments:

| Environment | Protection |
|-------------|------------|
| `staging` | None — deploys automatically |
| `production` | Required reviewers — add team members who approve production deployments |
