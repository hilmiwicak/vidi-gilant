import type { PlanId, Stop } from '../types'
import { coldMoo, lot17, naomiYura, pandanHaur, popeyes, supagetti } from './stops'

export const planA: readonly Stop[] = [pandanHaur, popeyes, naomiYura, coldMoo, supagetti]

export const planB: readonly Stop[] = [lot17, coldMoo, supagetti]

export const plans: Record<PlanId, readonly Stop[]> = { a: planA, b: planB }
