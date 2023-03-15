import { describe, expect, it } from 'vitest';
import { Player } from "../modules/calculateResults";

// This is an integration test, because we're testing a constructor that invokes multiple functions.

// Invalid games
const invalidTooLong = {name: 'Paweł Kowalski', rolls: [7, 3, 9, 1, 10, 10, 8, 2, 7, 3, 5, 5, 6, 3, 10, 10, 7, 2, 0]}; // Too many rolls in the last round
const invalidNegative = {name: 'Paweł Kowalski', rolls: [-7, 3, 9, 1, 10, 10, 8, 2, 7, 3, 5, 5, 6, 3, 10, 10, 7, 2, 0]}; // First number is negative
const invalidTooHigh = {name: 'Paweł Kowalski', rolls: [7, 3, 9, 1, 10, 10, 8, 2, 7, 3, 5, 5, 6, 3, 10, 10, 0, 11]}; // Last number is above 10
const invalidSumAboveTen = {name: 'Paweł Kowalski', rolls: [7, 4, 9, 1, 10, 10, 8, 2, 7, 3, 5, 5, 6, 3, 10, 10, 7, 2]}; // First frame sums to 11

// Valid unfinished games
const validQuit_0 = {name: 'Quitty McQuitt', rolls: [0]};
const validQuit_00 = {name: 'Toby Flenderson', rolls: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};
const validQuit_1 = {name: 'Quitty McQuitt', rolls: [1]};
const validQuit_8 = {name: 'Andy Bernard', rolls: [5,2,0,0,1]};
const validQuit_28 = {name: 'Quitty McQuitt', rolls: [7, 3, 9]};
const validQuit_90 = {name: 'Quitty McQuitt', rolls: [10, 10, 10, 10]};
const validQuit_109 = {name: 'Quitty McQuitt', rolls: [1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9]};

// Valid finished games
const validInput_0 = {name: 'Bad Player', rolls: [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0]};
const validInput_30 = {name: 'Paweł Kowalski', rolls: [ 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]};
const validInput_118 = {name: 'Krzysztof Król', rolls: [1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 9]};
const validInput_80 = {name: 'Izabela Kania', rolls: [ 4,4,4,4,4, 4,4,4,4,4, 4,4,4,4,4, 4,4,4,4,4]};
const validInput_128 = {name: 'Michael Scott', rolls: [8, 2, 6, 3, 10, 8, 0, 7, 1, 9, 1, 8, 0, 5, 4, 7, 3, 9, 1, 5]};
const validInput_123 = {name: 'Pam Beesly', rolls: [9, 0, 8, 2, 10, 6, 2, 8, 1, 7, 3, 4, 6, 1, 7, 2, 8, 7, 2]};
const validInput_190 = {name: 'Dwight Schrute', rolls: [7, 3, 9, 1, 10, 10, 8, 2, 7, 3, 5, 5, 6, 3, 10, 10, 7, 2]};
const validInput_120 = {name: 'Kevin Malone', rolls: [5, 5, 9, 0, 10, 6, 2, 8, 2, 3, 7, 8, 1, 9, 1, 2, 6, 4, 2]};
const validInput_172 = {name: 'Jan Levinson-Gould', rolls: [6, 4, 10, 5, 1, 7, 3, 9, 1, 10, 8, 2, 6, 1, 10, 10, 9, 0]};
const validInput_149 = {name: 'Angela Martin', rolls: [7, 3, 8, 2, 6, 4, 10, 9, 1, 8, 2, 4, 6, 1, 8, 2, 8, 6, 1]};
const validInput_161 = {name: 'Oscar Martinez', rolls: [9, 1, 6, 3, 5, 5, 10, 8, 2, 9, 1, 4, 6, 8, 2, 6, 3, 10, 8, 2]};
const validInput_300 = {name: 'Stanley Hudson', rolls: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]};
const validInput_110 = {name: 'Jim Halpert', rolls: [10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0]};

describe('#Player', () => {  

  // Invalid games
  it('returns result of type null, given an incorrect input', () => {
    expect(new Player( invalidTooLong ).result).toStrictEqual( null );
  });
  it('returns result of type null, given an incorrect input', () => {
    expect(new Player( invalidNegative ).result).toStrictEqual( null );
  });
  it('returns result of type null, given an incorrect input', () => {
    expect(new Player( invalidTooHigh ).result).toStrictEqual( null );
  });
  it('returns result of type null, given an incorrect input', () => {
    expect(new Player( invalidSumAboveTen ).result).toStrictEqual( null );
  });

  // Valid unfinished games
  it('returns correct value, given an early quit', () => {
    expect(new Player( validQuit_0 ).result).toStrictEqual( 0 );
  });
  it('returns correct value, given an early quit', () => {
    expect(new Player( validQuit_00 ).result).toStrictEqual( 0 );
  });
  it('returns correct value, given an early quit', () => {
    expect(new Player( validQuit_1 ).result).toStrictEqual( 1 );
  });
  it('returns correct value, given an early quit', () => {
    expect(new Player( validQuit_8 ).result).toStrictEqual( 8 );
  });
  it('returns correct value, given an early quit', () => {
    expect(new Player( validQuit_28 ).result).toStrictEqual( 28 );
  });
  it('returns correct value, given an early quit', () => {
    expect(new Player( validQuit_90 ).result).toStrictEqual( 90 );
  });
  it('returns correct value, given an early quit', () => {
    expect(new Player( validQuit_109 ).result).toStrictEqual( 109 );
  });
  
  // Valid finished games
  it('returns correct value, given a valid input', () => {
    expect(new Player( validInput_0 ).result).toStrictEqual( 0 ); 
  });
  it('returns correct value, given a valid input', () => {
    expect(new Player( validInput_30 ).result).toStrictEqual( 30 );
  });
  it('returns correct value, given a valid input', () => {
    expect(new Player( validInput_118 ).result).toStrictEqual( 118 );
  });
  it('returns correct value, given a valid input', () => {
    expect(new Player( validInput_80 ).result).toStrictEqual( 80 );
  });
  it('returns correct value, given a valid input', () => {
    expect(new Player( validInput_128 ).result).toStrictEqual( 128 );
  });
  it('returns correct value, given a valid input', () => {
    expect(new Player( validInput_123 ).result).toStrictEqual( 123 );
  });
  it('returns correct value, given a valid input', () => {
    expect(new Player( validInput_190 ).result).toStrictEqual( 190 );
  });
  it('returns correct value, given a valid input', () => {
    expect(new Player( validInput_120 ).result).toStrictEqual( 120 );
  });
  it('returns correct value, given a valid input', () => {
    expect(new Player( validInput_172 ).result).toStrictEqual( 172 );
  });
  it('returns correct value, given a valid input', () => {
    expect(new Player( validInput_149 ).result).toStrictEqual( 149 );
  });
  it('returns correct value, given a valid input', () => {
    expect(new Player( validInput_161 ).result).toStrictEqual( 161 );
  });
  it('returns 300, given a perfect game', () => {
    expect(new Player( validInput_300 ).result).toStrictEqual( 300 );
  });
  it('returns correct value, given a perfect game', () => {
    expect(new Player( validInput_110 ).result).toStrictEqual( 110 );
  });
});