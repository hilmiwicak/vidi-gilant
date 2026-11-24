import { describe, expect, it } from 'vitest';
import { planA, planB } from './data/plans';
import { shortStopName } from './format';

describe('shortStopName', () => {
  it('keeps the name before the first comma', () => {
    expect(shortStopName('Pandan Haur, Fresh Market Emerald Bintaro')).toBe('Pandan Haur');
    expect(shortStopName('Popeyes Bintaro, Parigi')).toBe('Popeyes Bintaro');
  });

  it('keeps a name without a comma whole', () => {
    expect(shortStopName('Naomi Yura Agency')).toBe('Naomi Yura Agency');
  });

  it('gives every Placeholder Stop a non-empty short name', () => {
    for (const stop of [...planA, ...planB]) expect(shortStopName(stop.name)).not.toBe('');
  });
});
