import { cloneDeep } from "lodash-es";

interface FrameInt {
  frameId: number;
  rolls: number[];
  isStrike: boolean;
  isSpare: boolean;
  pointResult: number;
}

interface PlayerInt {
  name: string;
  result: number | null;
  frames: FrameInt[];
}

// DOM Elements
const tableBody = document.querySelector('.table__body');

console.log(tableBody);


const typicalFrameTemplate = ( playerFrames: FrameInt ) => {
  const playerFramesCopy = cloneDeep( playerFrames );

  const rolls = playerFramesCopy.rolls;
  const pointResult = playerFramesCopy.pointResult;
  const isStrike = playerFramesCopy.isStrike;
  const isSpare = playerFramesCopy.isSpare;

  const roll_1 = rolls[0];
  const roll_2 = (rolls[1] !== undefined) ? rolls[1] : ``;
  let strikeDiv: string;
  let spareDiv: string;

  isStrike ? strikeDiv = `<div class="strike"></div>` : strikeDiv = ``;
  isSpare ? spareDiv = `<div class="spare"></div>` : spareDiv = ``;

  return `
  <li class="table-row__frame">
    <div class="frame__rolls">
      <span class="roll">${roll_1}${strikeDiv}</span>
      <span class="roll">${roll_2}${strikeDiv}${spareDiv}</div></span>
    </div>
    <p class="frame__result">${pointResult}</p>
  </li>
  `;
}

const lastFrameTemplate = ( playerFrames: FrameInt ) => {
  const playerFramesCopy = cloneDeep( playerFrames );

  const rolls = playerFramesCopy.rolls;
  const pointResult = playerFramesCopy.pointResult;
  const isStrike = playerFramesCopy.isStrike;
  const isSpare = playerFramesCopy.isSpare;

  const roll_1 = rolls[0];
  const roll_2 = (rolls[1] !== undefined) ? rolls[1] : ``;
  const roll_3 = (rolls[2] !== undefined) ? rolls[2] : ``;
  let strikeDiv: string;
  let spareDiv: string;

  isStrike ? strikeDiv = `<div class="strike"></div>` : strikeDiv = ``;
  isSpare ? spareDiv = `<div class="spare"></div>` : spareDiv = ``;

  return `
    <li class="table-row__frame--last table-row__frame">
      <div>
        <span class="roll">${roll_1}${strikeDiv}</span>
        <span class="roll">${roll_2}${strikeDiv}${spareDiv}</span>
        <span class="roll">${roll_3}${strikeDiv}</span>
      </div>
      <p class="frame__result">${pointResult}</p>
    </li>
  `;
}

const createFrameList = ( playerFrames: FrameInt[] ) => {
  const playerFramesCopy = cloneDeep( playerFrames );
  let allPlayerFrames = ``;

  for (let i = 0; i < playerFramesCopy.length; i++) {
    const currentFrame = playerFramesCopy[i];

    if ( i < 9 ) {
      const frame = typicalFrameTemplate( currentFrame );
      allPlayerFrames += frame;
    } else {
      const frame = lastFrameTemplate( currentFrame );
      allPlayerFrames += frame;
    }
  }

  // console.log(allPlayerFrames);
  

  return`${allPlayerFrames}`;
} 

const createTableRow = ( playerData: PlayerInt ) => {
  const playerDataCopy = cloneDeep( playerData );
  const playerName = playerDataCopy.name;
  const playerScore = playerDataCopy.result;
  const playerFrames = playerDataCopy.frames;

  const frameList = createFrameList( playerFrames );

  return`
    <tr class="table__row-1 table-rows">
      <td><h3 class="row-1__player player">${playerName}</h3></td>
      <td><h3 class="row-1__score score">${playerScore}</h3></td>
      <td class="table-row__frames">
        <ul class="table-row__frames-list">
          ${frameList}
        </ul>
      </td>
    </tr>
  `; 
};

const createTableRows = ( playerData: PlayerInt[] ) => {
  const playerDataCopy = cloneDeep( playerData );
  let playerRows = ``;
  
  playerDataCopy.forEach( player => {
    const playerRow = createTableRow( player );
    playerRows += playerRow;
  });

  return playerRows;
}

export const displayResults = ( playerData: PlayerInt[] ) => {
  const playerDataCopy = cloneDeep( playerData );
  console.log( 'here we display in the table', playerData );

  const tableRows = createTableRows ( playerDataCopy );
  
  if ( tableBody !== null ) {
    tableBody.innerHTML = tableRows;
  };

};