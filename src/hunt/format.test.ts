import { describe, expect, it } from 'vitest';
import { stops } from './data/stops';
import { shortStopName } from './format';

describe('shortStopName', () => {
  it('keeps the name before the first comma', () => {
    expect(shortStopName('Lot 17 parking lot, SCBD')).toBe('Lot 17 parking lot');
    expect(shortStopName('Cold Moo, Dharmawangsa')).toBe('Cold Moo');
  });

  it('keeps a name without a comma whole', () => {
    expect(shortStopName('Supagetti')).toBe('Supagetti');
  });

  it('gives every Placeholder Stop a non-empty short name', () => {
    for (const stop of stops) expect(shortStopName(stop.name)).not.toBe('');
  });
});
