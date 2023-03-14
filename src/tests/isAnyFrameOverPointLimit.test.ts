import { describe, expect, it } from 'vitest';
import { isAnyFrameOverPointLimit } from "../modules/calculateResults";

const correctInput_118 = [[1, 9], [1, 9], [1, 9], [1, 9], [1, 9], [1, 9], [1, 9], [1, 9], [1, 9], [1, 9, 9]];
const wrongInputSumAboveTen = [[7, 4], [9, 1], [10], [10], [8, 2], [7, 3], [5, 5], [6, 3], [10], [10, 7, 2]]; // Expected: Error due to wrong sum in pair

describe('#isAnyFrameOverPointLimit', () => {
  it('returns false given a frame with sum of less than 11', () => {
    expect(isAnyFrameOverPointLimit([[5,4]])).toStrictEqual(false);
  });
  it('returns true given a frame with sum of more than 10', () => {
    expect(isAnyFrameOverPointLimit([[5,6]])).toStrictEqual(true);
  });
  it('returns true given a frame with an item over 10', () => {
    expect(isAnyFrameOverPointLimit([[11]])).toStrictEqual(true);
  });
  it('returns false given a valid array', () => {
    expect(isAnyFrameOverPointLimit( correctInput_118 )).toStrictEqual(false);
  });
  it('returns true given an array where sum is above 10', () => {
    expect(isAnyFrameOverPointLimit( wrongInputSumAboveTen )).toStrictEqual(true);
  });
});