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


const typicalFrameTemplate = `
<li class="table-row__frame">
  <div class="frame__rolls">
    <span class="roll">8</span>
    <span class="roll">2<div class="spare"></div></span>
  </div>
  <p class="frame__result">16</p>
</li>
`;

const lastFrameTemplate = `
<li class="table-row__frame--last table-row__frame">
  <div>
    <span class="roll">8</span>
    <span class="roll">2<div class="spare"></div></span>
    <span class="roll">2</span>
  </div>
  <p class="frame__result">16</p>
</li>
`;

const createFrameList = () => {
  return`
        ${typicalFrameTemplate}
        ${typicalFrameTemplate}
        ${typicalFrameTemplate}
        ${typicalFrameTemplate}
        ${typicalFrameTemplate}
        ${typicalFrameTemplate}
        ${typicalFrameTemplate}
        ${typicalFrameTemplate}
        ${typicalFrameTemplate}
        ${lastFrameTemplate}      
  `;
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