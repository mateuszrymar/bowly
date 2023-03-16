import './index.css';
// import './modules/results';
import faviconUrl from "./assets/vite.svg"
import txtUrl from "./assets/Ten-pin-results-example.txt"
import { cloneDeep } from 'lodash-es';
import { readUpload } from './modules/readUpload';
import { calculateResults } from './modules/calculateResults';
import { displayResults } from './modules/displayResults';
import { deepClone } from '@vitest/utils';
import { PlayerInt, PlayerRollsInt, HTMLInputEvent } from './types/types';

/*
  The app does 4 things:
    1. Gets entries from a text file.
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

// DOM Elements
const uploadButton = document.querySelector('.upload__button');
const uploadInput: HTMLInputElement | null = document.querySelector('.upload__input');





// Initialization:
(() => {  

  // This listener makes our button upload files:
  uploadButton?.addEventListener('click', (event) => {
    event.preventDefault();
    uploadInput?.click();
  });
  // This listener starts the whole read-prepare-display sequence:
  uploadInput?.addEventListener('change', ( event: any ) => {
    event.preventDefault();
    getPlayerEntries( event );
  });

})();

// Step 1: Get entries from a text file.
async function getPlayerEntries( event: HTMLInputEvent ) {

  const playerEntries = readUpload( event );
  processForDisplay( await playerEntries );

};

// Steps 2 & 3: Calculate results, prepare for display and save:
function processForDisplay ( entries: PlayerRollsInt[] ) {

  const playerEntries: PlayerRollsInt[] = cloneDeep( entries );  
  const detailedResults = calculateResults( playerEntries );
  const tableHtml = displayResults( detailedResults );
  saveToSessionStorage( tableHtml );
  
  // Finally, we switch to results.html:
  if ( tableHtml !== "" ) redirectToResultsPage();

}

function saveToSessionStorage( data: string ) {

  const dataCopy = deepClone( data );
  const json = JSON.stringify( dataCopy );
  window.sessionStorage.setItem( 'playerResults', json );

}

function redirectToResultsPage() {

  const newLocation = `${window.location.origin}/pages/results.html`;
  window.location.replace(newLocation);

}
