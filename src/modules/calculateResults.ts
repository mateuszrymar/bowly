import { cloneDeep } from 'lodash-es';

/*
  This module calculates the results in a similar way to how a person would do it:
  DONE 1. We get the player data from index.ts.
  DONE 2. We take player's rolls array.
  3. We divide the array into frames. - needs to be unit tested.
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

  console.log( singlePlayerData.rolls );  
};



export const getAllPlayerResults = ( playerData: PlayerRolls[] ) => {
  const allPlayerData = cloneDeep( playerData );
  console.log( 'player data is now in results module:', allPlayerData );

  allPlayerData.forEach( player => {
    getSinglePlayerResults( player );
  });

  return allPlayerData;
};
