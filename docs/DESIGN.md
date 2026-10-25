# Design

Visual system and working rules for the Pencil (pen.dev) designs. Source file: [`design/vidi-gilant.pen`](../design/vidi-gilant.pen). Phase 2 of [BUILD-PLAN.md](./BUILD-PLAN.md) is done in Pencil with the user, one screen at a time, and the user approves each before the next.

## Direction

Warm, playful, whimsical. Florals sparingly. High contrast and readable in sun glare and at night. Large type. Tap targets at least 56 px. Frame width: iPhone 390. Stage frames are 844 high. The Puzzle screen and any other screen that scrolls grow in height with their content.

## Colors

Bind fills to the variables in the `.pen` file. Do not hard-code hex values. The "Color Palette" board in the file shows every token.

| Variable | Value | Use |
|---|---|---|
| `ground` | `#FFFFFF` | Screen background |
| `surface` | `#FFFFFF` | Counter pill, outline button fill |
| `ink` | `#231815` | Text, primary button, outlines |
| `ink-soft` | `#5A4A44` | Secondary text |
| `accent` | `#B8290F` | Handwritten name and phrases, decoration |
| `gold` | `#FFB627` | Pointer disc, small decorative icons |
| `on-ink` | `#FFFFFF` | Text on `ink` and `accent` |
| `flower-tint` | `#B8290F1A` | Faint flower tint (unused so far) |

Contrast (checker: `python3 /Users/wicak/.local/lib/anti-slop/skills/antislop-human/contrast-check.py <fg> <bg>`):

| Pair | Ratio | Verdict |
|---|---|---|
| `ink` on white | 17.3:1 | Any text |
| `ink-soft` on white | 8.4:1 | Any text |
| `accent` on white | 6.25:1 | Any text |
| `ink` on `gold` | 9.9:1 | Any text |
| `accent` on `gold` | 3.56:1 | Large type only (24 px and up, or 19 px bold and up). Never body text or small labels |

Recompute the affected pairs whenever a token changes.

## Type

| Role | Font | Variable |
|---|---|---|
| Display | Bricolage Grotesque | `font-display` |
| Body | Outfit | `font-body` |
| Handwritten (names, sign-offs, the Puzzle's middle line) | Caveat | `font-hand` |
| System status bar only | Inter | `font-system` |

## Spacing and shape

`space-xs` 8, `space-sm` 12, `space-md` 20, `space-lg` 28. `radius-control` 20, `radius-pill` 28. `tap-min` 56.

## Icons

Material Symbols Rounded, weight 600, hollow (unfilled). Do not mix in another pack. Browse names at fonts.google.com/icons with the Rounded style selected. Pencil has no icon browser: an icon is a layer with a library and a name, set in the properties panel.

If a name renders blank, try the nearest one (`camera_alt` does not exist, use `photo_camera`). The Boxes counter icon is `takeout_dining`.

## Components

Reusable components in the file. Use refs to them, not copies.

- Status Bar
- Boxes Counter (56 px minus and plus buttons)
- Button Primary (ink, 60 px, icon and label)
- Button Outline
- Text Link (with the "at the location?" sub-line)
- Flower - Red and Gold, Flower Sprig - Red and Gold, Flower Lily - White (she likes lilies)
- Color Swatch

Screens are plain frames. The flower SVGs have colors baked into their paths, so changing `accent` or `gold` does not recolor them.

## Stages

A Stage is one tap-to-advance frame inside a screen. Welcome, Mission intro, the last-Stop screen and the final screen are sequences of Stages, one frame per Stage. The Puzzle screen is one stacked screen. Animation and transitions are deferred to phase 9 (Polish).

## Admin mode tap zone

Every screen and every Stage gets an invisible 124x56 px frame named "Admin tap zone (invisible)" at x 133, y 62 (top center, under the status bar). On the Puzzle screen it sits over the Boxes counter label and stays in place when the counter is hidden in Plan B. See HUNT.md for the 5 taps, 3 seconds and PIN.

## Ornaments

- Whole flowers bleeding off opposite corners: the centre stays visible, never a thin sliver, never overlapping text, buttons, or the Pointer.
- A few small gold or red icons (star, favorite, celebration, sunny, cake). No loose dots, which read as punctuation.
- Quietest on the Puzzle screen.
- A pink ground with sparse florals is a later "beautify" pass, after the main layouts.

## Puzzle screen order

Top to bottom: Boxes counter pill (floating), Puzzle text, "Need a Clue?" button, Pointer arrow, distance, "Refresh location", "Having trouble" link with the italic sub-line "at the location?". The screen can scroll, so the link may sit below the fold. Plan B hides the counter by default and the top stays empty; the tap zone stays in place. No Maps link or place names ever. The dinner name stays hidden until Arrival. The Pointer shows "Updating..." in place of the distance while refreshing, and the arrow dims. A weak-signal note appears when accuracy is poor. Distances over 1 km show in km. The "Inspiration" frame has a reference layout.

The Puzzle screen is drawn once, for Plan A Stop 1, with a frame per variant, named "Puzzle - <variant>": Puzzle, Clue, Location Updating, Weak signal, No location, No compass, Over 1 km, Arrival range. "Puzzle - Plan B Puzzle (counter hidden)" is the only Plan B frame, because only the counter and the text differ. Every other Stop reuses the layout and changes only its Puzzle and Clue text (see STOP.md). Do not draw a frame per Stop.

The Clue is a white card with an `ink` outline over a scrim (`ink` at 65%). It sits just below the "Need a Clue?" button and ends with a "Got it" button. The Admin tap zone stays above the scrim.

### Arrival and Reveal frames

The frames are "Arrival", "Reveal - Text", "Reveal - Video", "Reveal - Voice" and "Reveal - Song", each 390x844 with the usual Stage structure (Status Bar, Content, "Continue" Button Primary, Admin tap zone last).

- **Arrival:** a gold disc with a check, a display-type title ("You found it!", draft), the Stop name in handwriting, then "Continue". The disc content may change per Stop and need not always be a check.
- **Reveal:** a handwritten heading (draft), then one card, then "Continue". Text uses an outlined `surface` card. Video and Song use an `ink` card. Voice uses an outlined `surface` card. Video, Voice and Song show a 112 px gold play disc with an `ink` play icon and a label ("Tap to play the video", "Tap to play the voice message", "Tap to play the song"). The Song card also shows a title placeholder.
- Ornaments sit in different places on every frame and clear of the card, text and button.

"Need a Clue?" shows the easier hint as an overlay above every element. "Having trouble" opens the Fallback ladder.

## Pencil tooling notes

- Call through codemode: `tools.mcp__pencil__execute({filePath, description, input})`. Node IDs and globals persist between calls. The file may have been edited by hand, so re-read it before changing anything.
- Insert with `placeholder: true` while building, then set it to `false`. "Partially clipped" flags are expected for flowers that bleed off the edge on purpose. Check the rest with `ctx.bounds`.
- Resizing a ref does not scale the paths inside it. Scale the component's children, then place instances without width or height.
- Text needs `textGrowth: "fixed-width"` plus a width to wrap.
- Generated SVGs are async: check `placeholder` and `children` later.
- Pencil's own screenshots come back tiny. For a real check, Export to PNG at scale 2 (files land under `/tmp`, a symlink to `/private/tmp`) and run an image analysis on them with specific questions. Delete temporary test frames afterwards.

## Audit

After the screens are done, run the antislop audit (numbered findings list) and the contrast checks before the beautify pass. Tick phase 2 in BUILD-PLAN only when the PR is open and the checks pass.
