import { describe, expect, it } from 'vitest';
import { isAnyFrameFilled } from "../modules/calculateResults";

describe('#isAnyFrameFilled', () => {
  it('returns false with an empty array as input', () => {
    expect(isAnyFrameFilled([])).toStrictEqual(false);
  });
  it('returns false with empty arrays in an array as input', () => {
    expect(isAnyFrameFilled([[], []])).toStrictEqual(false);
  });
  it('returns true with a filled array as input', () => {
    expect(isAnyFrameFilled([[10]])).toStrictEqual(true);
  });
});