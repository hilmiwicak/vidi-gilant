# Build plan

Target: ready by 26 November 2026. The celebration date itself is flexible (December or January is possible), and nothing about the build depends on it.

## Stack

Vite, React, TSX and Tailwind v4, on one Cloudflare Worker with static assets. State in `localStorage`. No database, no router, no map library.

## Foundation decisions

- Package manager: npm.
- Scaffold: `npm create cloudflare@latest -- <name> --framework=react` (from Cloudflare's React + Vite guide, which adds the Cloudflare Vite plugin, `worker/index.ts` and `wrangler.jsonc`). The project directory already has docs, so scaffold elsewhere and move the files in. Then add Tailwind v4, Vitest and Playwright.
- Set `compatibility_date` in `wrangler.jsonc` to the date of scaffolding.
- Deploys: tag-triggered, so pushing a tag is the only way a version reaches her phone. Planned mechanism is a GitHub Actions workflow on tag push using `cloudflare/wrangler-action`, with `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` stored as GitHub secrets, never in the repo. Cloudflare's own Workers Builds docs describe deploys on pushes to a production branch and say nothing about tags. The tag trigger is untested: verify it before relying on it.
- Cloudflare account: free plan (unconfirmed). The Rate Limiting binding, Workers AI and KV limits on it are listed in [WORKER.md](./WORKER.md).
- Repo is public, never commit `.dev.vars`, tokens or the log-page token. Raw uncompressed originals go in `media-raw/`, which `.gitignore` excludes; only compressed copies are committed.
- Dev ports are pinned in config (the harness injects `PORT=4099` and `NODE_ENV=production`).
- Tests: Vitest for logic and Worker, Playwright for visual regression.

## Order

Mark a phase `[x]` when its PR is open and its checks pass, so a fresh iteration knows where to resume. Phase 2 is done by the user with the agent in Pencil, never by a loop. A Ralph run stops at phase 2 until the user says the designs are approved.

1. [x] Foundation: project, Worker with static assets, Stop types, placeholder data for both Plans.
2. [x] **Design every screen with the user in Pencil.** Do not start the Ralph loop until the user approves. Screens: Welcome, Mission intro, Puzzle with Pointer, Arrival moment (the congratulation before each Reveal), Reveal, last-Stop congratulation, final screen, each "Having trouble" ladder step, Admin modal, photo capture. First settle the visual direction (palette, type, how much floral).
3. [ ] Core hunt: state machine, Welcome, Puzzle and Clue, Reveal, Boxes counter, a manual "I'm here" button, `localStorage` restore.
4. [ ] Pointer: GPS, distance, bearing, compass, Arrival rule, "Refresh location".
5. [ ] Fallbacks and Admin mode: Code, Master code, Admin modal, Capture here, Plan selection, `/a` and `/b`.
6. [ ] Resilience: service worker, update check, Reveal preload, on-device log.
7. [ ] Event log: Worker routes, queue and retry, token-protected log page, rate limits.
8. [ ] Photo check, Outline photo, then the eval script and the day-and-night test.
9. [ ] Polish and animation, only after everything above works.
10. [ ] Checklists below.

Use placeholder coordinates from Google Maps. Replace them with Capture here values on scouting visits.

## Content the user must supply

Choose the Stops (Plan A and Plan B) and write each Puzzle and Clue. Both Plans are drafted in [STOP.md](./STOP.md). Scout every Stop to record coordinates, one reference photo, the outline, and a Code. Prepare the shared Reveals (voice, video, song, text), the Master code and PIN, and the Welcome greeting.

## Checklists (to write properly once content exists)

**As soon as the date is fixed:** confirm the date, then reserve Supagetti, Prapanca for the dinner. The Monday of the Hunt's week is the deadline. Book a slot that works for the Plan he will pick (about 5 to 6pm for Plan A, about 8pm for Plan B), or pick the Plan before booking. See the reminder at the end of [STOP.md](./STOP.md).

**One week before:** both phones on the latest iOS; both install modes tested; real coordinates, photos, outlines and Codes in place; media compressed and under 25 MiB; full rehearsal of Plan A's Bintaro leg and Plan B's Jakarta leg; `/a` and `/b` tested; service worker update tested.

**Day before:** deployed build is the latest; weather and dinner booking checked; phones and a power bank charged.

**Morning of:** pick the Plan; install to Home Screen on her phone together with her; grant location, compass and camera permissions; preload Reveals on Wi-Fi; Low Power Mode off; her Focus mode off; auto-lock set long; Codes and Master code on a note.
