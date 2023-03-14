import { describe, expect, it } from 'vitest';
import { isAnyFrameTooLong } from "../modules/calculateResults";

const correctInput_118 = [[1, 9], [1, 9], [1, 9], [1, 9], [1, 9], [1, 9], [1, 9], [1, 9], [1, 9], [1, 9, 9]];
export const wrongInputTooLong_01 = [[7, 3], [9, 1], [10, 10], [8, 2], [7, 3], [5, 5], [6, 3], [10], [10], [7, 3, 10, 10]]; // Expected: Error due to too long input
export const wrongInputTooLong_02 = [[7, 3], [9, 1], [10, 10], [8, 2], [7, 3], [5, 5], [6, 3], [10], [10], [7, 2, 0]]; // Expected: Error due to too long input

describe('#isAnyFrameTooLong', () => {
  it('returns false given a valid array', () => {
    expect(isAnyFrameTooLong( correctInput_118 )).toStrictEqual(false);
  });
  it('returns true given an array which is too long', () => {
    expect(isAnyFrameTooLong( wrongInputTooLong_01 )).toStrictEqual(true);
  });
  it('returns true given an array which is too long', () => {
    expect(isAnyFrameTooLong( wrongInputTooLong_02 )).toStrictEqual(true);
  });
});