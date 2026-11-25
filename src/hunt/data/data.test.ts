import { describe, expect, it } from 'vitest';
import { reveals } from './reveals';
import { coldMoo, lot17, stops, supagetti } from './stops';

describe('Hunt Stops', () => {
  it('keeps the fixed Hunt order and ends at the dinner', () => {
    expect(stops).toEqual([lot17, coldMoo, supagetti]);
    expect(stops.at(-1)).toBe(supagetti);
  });

  it('has unique Stop ids', () => {
    const ids = stops.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has complete Stops with a Puzzle, a Clue and a Code', () => {
    for (const s of stops) {
      expect(s.name).not.toBe('');
      expect(s.puzzle.lead).not.toBe('');
      expect(s.puzzle.phrase).not.toBe('');
      expect(s.puzzle.clue).not.toBe('');
      expect(s.code).not.toBe('');
      expect(s.referencePhoto).not.toBe('');
      expect(s.outlineImage).not.toBe('');
    }
  });

  it('has coordinates in the Jakarta and Bintaro area', () => {
    for (const s of stops) {
      expect(s.lat).toBeGreaterThan(-6.4);
      expect(s.lat).toBeLessThan(-6.1);
      expect(s.lng).toBeGreaterThan(106.6);
      expect(s.lng).toBeLessThan(106.9);
    }
  });

  it('has a Reveal for every Stop', () => {
    for (const s of stops) expect(reveals[s.id]).toBeDefined();
  });
});
