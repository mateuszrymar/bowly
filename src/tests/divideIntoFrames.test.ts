import { describe, expect, it } from 'vitest';
import { divideIntoFrames } from "../modules/calculateResults";

const correctInput_118 = [1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 9];
export const wrongInputTooLong = [7, 3, 9, 1, 10, 10, 8, 2, 7, 3, 5, 5, 6, 3, 10, 10, 7, 2, 0]; // Expected: Error due to too long input

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
  it('returns no more than 10 arrays, given a valid 10-pin input', () => {
    expect(divideIntoFrames(correctInput_118).length).toBeLessThan(11);
  });  
  it('returns no more than 10 arrays, even if input is too long', () => {
    expect(divideIntoFrames(wrongInputTooLong).length).toBeLessThan(11);
  });  
});