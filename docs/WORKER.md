# Worker

One Cloudflare Worker serves the static site and three routes. Hosting is Workers with static assets, not Pages. Use `run_worker_first` only for the API and log routes so static files never invoke the Worker.

| Route | Caller | Purpose |
|---|---|---|
| Photo check | Her app | Compare her photo with a Stop's reference photo |
| Event write | Her app | Save progress and error events |
| Log page | He, on his phone or laptop | Read recent events, behind a token |

Everything else (Codes, PIN, Master code, Admin tools, Boxes counter, Plan) is client-side.

## Photo check

- The phone resizes the photo to about 1024 px JPEG before sending, and sends only `{ stopId, photo }`.
- The Worker fetches the reference photo itself and calls the vision model through one swappable function. Start with Workers AI; an external model is the alternative if accuracy is poor.
- The model returns `{ verdict: "match" | "no_match" | "unsure", reason }`. The prompt says to ignore lighting, weather, people, vehicles and camera angle, and to answer `no_match` only when the photo is clearly a different place.
- Any failure (timeout, error, 429, no signal) is treated as "skip to the Outline photo". It must never block her.
- Free-plan CPU time per request is 10 ms. Do not decode or resize images in the Worker.
- Keep the prompt in its own file. The eval script (run by hand, not part of `npm test`) runs fixtures of same-day, same-night and other-place photos against a reference. This is also the go/no-go test: **one reference photo must pass with both a day and a night photo.** If it does not, stop and discuss with the user.

## Event log

- Contains progress and errors only (Stop reached, Fallback used, Photo check result, app errors, timestamps). **Never** location, accuracy or distance. Those stay in the on-device log in Admin mode.
- The app queues events in `localStorage` and retries. A failed upload never affects the Hunt.
- Store in KV with a 30-day expiry. Key by time, for example `evt:<timestamp>:<random>`. The free plan allows 1,000 KV writes a day, so batch events into few keys.
- The log page needs a long random token held as a Worker secret, compared in constant time.

## Rate limits

Use the Worker Rate Limiting binding (period must be 10 or 60 seconds; counts are approximate and per Cloudflare location). Rate limits exist to stop a runaway script, not to restrict her.

- Photo check and Event write: loose, around 20 to 30 per minute, plus a body-size cap, JPEG-only check, and `stopId` validated against the real list.
- Log page: strict (for example 5 per 10 seconds) plus the token.
- A 429 must degrade gracefully: Photo check skips to the Outline photo, events stay queued.

## Updates

A service worker caches the app. On the Welcome screen only, the app checks for a newer build and reloads once. The build hash is visible in Admin mode.

## Unverified (check before relying on these)

- Whether the Rate Limiting binding is available on the free plan.
- How to send two images to a Workers AI vision model. The Llama 3.2 Vision tutorial uses a single `image` field; the Llama 4 Scout docs list vision support but show no image parameter. Fallback options: the OpenAI-compatible chat endpoint, describing each photo separately and comparing the text, or an external model.
- Whether Workers AI free-tier overuse stops the feature or bills.
- KV `list` page size.
