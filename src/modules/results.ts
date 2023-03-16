import { FrameInt, PlayerInt } from "../types/types";

// DOM Elements
const tableBody = document.querySelector('.table__body');

console.log('This should work on table page only.');

const getDataFromSessionStorage = () => {
  const data = window.sessionStorage.getItem( 'playerResults' );
  let playerData: string = `No results found.`;

  if ( data !== null ) {
    playerData = JSON.parse( data );
  }

  return playerData;
}

// displayResults( playerData );

(function display () {
  const tableRows = getDataFromSessionStorage();
  if ( tableBody !== null ) {
    tableBody.innerHTML = tableRows;
  };
})();
