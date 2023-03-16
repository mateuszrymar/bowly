/*
  This module is separate from all other .ts modules. It:
  1. Reads prepared HTML string from Session Storage.
  2. Displays it.
*/

// DOM Elements
const tableBody = document.querySelector('.table__body');

export const display = (() => {
  const tableRows = getDataFromSessionStorage();
  if ( tableBody !== null ) {
    tableBody.innerHTML = tableRows;
  };
})();

function getDataFromSessionStorage () {
  const data = window.sessionStorage.getItem( 'playerResults' );
  let playerData: string = `No results found.`;

  if ( data !== null ) {
    playerData = JSON.parse( data );
  };

  return playerData;
};