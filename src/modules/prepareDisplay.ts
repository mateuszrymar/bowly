import { cloneDeep } from "lodash-es";
import { PlayerInt, FrameInt } from "../types/types";

/* 
  This module
    1. Takes all Player objects.
    2. Creates HTML for the entire result table.
    3. Returns a string with HTML.
*/





export const prepareDisplay = ( playerData: PlayerInt[] ) => {
  const playerDataCopy = cloneDeep( playerData );
  const tableRows = createTableRows ( playerDataCopy );  
  return tableRows;
};

const createTableRows = ( playerData: PlayerInt[] ) => {
  const playerDataCopy = cloneDeep( playerData );
  let playerRows = ``;
  
  playerDataCopy.forEach( player => {
    const playerRow = createTableRow( player );
    playerRows += playerRow;
  });

  return playerRows;
};

const createTableRow = ( playerData: PlayerInt ) => {
  const playerDataCopy = cloneDeep( playerData );
  const playerName = playerDataCopy.name;
  const incorrectMessage = `<div class="error">Incorrect data.</div>`;
  const playerScore = (playerDataCopy.result === null) ? incorrectMessage : playerDataCopy.result;
  const playerFrames = playerDataCopy.frames;

  const frameList = createFrameList( playerFrames );

  return`
    <tr class="table-rows">
      <td><h3 class="table-row__player player">${playerName}</h3></td>
      <td><h3 class="table-row__score score">${playerScore}</h3></td>
      <td class="table-row__frames">
        <ul class="table-row__frames-list">
          ${frameList}
        </ul>
      </td>
    </tr>
  `; 
};

const createFrameList = ( playerFrames: FrameInt[] ) => {
  const playerFramesCopy = cloneDeep( playerFrames );
  let allPlayerFrames = ``;

  playerFramesCopy.forEach((currentFrame, i) => {
    if ( i < 9 ) {
      const frame = createTypicalFrame( currentFrame );
      allPlayerFrames += frame;
    } else {
      const frame = createLastFrame( currentFrame );
      allPlayerFrames += frame;
    };
  });

  return`${allPlayerFrames}`;
} ;

const createTypicalFrame = ( playerFrames: FrameInt ) => {
  const playerFramesCopy = cloneDeep( playerFrames );

  const rolls = playerFramesCopy.rolls;
  const pointResult = playerFramesCopy.pointResult;
  const isStrike = playerFramesCopy.isStrike[0];
  const isSpare = playerFramesCopy.isSpare[0];

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
};

const createLastFrame = ( playerFrames: FrameInt ) => {
  const playerFramesCopy = cloneDeep( playerFrames );

  const rolls = playerFramesCopy.rolls;
  const pointResult = playerFramesCopy.pointResult;
  const isStrike = playerFramesCopy.isStrike;
  const isSpare = playerFramesCopy.isSpare;

  const roll_1 = rolls[0];
  const roll_2 = (rolls[1] !== undefined) ? rolls[1] : ``;
  const roll_3 = (rolls[2] !== undefined) ? rolls[2] : ``;
  let strikeDiv: string[] = [];
  let spareDiv: string[] = [];

  isStrike.forEach(roll => {
    (roll === true) ? strikeDiv.push(`<div class="strike"></div>`) : strikeDiv.push(``);
  });
  isSpare.forEach(roll => {
    (roll === true) ? spareDiv.push(`<div class="spare"></div>`) : spareDiv.push(``);
  });

  return `
    <li class="table-row__frame--last table-row__frame">
      <div>
        <span class="roll">${roll_1}${strikeDiv[0]}</span>
        <span class="roll">${roll_2}${strikeDiv[1]}${spareDiv[0]}</span>
        <span class="roll">${roll_3}${strikeDiv[2]}${spareDiv[1]}</span>
      </div>
      <p class="frame__result">${pointResult}</p>
    </li>
  `;
};
