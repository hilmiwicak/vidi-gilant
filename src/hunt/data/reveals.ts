import type { Reveal } from '../types';
import { coldMoo, lot17, supagetti } from './stops';

// Keyed by Stop id. The types and labels are placeholders; the media files do not
// exist yet, and the real Reveals replace this data.
export const reveals: Record<string, Reveal> = {
  [lot17.id]: { type: 'text', body: 'Placeholder Reveal for Lot 17.' },
  [coldMoo.id]: { type: 'song', spotifyUri: 'spotify:track:placeholder' },
  [supagetti.id]: { type: 'text', body: 'Placeholder Reveal for the dinner.' },
};
