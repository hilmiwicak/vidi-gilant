# Testing

## Automated (the Ralph loop can run these)

Each phase ends with tests and typecheck passing.

- Distance and bearing, meters vs km formatting
- Arrival rule: radius, accuracy limits, two consecutive readings
- Stop state machine, Plan A and B loading, `localStorage` restore
- Code, PIN and Master code checks
- Photo check Worker with a mocked model, including failure and 429 paths
- Event log queueing, retry and expiry
- Visual regression with Playwright `toHaveScreenshot()`, in a mobile WebKit viewport with a mocked GPS position. Snapshots are updated only on purpose. A failing screenshot is a signal for the user to review, never something to auto-fix.

Do not run the real model in `npm test`.

## Visual design check (interactive, not Ralph)

Screens are designed in Pencil, then turned into React and Tailwind. The Pencil browser tool loads the localhost page and screenshots it for comparison against the design. This needs the Pencil desktop app, so it runs in a normal session with the user, not in a Ralph loop. Approved screenshots become the Playwright baselines.

## Manual (only the user's two iPhones can verify)

- Real GPS accuracy and drift, compass behaviour and permissions
- Home Screen install, and whether `/a` and `/b` persist
- Reveal playback and the Spotify embed
- Camera capture, and the real Photo check
- Service worker update path
- The Bintaro leg of Plan A and the Jakarta leg of Plan B on real streets

## Unverified

Playwright's emulated WebKit is not iOS Safari. Treat it as a regression aid only.
