# Testing

## Automated (the Ralph loop can run these)

Each phase ends with tests, typecheck, build, lint and Prettier (`npm run format:check`) passing. Code style is Prettier's, configured in `.prettierrc.json`; do not hand-format around it.

- Distance and bearing, meters vs km formatting
- Arrival rule: radius, accuracy limits, two consecutive readings
- Stop state machine, fixed Stop sequence, `localStorage` restore
- Mission intro Stage order and Boxes counter visibility throughout the Hunt
- Code, PIN and Master code checks
- Photo check Worker with a mocked model, including failure and 429 paths
- Event log queueing, retry and expiry

Do not run the real model in `npm test`.

## Visual design check (interactive, not Ralph)

Screens are designed in Pencil, then turned into React and Tailwind. The approved frames in `design/vidi-gilant.pen` are the visual source of truth. Use the Pencil browser tool to load the localhost page and capture the corresponding implemented screen, then inspect the Pencil frame and localhost screenshot together. Fix meaningful differences before calling the screen complete.

This is a manual visual comparison, not an automated test. The `.pen` file is not parsed by the app or compared by a test runner. A localhost screenshot is evidence for the current review, not a committed snapshot baseline.

## Manual (only the user's two iPhones can verify)

- Real GPS accuracy and drift, compass behaviour and permissions
- Home Screen install, and `localStorage` restoration in the installed app
- Reveal playback and the Spotify embed
- Camera capture, and the real Photo check
- Service worker update path
- The full Stop sequence—Lot 17, Cold Moo, then Supagetti—on real streets

## Unverified

A desktop or simulated browser is not iOS Safari. Treat the localhost visual comparison as a design regression aid, not proof of iPhone behavior.
