import { describe, expect, it } from 'vitest';
import { divideIntoFrames } from "../modules/calculateResults";

describe('#divideIntoFrames', () => {
  it('returns an empty array with an empty array as input', () => {
    expect(divideIntoFrames([])).toStrictEqual([]);
  });
  it('returns two separate arrays, if first item is 10', () => {
    expect(divideIntoFrames([10,2])).toStrictEqual([[10],[2]]);
  });
  it('returns a single array, if first item is not 10', () => {
    expect(divideIntoFrames([8,2])).toStrictEqual([[8,2]]);
  });
});