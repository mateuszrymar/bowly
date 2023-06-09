import { cloneDeep, isEmpty, sum } from 'lodash-es';
import { PlayerRollsInt, PlayerInt, FrameInt } from '../types/types';

/*
  This module calculates the results in a similar way to how a person would do it:
  DONE 1. We get the player data from index.ts.
  DONE 2. We take player's rolls array.
  DONE 3. We divide the array into frames. - needs to be unit tested.
  DONE 4. We check if all frames are valid.
  DONE 5. We take these frames, and process them into objects, that have following properties:
    - Array with 1 or 2 rolls in the given frame.
    - Number - frame no.;
    - Boolean isStrike;
    - Boolean isSpare;
    - Number of points that this frame got;
    This object should be created in a constructor and have following methods:
    - processFrame() - private method that is called upon construction,
      this method will fill all other properties;
    - checkIfStrike()
    - checkIfSpare()
    - calculatePoints()
  DONE 6. Now we have an array of objects.
  DONE 7. To get the point total, we map through frame points.
  DONE 8. We bundle all data together into an object that contains:
    - Player name
    - Player result
    - Frames with individual frame results.
    - Are results valid? - this info can be passed as a null result, doesn't require a separate field.
  DONE 9. We return data from previous step.
  Thanks to this approach, we get individual frame counts, strikes, and spares, which we'll display to make results more readable.
*/





export const calculateResults = ( playerData: PlayerRollsInt[] ) => {
  const allPlayerData = cloneDeep( playerData );
  let allPlayerResults: PlayerInt[] = [];

  allPlayerData.forEach( player => {
    allPlayerResults.push( new Player( player ));
  });

  return allPlayerResults;
};

class Player {
  name: string;
  result: number | null;
  frames: FrameInt[];

  constructor ( playerData: PlayerRollsInt ) {
    const singlePlayerData = cloneDeep( playerData );
    const playerName = singlePlayerData.name;
    const playerRolls = singlePlayerData.rolls;
    let result: number | null;
    let frames: FrameInt[];

    // We divide rolls into frames, then we validate and process frames:
    const playerFrames = divideIntoFrames( playerRolls );    
    const areFramesValid = validateFrames( playerFrames );
    if (areFramesValid === true) {
      frames = processFrames( playerFrames );
      result = sum(frames.map((frame) => frame.pointResult));
    } else {
      frames = [];
      result = null;
    }

    this.name = playerName;
    this.result = result;
    this.frames = frames;
  };
};

const divideIntoFrames = ( arrayToPartition: number[] ) => {
  let arrayByFrames: number[][] = [];
  let arrayCopy = cloneDeep( arrayToPartition );
  let frameNumber = 1;

  for ( let i=0; i<arrayCopy.length; ) {
    let currentItem = arrayCopy[i];
    let nextItem = arrayCopy[i+1];
    let currentFrame: number[] = [];

    if( frameNumber < 10 ) {      
      if ((currentFrame.length === 0) && (currentItem === 10)) {        
        // Here we handle strikes:
        arrayByFrames.push( [currentItem] );
        i++;
        frameNumber++;
      } else {     
        // Here we handle spares and regular rolls:
        arrayByFrames.push( [currentItem, nextItem].filter(item => item !== undefined) );        
        i+=2;
        frameNumber++;
      };

    } else {
      let remainder = arrayCopy.slice(i);
      arrayByFrames.push( remainder );
      break;
    };
  };
  
  return arrayByFrames;
};

const validateFrames = ( frames :number[][] ) => {
  const framesToCheck = cloneDeep( frames );

  if ( isAnyFrameFilled( framesToCheck ) === false ) return false
  if ( isAnyRollOutOfRange( framesToCheck ) === true ) return false
  if ( isAnyFrameOverPointLimit( framesToCheck ) === true ) return false
  if ( isAnyFrameTooLong( framesToCheck ) === true ) return false
  else return true;
};

const isAnyFrameFilled = ( frames :number[][] ) => {
  const framesToCheck = cloneDeep( frames );
  if ( isEmpty( framesToCheck.flat() )) return false;
  else return true;
};

const isAnyRollOutOfRange = ( frames :number[][] ) => {
  const rollsToCheck = cloneDeep( frames ).flat();
  let isOutOfRange = false;  
  rollsToCheck.forEach( roll => {    
    if ((roll < 0) || (roll > 10)) isOutOfRange = true;
  });

  return isOutOfRange;
};

const isAnyFrameOverPointLimit = ( frames :number[][] ) => {    
  const framesToCheck = cloneDeep( frames );

  // We sum rolls in each frame (without bonus points):
  const frameSums = framesToCheck.map( frame => sum(frame));
  const lastFrame = frameSums.splice(9);

  const isFrameOverPointLimit = isFrameOverLimit( frameSums );  
  const isLastFrameOverPointLimit = isLastFrameOverLimit( lastFrame );
  const isOverLimit: boolean = (isLastFrameOverPointLimit || isFrameOverPointLimit);

  return isOverLimit;
};

const isFrameOverLimit = ( regularFrames: number[] ) => {
  const frameSums = cloneDeep( regularFrames );
  let isOverLimit = false;

  frameSums.forEach(element => {
    if ( element > 10 ) {
      console.log('Wrong input: one of the frames #1-9 is over 10 points.');
      isOverLimit = true;      
    };
  });

  return isOverLimit;
};

const isLastFrameOverLimit = ( lastFrame: number[] ) => {
  const frameToCheck = cloneDeep( lastFrame );
  let isOverLimit = false;
  if ((frameToCheck[0] !== undefined) && (frameToCheck[0] > 30)) {
    console.log( 'Wrong input: Frame #10 is over 30 points.');
    isOverLimit = true;
  };

  return isOverLimit;
};

const isAnyFrameTooLong = ( frames :number[][] ) => {
  let isTooLong = false;
  const framesToCheck = cloneDeep( frames );
  
  framesToCheck.forEach((frame, i) => {
    if ( i < 9) {
      // Here we check frames 1-9:
      if (frame.length > 2) isTooLong = true;
    } else {
      // Here we check frame 10:
      if (frame.length > 3) isTooLong = true;
      if (((frame[0] + frame[1]) < 10) && (frame.length > 2)) isTooLong = true;
    };
  });

  return isTooLong;
};

const processFrames = ( partitionedArray: number[][] ) => {
  const arrayCopy = [...partitionedArray];
  let resultArray: FrameInt[] = [];

  for ( let i=0; i<arrayCopy.length; i++ ) {
    resultArray.push(
      new Frame( arrayCopy, i )
    );
  };

  return resultArray;
};

class Frame {
  frameId: number;
  rolls: number[];
  isStrike: boolean[];
  isSpare: boolean[];
  pointResult: number;  

  constructor( frameArray: number[][], frameIndex: number ) {
    const frameArrayCopy = cloneDeep( frameArray );
    this.frameId = frameIndex;
    this.rolls = frameArray[ frameIndex ];
    this.isStrike = this.checkIfStrike( frameIndex );
    this.isSpare = this.checkifSpare( frameIndex );
    this.pointResult = this.calculateResult( frameArrayCopy, frameIndex, this.isStrike, this.isSpare );
  };

  checkIfStrike ( frameId: number ): boolean[] {
    if ( frameId>=9 ) {
      let lastFrameStrikes: boolean[] = [];
      ( this.rolls[0] === 10 ) ? lastFrameStrikes.push(true) : lastFrameStrikes.push(false);
      (( this.rolls[1] === 10 ) && ( this.rolls[0] !== 0 )) ? lastFrameStrikes.push(true) : lastFrameStrikes.push(false);
      ( this.rolls[2] === 10 ) ? lastFrameStrikes.push(true) : lastFrameStrikes.push(false);
      
      return lastFrameStrikes;
    } else {
      return [(( this.rolls.length === 1 ) && ( this.rolls[0] === 10 ))];
    };          
  };

  checkifSpare ( frameId: number ): boolean[] {
    if ( frameId>=9 ) {
      let lastFrameSpares: boolean[] = [];
      (( this.rolls[0] !== 10 ) && (( this.rolls[0] + this.rolls[1] ) === 10 )) ? lastFrameSpares.push(true) : lastFrameSpares.push(false);
      (( this.rolls[1] !== 10 ) && (( this.rolls[1] + this.rolls[2] ) === 10 )) ? lastFrameSpares.push(true) : lastFrameSpares.push(false);
      
      return lastFrameSpares;
    } else {
      return [(( this.rolls.length === 2 ) && (( this.rolls[0] + this.rolls[1] ) === 10 ))];
    };          
  };

  calculateResult ( allFrames: number[][], frameId: number, isStrike: boolean[], isSpare: boolean[] ) {
    const allFramesCopy = cloneDeep( allFrames );
    const directFramePoints = allFramesCopy[ frameId ].reduce((acc, val) => acc + val, 0 );

    // On frames 10 we don't count bonus points for strikes & spares:
    if ( frameId>=9 ) {
      return directFramePoints;
    } else {
      // We need to slice the original array after the current frame.        
      // Then, we can flatten that array and take 1 or 2 numbers depending on:
      // - if it's a strike - 2 numbers (if existing),
      // - if it's a spare - 1 number (if existing).
      const nextNumbers = allFramesCopy.slice( frameId+1 ).flat();

      const checkFirstNextResult: (number | undefined) = nextNumbers.at(0);
      const firstNextResult: number = ( checkFirstNextResult === undefined ) ? 0 : checkFirstNextResult;

      const checkSecondNextResult: (number | undefined) = nextNumbers.at(1);
      const secondNextResult: number = ( checkSecondNextResult === undefined ) ? 0 : checkSecondNextResult;

      if ( isStrike[0] === true ) return directFramePoints + firstNextResult + secondNextResult;
      else if ( isSpare[0] === true ) return directFramePoints + firstNextResult;
      else return directFramePoints;
    };
  };
};

// Here we export functions & classes that are only for testing.
// Makes it easier to differentiate private from public module functions.
export {
  Player,
  divideIntoFrames,
  validateFrames,
  isAnyFrameFilled,
  isAnyRollOutOfRange,
  isAnyFrameOverPointLimit,
  isAnyFrameTooLong,
  processFrames,
};