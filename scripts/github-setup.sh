#!/usr/bin/env bash
# Configure GitHub repository settings for the NX monorepo release strategy.
#
# Usage:
#   ./scripts/github-setup.sh                          # no production reviewers
#   ./scripts/github-setup.sh alice bob                # add reviewers to production
#
# Requirements:
#   - gh CLI authenticated (gh auth login)
#   - Run from within the repo directory
#   - Repo must already exist on GitHub (git remote origin set)

set -euo pipefail

# ── Detect repo ─────────────────────────────────────────────────────────────
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || true)
if [ -z "$REPO" ]; then
  echo "Error: could not detect GitHub repository."
  echo "Make sure 'gh auth login' has been run and you are inside the repo directory."
  exit 1
fi

echo "Configuring: $REPO"
echo ""

# ── 1. Merge strategy ────────────────────────────────────────────────────────
echo "→ [1/4] Setting merge strategy (squash only, PR title as commit message)..."
gh api --method PATCH "repos/$REPO" \
  --field allow_squash_merge=true \
  --field allow_merge_commit=false \
  --field allow_rebase_merge=false \
  --field squash_merge_commit_title="PR_TITLE" \
  --field squash_merge_commit_message="BLANK" \
  --silent
echo "      Done."

# ── 2. Branch protection on main ─────────────────────────────────────────────
# Status check names are "<workflow name> / <job name>" as they appear in
# GitHub Actions. They are accepted by the API even before the first run.
#
# bypass_pull_request_allowances: the 'github-actions' app is allowed to push
# directly to main (needed for the chore(release): publish commit).
echo "→ [2/4] Configuring branch protection on main..."
gh api --method PUT "repos/$REPO/branches/main/protection" \
  --header "Accept: application/vnd.github+json" \
  --input - << 'PAYLOAD'
{
  "required_status_checks": {
    "strict": false,
    "contexts": [
      "PR / Validate PR title",
      "PR / Lint",
      "PR / Test",
      "PR / Build"
    ]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": false,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 1,
    "bypass_pull_request_allowances": {
      "users": [],
      "teams": [],
      "apps": ["github-actions"]
    }
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
PAYLOAD
echo "      Done."

# ── 3. Staging environment ───────────────────────────────────────────────────
echo "→ [3/4] Creating 'staging' environment (no protection)..."
gh api --method PUT "repos/$REPO/environments/staging" --silent
echo "      Done."

# ── 4. Production environment ────────────────────────────────────────────────
echo "→ [4/4] Creating 'production' environment..."
if [ "$#" -gt 0 ]; then
  # Look up reviewer IDs from provided usernames and build JSON array
  REVIEWERS=$(
    for USERNAME in "$@"; do
      USER_ID=$(gh api "users/$USERNAME" --jq '.id')
      echo "{\"type\":\"User\",\"id\":$USER_ID}"
    done | jq -s '.'
  )

  gh api --method PUT "repos/$REPO/environments/production" \
    --input - <<EOF
{
  "reviewers": $REVIEWERS,
  "deployment_branch_policy": null
}
EOF
  echo "      Done. Reviewers: $*"
else
  gh api --method PUT "repos/$REPO/environments/production" --silent
  echo "      Done. No reviewers set yet."
  echo "      Add them at: https://github.com/$REPO/settings/environments"
fi

echo ""
echo "All done! Summary:"
echo "  ✓ Merge strategy: squash only, PR title as commit message"
echo "  ✓ Branch protection on main:"
echo "      Required checks: PR / Validate PR title, PR / Lint, PR / Test, PR / Build"
echo "      Required approvals: 1"
echo "      GitHub Actions bot: bypasses PR requirement (for release commits)"
echo "  ✓ Environment 'staging': auto-deploys"
echo "  ✓ Environment 'production': requires approval"
echo ""
echo "Note: required status checks become 'active' only after the PR workflow"
echo "runs on the first pull request. They are registered correctly in the API"
echo "already and will resolve automatically."
