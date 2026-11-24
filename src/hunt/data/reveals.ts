import type { Reveal } from '../types';
import { coldMoo, lot17, naomiYura, pandanHaur, popeyes, supagetti } from './stops';

// Shared by both Plans, keyed by Stop id. The types and labels are placeholders;
// the media files do not exist yet, and the real Reveals replace this data.
export const reveals: Record<string, Reveal> = {
  [pandanHaur.id]: { type: 'text', body: 'Placeholder Reveal for Pandan Haur.' },
  [popeyes.id]: { type: 'voice', src: '/reveals/popeyes-voice.m4a' },
  [naomiYura.id]: { type: 'video', src: '/reveals/naomi-yura-video.mp4' },
  [coldMoo.id]: { type: 'song', spotifyUri: 'spotify:track:placeholder' },
  [lot17.id]: { type: 'text', body: 'Placeholder Reveal for Lot 17.' },
  [supagetti.id]: { type: 'text', body: 'Placeholder Reveal for the dinner.' },
};
