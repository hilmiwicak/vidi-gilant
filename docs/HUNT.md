# Hunt behaviour

Read [GLOSSARY.md](../GLOSSARY.md) first. This file covers rules the glossary leaves out.

## Flow

Welcome, then for each Stop: Puzzle and Pointer while travelling, Arrival, Reveal. Before the final Stop's Puzzle, a "you're heading to the last Stop" screen. The last Stop is the dinner; its name stays hidden until Arrival. The dinner has a final Reveal and an ending screen, and no Puzzle after it.

Each Stop owns the Puzzle that leads to it. The Welcome shows Puzzle 1, Stop 1's Reveal is followed by Puzzle 2, and so on.

## Welcome

Not a Stop: no Arrival, no Fallbacks. Order: a Start button that requests location and compass permission, a birthday greeting (animation or video), the Mission intro, then Puzzle 1.

## Puzzle screen (top to bottom)

Boxes counter pill (floating), Puzzle text, "Need a Clue?" button, arrow, distance, "Refresh location", "Having trouble?" link.

- Puzzles are never graded: no answer field, no wrong answers, no skip button, no solved state.
- The Clue button is always available. The Clue text shows only when she presses it.
- If she is still stuck, he gives other clues himself, or the Code.

## Pointer

- Arrow and distance are always shown. Distance over 1 km displays in km.
- No Maps link and no place names, ever.
- Arrow only if the compass works; otherwise distance-only text. The Start button requests compass permission (it needs a tap on iOS).
- Wake Lock is not used. When the app becomes visible again it fetches a fresh position immediately and shows "Updating…" until a reading arrives. "Refresh location" does the same on demand.

## Arrival

Automatic when she is within the Stop's radius (default 50 m, optional per-Stop override) and reported accuracy is at most 50 m, on two consecutive readings. Readings with accuracy worse than 100 m are ignored.

## Fallback ladder

"Having trouble?" is always visible. Steps unlock in order; the Pointer stays on.

1. **Photo check.** She photographs the place. The AI compares it with the Stop's single reference photo. A `match` or `unsure` verdict gives Arrival. A `no_match` shows a gentle message ("Hmm, I'm not sure that's it. Try another angle?"). After 2 `no_match` results, step 2 appears. If the model call fails or is rate limited, go straight to step 2. Details in [WORKER.md](./WORKER.md). Photo check is mandatory for every Stop.
2. **Outline photo.** The outline of a distinctive shape (roofline, window) is shown on screen. She then opens the native camera and photographs it. Accepted without verification. (A live in-app camera overlay is a later upgrade.)
3. **Code.** A per-Stop Code he tells her. Checked in the browser.
4. **Admin mode** on her phone, as the last resort.

## Reveal

Voice message, video, song (Spotify embed), or text. The play button is large and clearly labelled ("Tap to play the video"), because iOS blocks autoplay. "Continue" is always available, even if she never presses play. She may watch it later while travelling. Reveals are shared across both Plans.

## Plans

| | Plan A | Plan B |
|---|---|---|
| Start | Late morning | After he picks her up from work in Jakarta |
| Stops | 3 around Bintaro, 1 to 2 in Jakarta, then dinner | 3 close together in Jakarta, then dinner |
| Dinner | About 5 to 6pm | About 8pm |
| Mission | Yes | Optional (counter hidden by default, enabled in Admin mode) |

- Same dinner Stop in both Plans. Stops are in linear order.
- He picks the Plan before the Welcome, via `/a` or `/b` links (to be tested on iOS; fall back to Admin mode if the link does not persist). It never changes mid-Hunt. Switching is possible only at the Welcome and resets progress.
- Each Stop must work at the Plan's hour: reachable and safe, something lit or recognisable for the reference photo, and it does not need to be open.
- Keep the Hunt to about 2.5 to 3 hours before dinner.

## Mission and Boxes counter

She hands out 10 to 20 prepared food boxes. The counter has +1 and -1, no target, no verification, and never gates progress. The ending screen shows the total (only if the counter was used).

## Admin mode

On-device only, no remote control. Opened by 5 taps within 3 seconds on a fixed invisible zone at the top center of every screen and every Stage (on the Puzzle screen it sits over the Boxes counter label, and stays in place when the counter is hidden in Plan B), then a PIN, or by typing the Master code into the Code field. The tap zone does nothing on a single tap. Shown as a modal, with no "test mode" banner. It can force Arrival, jump to any Stop, reset progress, set the Boxes count, choose the Plan, and show the build hash and the on-device log. **Capture here** shows current lat, lng and accuracy, used on scouting visits to record each Stop's real coordinates.

## Persistence

After every change, save to `localStorage`: current Stop and phase, Fallback ladder step, Boxes count, Plan. A reload returns her to exactly where she was. Home Screen and Safari storage are separate on iOS, so set the Plan inside the installed app (or install from the Plan link).

## Privacy

Her location is computed on her phone and never sent anywhere. Her photos live only for one request and are not stored. Codes, the PIN and the Master code live in the app and are checked in the browser; he accepts that the page source reveals them.

## Data shape

Two arrays, `planA` and `planB`, of Stops, plus shared Reveals.

```ts
type Stop = {
  id: string;
  name: string;               // hidden until Arrival
  lat: number;
  lng: number;
  radiusM?: number;           // overrides the 50 m default
  puzzle: { question: string; clue: string };  // leads TO this Stop
  referencePhoto: string;     // one photo, chosen to look the same by day and night
  outlineImage: string;
  code: string;
};

type Reveal =
  | { type: "text"; body: string }
  | { type: "voice" | "video"; src: string }
  | { type: "song"; spotifyUri: string };
```

## Look

Warm and playful, one high-contrast theme (readable in sun glare and at night), large type, big tap targets, the Pointer dominating the Puzzle screen. She likes whimsical and floral styles, used sparingly. Tailwind v4.

## Media

Static files up to 25 MiB each; use R2 if a file is bigger. Compress voice and video. Preload Reveals on Wi-Fi before leaving. Cache failures on video are acceptable.
