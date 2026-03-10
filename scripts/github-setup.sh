#!/usr/bin/env bash
# Configure GitHub repository settings for the NX monorepo release strategy.
#
# Usage:
#   ./scripts/github-setup.sh
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
  --field squash_merge_commit_message="COMMIT_MESSAGES" \
  --field delete_branch_on_merge=true \
  --silent
echo "      Done."

# ── 2. Branch protection on main ─────────────────────────────────────────────
# No required status checks on main — checks are enforced at PR level via
# pr.yml. PR reviews are required; release PRs are merged by humans.
echo "→ [2/4] Configuring branch protection on main..."
gh api --method PUT "repos/$REPO/branches/main/protection" \
  --header "Accept: application/vnd.github+json" \
  --input - << 'PAYLOAD'
{
  "required_status_checks": null,
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": false,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 1
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
PAYLOAD
echo "      Done."

# ── 3. Workflow permissions ───────────────────────────────────────────────────
# Allow GitHub Actions to create pull requests (needed by release-prepare.yml).
# Requires the org-level policy to permit this first.
echo "→ [3/4] Enabling GitHub Actions to create pull requests..."
gh api --method PUT "repos/$REPO/actions/permissions/workflow" \
  --field default_workflow_permissions="write" \
  --field can_approve_pull_request_reviews=true \
  --silent
echo "      Done."

# ── 4. Labels ─────────────────────────────────────────────────────────────────
echo "→ [4/4] Creating labels..."
gh label create "release" --description "Release PR" --color "0052cc" --repo "$REPO" 2>/dev/null \
  && echo "      Created 'release' label." \
  || echo "      'release' label already exists, skipping."

echo ""
echo "All done! Summary:"
echo "  ✓ Merge strategy: squash only, PR title as commit, branch commits as body, auto-delete branches"
echo "  ✓ Branch protection on main: required approvals: 1, no force pushes"
echo "  ✓ GitHub Actions: write permissions, can create pull requests"
echo "  ✓ Label 'release' exists"
echo ""
echo "Note: staging and production environments are referenced by the CI/release"
echo "workflows. GitHub auto-creates them on first use. Add protection rules"
echo "(reviewers, deployment branches) manually at:"
echo "  https://github.com/$REPO/settings/environments"
