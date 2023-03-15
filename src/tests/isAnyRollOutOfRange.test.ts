import { describe, expect, it } from 'vitest';
import { isAnyRollOutOfRange } from "../modules/calculateResults";

const correctInput_118 = [[1, 9], [1, 9], [1, 9], [1, 9], [1, 9], [1, 9], [1, 9], [1, 9], [1, 9], [1, 9, 9]];
export const wrongInputOverTen = [[7, 3], [9, 1], [10, 10], [8, 2], [7, 3], [5, 5], [6, 3], [10], [11]]; // Expected: Error due 11 in last frame
export const wrongInputNegative = [[-7, 3], [9, 1], [10, 10], [8, 2], [7, 3], [5, 5], [6, 3], [10], [10], [7, 2, 0]]; // Expected: Error due to negative value in the first frame

describe('#isAnyRollOutOfRange', () => {
  it('returns false given a valid array', () => {
    expect( isAnyRollOutOfRange( correctInput_118 )).toStrictEqual(false);
  });
  it('returns true given an array with an item over 10 in it.', () => {
    expect( isAnyRollOutOfRange( wrongInputOverTen )).toStrictEqual(true);
  });
  it('returns true given aan array with a negative value in it.', () => {
    expect( isAnyRollOutOfRange( wrongInputNegative )).toStrictEqual(true);
  });
});