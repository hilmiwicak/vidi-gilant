import { describe, expect, it } from 'vitest'
import { planA, planB, plans } from './plans'
import { reveals } from './reveals'

describe.each(Object.entries(plans))('Plan %s', (_id, stops) => {
  it('has unique Stop ids', () => {
    const ids = stops.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has complete Stops with a Puzzle, a Clue and a Code', () => {
    for (const s of stops) {
      expect(s.name).not.toBe('')
      expect(s.puzzle.question).not.toBe('')
      expect(s.puzzle.clue).not.toBe('')
      expect(s.code).not.toBe('')
      expect(s.referencePhoto).not.toBe('')
      expect(s.outlineImage).not.toBe('')
    }
  })

  it('has coordinates in the Jakarta and Bintaro area', () => {
    for (const s of stops) {
      expect(s.lat).toBeGreaterThan(-6.4)
      expect(s.lat).toBeLessThan(-6.1)
      expect(s.lng).toBeGreaterThan(106.6)
      expect(s.lng).toBeLessThan(106.9)
    }
  })

  it('has a Reveal for every Stop', () => {
    for (const s of stops) expect(reveals[s.id]).toBeDefined()
  })
})

describe('Plan shape', () => {
  it('gives Plan A 3 to 6 Stops including the dinner', () => {
    expect(planA.length).toBeGreaterThanOrEqual(3)
    expect(planA.length).toBeLessThanOrEqual(6)
  })

  it('gives Plan B 2 Stops then the dinner', () => {
    expect(planB).toHaveLength(3)
  })

  it('ends both Plans at the same dinner Stop', () => {
    expect(planA.at(-1)).toBe(planB.at(-1))
  })
})
