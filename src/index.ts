import './index.css';
import './results';
import './testfiles/Ten-pin-results-example.txt'
// import '../results.html'


import { cloneDeep } from 'lodash-es';
import { processUpload } from './modules/fileUpload';
import { getAllPlayerResults } from './modules/calculateResults';
import { deepClone } from '@vitest/utils';
import { PlayerInt, PlayerRollsInt } from './modules/interface';

// DOM Elements:
const uploadButton = document.querySelector('.upload__button');
const uploadInput: HTMLInputElement | null = document.querySelector('.upload__input');

const addUploadListener = () => {  
  uploadButton?.addEventListener('click', (event) => {
    event.preventDefault();
    uploadInput?.click();
  })
  
  // @TODO This type check on the event is tricky:
  uploadInput?.addEventListener('change', async ( event: any ) => {
    event.preventDefault();
    const uploadedText = processUpload( event );
    processPlayerEntries( await uploadedText );
  })
}

// Initialization:
(() => {
  addUploadListener();  
})();

const saveToSessionStorage = ( data: PlayerInt[] ) => {
  const dataCopy = deepClone( data );
  const json = JSON.stringify( dataCopy );

  window.sessionStorage.setItem( 'playerResults', json );
}

const redirectToResultsPage = () => {
  const newLocation = `${window.location.origin}/results.html`
  window.location.replace(newLocation);
}

// Here we dispatch data to appropriate modules and functions:
const processPlayerEntries = ( text: PlayerRollsInt[] ) => {
  const playerEntries: PlayerRollsInt[] = cloneDeep(text);
  
  // Here we'll process text entries into frames
  const playerResults = getAllPlayerResults( playerEntries );

  // Now we can save player results to sessionstorage
  saveToSessionStorage( playerResults );
  
  // Now we can switch to results.html
  if ( playerResults.length !== 0 ) redirectToResultsPage();  
}
