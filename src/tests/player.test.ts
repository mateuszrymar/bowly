import { describe, expect, it } from 'vitest';
import { Player } from "../modules/calculateResults";

const validInput_30 = {name: 'Paweł Kowalski', rolls: [ 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]};
const validInput_118 = {name: 'Good Player', rolls: [1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 9]};
const invalidInputTooLong = {name: 'Paweł Kowalski', rolls: [7, 3, 9, 1, 10, 10, 8, 2, 7, 3, 5, 5, 6, 3, 10, 10, 7, 2, 0]};
const validInput_300 = {name: 'Good Player', rolls: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]};
const validQuit_0 = {name: 'Quitty McQuitt', rolls: [0]};
const validQuit_1 = {name: 'Quitty McQuitt', rolls: [1]};
const validQuit_90 = {name: 'Quitty McQuitt', rolls: [10, 10, 10, 10]};
const validQuit_28 = {name: 'Quitty McQuitt', rolls: [7, 3, 9]};
const validInput_190 = {name: 'Good Player', rolls: [7, 3, 9, 1, 10, 10, 8, 2, 7, 3, 5, 5, 6, 3, 10, 10, 7, 2]};
const validInput_0 = {name: 'Good Player', rolls: [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0]};

describe('#Player', () => {
  it('returns result of type number, given a correct input', () => {
    expect(new Player( validInput_30 ).result).toBeTypeOf( 'number' );
  });
  it('returns correct value, given a valid input', () => {
    expect(new Player( validInput_30 ).result).toStrictEqual( 30 );
  });
  it('returns correct value, given a valid input', () => {
    expect(new Player( validInput_118 ).result).toStrictEqual( 118 );
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
  it('returns 1, given an early quit', () => {
    expect(new Player( validQuit_1 ).result).toStrictEqual( 1 );
  });
  it('returns correct value, given an early quit', () => {
    expect(new Player( validQuit_28 ).result).toStrictEqual( 28 );
  });
  it('returns correct value, given an early quit', () => {
    expect(new Player( validQuit_90 ).result).toStrictEqual( 90 );
  });
  it('returns correct value, given a valid input', () => {
    expect(new Player( validInput_190 ).result).toStrictEqual( 190 );
  });
  it('returns correct value, given a valid input', () => {
    expect(new Player( validInput_0 ).result).toStrictEqual( 0 );
  });
});