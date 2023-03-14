import { describe, expect, it } from 'vitest';
import { Player } from "../modules/calculateResults";


const validInput_30 = {name: 'Paweł Kowalski', rolls: [ 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]};
const invalidInputTooLong = {name: 'Paweł Kowalski', rolls: [7, 3, 9, 1, 10, 10, 8, 2, 7, 3, 5, 5, 6, 3, 10, 10, 7, 2, 0]};
const validInput_300 = {name: 'Good Player', rolls: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]};
const validQuit_0 = {name: 'Quitty McQuitt', rolls: [0]};

describe('#Player', () => {
  it('returns result of type number, given a correct input', () => {
    expect(new Player( validInput_30 ).result).toBeTypeOf( 'number' );
  });
  it('returns result of type null, given an incorrect input', () => {
    expect(new Player( invalidInputTooLong ).result).toStrictEqual( null );
  });
  it('returns 300, given a perfect game', () => {
    expect(new Player( validInput_300 ).result).toStrictEqual( 300 );
  });
  it('returns 0, given an early quit', () => {
    expect(new Player( validQuit_0 ).result).toStrictEqual( 0 );
  });
});