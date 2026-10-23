# Git workflow

The phases in [BUILD-PLAN.md](./BUILD-PLAN.md) are the work list. There are no GitHub issues.

## Branches and pull requests

- One branch and one pull request per phase, named `phase-<n>-<slug>`, for example `phase-4-pointer`.
- A phase's branch starts from the previous phase's branch, so work can continue before the user has merged anything. Each PR targets the previous phase's branch, and the first targets `main`. The user merges them in order.
- Never merge a PR. Only the user merges.
- Open the PR when the phase's checks pass (`npm test`, `npm run typecheck`, `npm run build`).
- When a phase is finished, mark it done in `BUILD-PLAN.md` so a fresh iteration knows where to resume.

## Commits

Conventional Commits, in English: `type(scope): summary`, with the summary in lowercase imperative.

- Types: `feat`, `fix`, `test`, `docs`, `refactor`, `chore`.
- Scopes follow the glossary: `hunt`, `pointer`, `arrival`, `admin`, `reveal`, `worker`, `photo-check`, `event-log`.
- One commit per passing iteration. Do not commit a failing test run, unless the commit is the test that exposes a known bug.
- Mention the phase in the body, for example `Phase 4`.

Example: `feat(arrival): require two consecutive qualifying readings`

## Pull request description

- What changed, in terms of the glossary.
- Which automated checks passed.
- What was not verified, especially anything that needs the user's iPhones (see [TESTING.md](./TESTING.md)).
- Any open question or assumption the user should review.

## Never do

- Push directly to `main`, by any route (`git push origin main`, a refresh of the local `main`, or an API call). The only exception is when the user explicitly and emphatically asks for it in that message. Branch protection may not be enabled, so nothing but this rule stops it. Without that explicit request, work on a branch and open a PR.
- Push a git tag, or run `wrangler deploy`. A tag deploys to her phone.
- Commit `.dev.vars`, tokens, the log-page token, or raw uncompressed media. The repo is public.
- Put real Codes or Puzzle answers in a PR description or commit message.
- Force-push a branch the user may have reviewed.
