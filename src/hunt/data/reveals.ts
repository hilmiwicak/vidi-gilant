import type { Reveal } from '../types'
import { coldMoo, lot17, naomiYura, pandanHaur, popeyes, supagetti } from './stops'

// Shared by both Plans, keyed by Stop id. Placeholder text until the real Reveals exist.
export const reveals: Record<string, Reveal> = {
  [pandanHaur.id]: { type: 'text', body: 'Placeholder Reveal for Pandan Haur.' },
  [popeyes.id]: { type: 'text', body: 'Placeholder Reveal for Popeyes.' },
  [naomiYura.id]: { type: 'text', body: 'Placeholder Reveal for Naomi Yura.' },
  [coldMoo.id]: { type: 'text', body: 'Placeholder Reveal for Cold Moo.' },
  [lot17.id]: { type: 'text', body: 'Placeholder Reveal for Lot 17.' },
  [supagetti.id]: { type: 'text', body: 'Placeholder Reveal for the dinner.' },
}
