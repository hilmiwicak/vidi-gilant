---
commands:
  - name: tests
    run: npm test
    timeout: 120
    acceptance: true
  - name: typecheck
    run: npm run typecheck
    timeout: 180
    acceptance: true
  - name: build
    run: npm run build
    timeout: 240
    acceptance: true
  - name: lint
    run: npm run lint
    timeout: 120
    acceptance: true
  - name: format
    run: npm run format:check
    timeout: 120
    acceptance: true
  - name: git-state
    run: git status --short && git branch --show-current && git log --oneline -10
    timeout: 30
  - name: pr-state
    run: >-
      gh pr list --state all --limit 20 --json number,state,headRefName,baseRefName,title,url 2>/dev/null || { echo 'GitHub CLI is not authenticated or unavailable'; exit 1; }
    timeout: 60
max_iterations: 50
inter_iteration_delay: 2
items_per_iteration: 1
reflect_every: 4
timeout: 600
completion_promise: PHASE_3_READY_FOR_REVIEW
completion_gate: required
required_outputs:
  - OPEN_QUESTIONS.md
stop_on_error: true
guardrails:
  block_commands:
    - 'git\s+push\s+(?:[^\n]*\s)?main(?:\s|$)'
    - 'git\s+push\s+.*--tags'
    - 'git\s+tag(?:\s|$)'
    - 'git\s+push\s+.*--force'
    - 'git\s+reset\s+--hard'
    - 'git\s+merge(?:\s|$)'
    - 'gh\s+pr\s+merge(?:\s|$)'
    - 'gh\s+pr\s+close(?:\s|$)'
    - 'wrangler\s+(?:deploy|versions\s+upload)(?:\s|$)'
    - 'npm\s+publish(?:\s|$)'
  protected_files:
    - '.env*'
    - '.dev.vars*'
    - 'media-raw/**'
    - '*.pem'
    - '*.key'
    - 'design/**'
    - 'design/**/*.pen'
    - 'docs/STOP.md'
    - 'policy:secret-bearing-paths'
---

## Runbook

Run from the repository root. The Ralph commands are Pi slash commands, not shell commands.

One-time setup:

```text
pi list | grep '@lnilluv/pi-ralph-loop'
```

If the extension is not listed, install it with `pi install npm:@lnilluv/pi-ralph-loop`, then run `/reload` or restart Pi. Do not run `/ralph` through Bash.

Start the campaign with:

```text
/ralph --path ./ralph
```

After the user merges a phase PR and deletes its branch, resume with:

```text
/ralph-resume ./ralph
```

Useful controls are `/ralph-status ./ralph --summary`, `/ralph-stop ./ralph`, `/ralph-cancel ./ralph`, and `/ralph-logs --path ./ralph`. Do not use `--parallel` for this repository.


This is a Phase 3-only Ralph run. Phase 1 Foundation and Phase 2 Pencil design are complete. Do not implement or begin any later phase.

## Orientation

You are an autonomous coding agent running in a loop. Each iteration starts with a fresh context. Progress lives in the code, git history, and `RALPH_PROGRESS.md`.

{{ commands.tests }}

{{ commands.typecheck }}

{{ commands.build }}

{{ commands.lint }}

### Repository state

{{ commands.git-state }}

### Pull requests

{{ commands.pr-state }}

## Task

Implement only Phase 3, **Core hunt**, from `docs/BUILD-PLAN.md`: the state machine, Welcome, Puzzle and Clue, Reveal, Boxes counter, manual "I'm here" button, and `localStorage` restore.

Start from the current `main` and create `phase-3-core-hunt` if it does not already exist. Work in small, complete vertical slices. Do not implement Pointer, GPS, compass, automatic Arrival, Fallbacks, Admin mode, service worker, Event log, Photo check, or Polish behavior.

Before each iteration, inspect the current branch and PR state. If an open Phase 3 PR already exists, do not change it unless the user explicitly asks for fixes. If the working tree is unrelated or the branch is not based on current `main`, stop instead of guessing.

Work on one small, complete vertical slice per iteration. Add or update automated tests with behavior changes. Run the relevant checks before committing. Commit only passing iterations using the Conventional Commit rules in `docs/GIT.md`, with Phase 3 in the commit body.

When Phase 3 is complete:

1. Run `npm test`, `npm run typecheck`, `npm run build`, `npm run lint`, and `npm run format:check`.
2. For every implemented screen, capture the running localhost screen and compare it with the corresponding approved Pencil frame. Fix meaningful differences before continuing.
3. Mark only Phase 3 complete in `docs/BUILD-PLAN.md` when the Phase 3 PR is ready.
4. Push only `phase-3-core-hunt` and open its PR targeting `main`. If either operation fails, do not emit the completion promise.
5. Update `OPEN_QUESTIONS.md` with remaining Phase 3 questions and manual blockers. It must exist and have no unresolved P0 or P1 items before the completion promise.
6. Summarize the automated evidence, manual checks still required, and open questions.
7. Stop with `<promise>PHASE_3_READY_FOR_REVIEW</promise>` and wait for the user to review and merge the PR.

The user must merge the PR. This run must not begin Phase 4.

## Phase 3 boundary

- Implement the state machine, Welcome, Puzzle and Clue, Reveal, Boxes counter, manual "I'm here" button, and `localStorage` restore.
- Do not implement GPS, bearing, compass, automatic Arrival, Fallbacks, Admin mode, service worker, Event log, Photo check, Outline photo, or Polish behavior.
- The Pointer may be a clearly marked static placeholder where Phase 3 needs the layout. Real Pointer behavior belongs to Phase 4.
- Stop for user-supplied content rather than inventing personal writing, final Reveals, Codes, PINs, Master code, coordinates, media or manual-test results.

## Rules

- Use the glossary terms exactly.
- Read the relevant docs before each phase. `GLOSSARY.md`, `docs/BUILD-PLAN.md`, `docs/GIT.md`, `docs/HUNT.md`, `docs/DESIGN.md`, `docs/WORKER.md`, and `docs/TESTING.md` are authoritative. Read `docs/STOP.md` only when the task genuinely touches hunt content, and never alter its personal content without explicit user input.
- The approved Pencil design in `design/vidi-gilant.pen` is the visual source of truth for Phase 3 screens. Compare implemented screens with their approved Pencil frames in the normal interactive session. Do not ask for another Pencil approval or edit `.pen` files.
- Do not claim visual completion without inspecting the relevant Pencil frame and localhost screenshot together. Fix meaningful differences before completing the phase.
- No fabricated content, coordinates, media, Codes, PINs, Master code, personal writing, or manual-test results. Use an explicit placeholder or stop for the user.
- Keep location computation on the phone. Do not put her location, accuracy, or distance in the Event log.
- Do not add a router or map library. Use `localStorage` for Hunt state as specified.
- Do not push `main`, push tags, deploy, merge PRs, force-push, or publish packages. Only push the current phase branch and open its PR after its checks pass.
- Never commit secrets, `.env`, `.dev.vars`, raw media, or log tokens.
- Do not resolve PR conversations or approve a PR. The user reviews, resolves, and merges.
- Do not mark a phase complete merely because code exists. Require the checks and the PR boundary described above.
- Do not claim a manual iPhone check passed unless the user reports it.

## Completion

For Phase 3, stop with `<promise>PHASE_3_READY_FOR_REVIEW</promise>` only when the Phase 3 implementation and tests pass, the phase branch is pushed, and its PR targeting `main` is open. Do not mark Phase 4 complete or begin Phase 4. The user must review and merge the PR.

The later phases are intentionally out of scope for this run.

Iteration {{ ralph.iteration }} of {{ ralph.name }}.
