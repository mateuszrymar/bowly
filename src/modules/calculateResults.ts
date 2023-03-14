import { cloneDeep, isEmpty, sum } from 'lodash-es';

/*
  This module calculates the results in a similar way to how a person would do it:
  DONE 1. We get the player data from index.ts.
  DONE 2. We take player's rolls array.
  DONE 3. We divide the array into frames. - needs to be unit tested.
  4. We check if all frames are valid.
  5. We take these frames, and process them into objects, that have following properties:
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
  6. Now we have an array of objects.
  7. To get the point total, we map through frame points.
  8. We bundle all data together into an object that contains:
    - Player name
    - Player result
    - Frames with individual frame results.
  9. We return data from previous step.
*/

interface PlayerRolls {
  name: string;
  rolls: number[];
};

export const isAnyFrameFilled = ( frames :number[][] ) => {
  const framesToCheck = cloneDeep( frames );

  if ( isEmpty( framesToCheck.flat() )) return false;
  else return true;
};

const isLastFrameOverLimit = ( lastFrame: number[] ) => {
  const frameToCheck = cloneDeep( lastFrame );
  let isOverLimit = false;

  if ((frameToCheck[0] !== undefined) && (frameToCheck[0] > 30)) {
    console.log( 'Wrong input: Frame #10 is over 30 points.');
    isOverLimit = true;
  } 

  return isOverLimit;
}

const isFrameOverLimit = ( regularFrames: number[] ) => {
  const frameSums = cloneDeep( regularFrames );
  let isOverLimit = false;

  frameSums.forEach(element => {
    if ( element > 10 ) {
      console.log('Wrong input: one of the frames #1-9 is over 10 points.');
      isOverLimit = true;      
    }
  });

  return isOverLimit;
}

export const isAnyFrameOverPointLimit = ( frames :number[][] ) => {    
  const framesToCheck = cloneDeep( frames );

  // We sum rolls in each frame (without bonus points):
  const frameSums = framesToCheck.map( frame => sum(frame));
  const lastFrame = frameSums.splice(9);

  const isFrameOverPointLimit = isFrameOverLimit( frameSums );  
  const isLastFrameOverPointLimit = isLastFrameOverLimit( lastFrame );
  const isOverLimit: boolean = (isLastFrameOverPointLimit || isFrameOverPointLimit);

  return isOverLimit;
};

export const isAnyFrameTooLong = ( frames :number[][] ) => {
  
}

export const validateFrames = ( frames :number[][] ) => {
  const framesToCheck = cloneDeep( frames );
  console.log('validation is running.');

  if ( isAnyFrameFilled( framesToCheck ) === false ) return false
  if ( isAnyFrameOverPointLimit( framesToCheck ) === true ) return false
  // Now check if there wasn't too many entries
  else return true;
};

export const divideIntoFrames = ( arrayToPartition: number[] ) => {
  let arrayByFrames: number[][] = [];
  let arrayCopy = [...arrayToPartition];
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

const getSinglePlayerResults = ( onePlayerData: PlayerRolls ) => {
  const singlePlayerData = cloneDeep( onePlayerData );
  const playerRolls = singlePlayerData.rolls;
  const playerFrames = divideIntoFrames( playerRolls );
  // Here we validate frames.
  const areFramesValid = validateFrames( playerFrames );

  console.log( areFramesValid );  
};


export const getAllPlayerResults = ( playerData: PlayerRolls[] ) => {
  const allPlayerData = cloneDeep( playerData );
  console.log( 'player data is now in results module:', allPlayerData );

  allPlayerData.forEach( player => {
    getSinglePlayerResults( player );
  });

  return allPlayerData;
};
