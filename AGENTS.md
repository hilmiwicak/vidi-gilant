Vidi is a birthday scavenger hunt web app for one person (his girlfriend), played on her iPhone and hosted on Cloudflare.

Vocabulary lives in [GLOSSARY.md](./GLOSSARY.md). Use those terms exactly (Stop, Puzzle, Clue, Reveal, Arrival, Fallback, Plan, and so on).

- All text she sees is mixed English/Indonesian.
- Design the screens with the user in Pencil (pen.dev) before any Ralph loop. See [docs/BUILD-PLAN.md](./docs/BUILD-PLAN.md).
- Visual system, design rules and Pencil tips: [docs/DESIGN.md](./docs/DESIGN.md) (design source: `design/vidi-gilant.pen`)
- Hunt behaviour and rules: [docs/HUNT.md](./docs/HUNT.md)
- Stop content (places, Puzzles, Clues, the reservation reminder): [docs/STOP.md](./docs/STOP.md). Read it only when the work touches hunt content; it holds personal writing, so it is not part of the always-read set.
- Worker, Photo check, Event log, rate limits: [docs/WORKER.md](./docs/WORKER.md)
- Tests and what only real iPhones can verify: [docs/TESTING.md](./docs/TESTING.md)
- Branches, commits, pull requests: [docs/GIT.md](./docs/GIT.md)

This project uses npm. Commands (created in the foundation phase): `npm test`, `npm run typecheck`, `npm run build`.

Never push a git tag or run `wrangler deploy`: a tag deploys to her phone, and only the user decides when. Dev ports are pinned in config; the harness injects `PORT` and `NODE_ENV`, so don't trust them.
