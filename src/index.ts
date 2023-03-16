import './index.css';
import './modules/results';
import faviconUrl from "./assets/vite.svg"
import txtUrl from "./assets/Ten-pin-results-example.txt"
import { cloneDeep } from 'lodash-es';
import { readUpload } from './modules/fileUpload';
import { getAllPlayerResults } from './modules/calculateResults';
import { deepClone } from '@vitest/utils';
import { PlayerInt, PlayerRollsInt, HTMLInputEvent } from './types/types';

/*

  The app does 4 things:
    1. Reads a text file that was input.
    2. Calculates results.
    3. Prepares results to be displayed.
    4. Displays results.
  Each of these tasks is handled in a separate module.

  Steps 1-3 are handled in index.ts (this file).
  Step 4 is handled independently by results.ts.
  This is because the app has 2 pages: index.html and results.html.

  Glossary:
  "Frame" is one of ten scoring rounds constituting a game.
  "Roll" is as single throw of a ball.
  Frames consist of 1,2 or 3 rolls.

*/

// DOM Elements:
const uploadButton = document.querySelector('.upload__button');
const uploadInput: HTMLInputElement | null = document.querySelector('.upload__input');

// Initialization:
(() => {  
  // This listener makes our button upload files:
  uploadButton?.addEventListener('click', (event) => {
    event.preventDefault();
    uploadInput?.click();
  })
  
  // This listener starts the whole read-prepare-display sequence:
  uploadInput?.addEventListener('change', ( event: any ) => {
    event.preventDefault();
    getPlayerData( event );
  })
})();

async function getPlayerData( event: HTMLInputEvent ) {
  
  // Here we get the names and rolls of each player:
  const playerRolls = readUpload( event );
  console.log('playerRolls', playerRolls)
  processPlayerEntries( await playerRolls );
}

// Here we dispatch data to appropriate modules and save data:
const processPlayerEntries = ( text: PlayerRollsInt[] ) => {

  const playerEntries: PlayerRollsInt[] = cloneDeep(text);
  
  // First, we process text entries into frames:
  const playerResults = getAllPlayerResults( playerEntries );
  console.log('player results: ', playerResults);
  

  // Now we can save player results to sessionstorage
  saveToSessionStorage( playerResults );
  
  // Now we can switch to results.html
  // if ( playerResults.length !== 0 ) redirectToResultsPage();  
}

function saveToSessionStorage( data: PlayerInt[] ) {
  const dataCopy = deepClone( data );
  const json = JSON.stringify( dataCopy );

  window.sessionStorage.setItem( 'playerResults', json );
}

function redirectToResultsPage() {
  const newLocation = `${window.location.origin}/pages/results.html`;
  window.location.replace(newLocation);
}
