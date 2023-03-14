import './index.css';
// import './results';
import { cloneDeep } from 'lodash-es';

import { processUpload } from './modules/fileUpload';
import { getAllPlayerResults } from './modules/calculateResults';
import { deepClone } from '@vitest/utils';



interface PlayerRolls {
  name: string;
  rolls: number[];
};

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



// DOM Elements:
const uploadButton = document.querySelector('.upload-page__button');
const uploadInput: HTMLInputElement | null = document.querySelector('.upload-page__input');

const addUploadListener = () => {  
  uploadButton?.addEventListener('click', (event) => {
    uploadInput?.click();
    event.preventDefault();
  })

  // @TODO This type check on the event is tricky:
  uploadInput?.addEventListener('change', async ( event: any ) => {
    const uploadedText = processUpload( event );
    processPlayerEntries( await uploadedText );
  })
}

// Initialization:
(() => {
  addUploadListener();  
})();

const saveToSessionStorage = ( data: PlayerInt[] ) => {
  console.log( 'ready for saving: ', data );
  const dataCopy = deepClone( data );
  const json = JSON.stringify( dataCopy );

  window.sessionStorage.setItem( 'playerResults', json );
}

const redirectToResultsPage = () => {
  const newLocation = `${window.location.origin}/results.html`
  window.location.replace(newLocation);
}

const processPlayerEntries = ( text: PlayerRolls[] ) => {
  // console.log('We caught it in index.html: ', text );
  const playerEntries: PlayerRolls[] = cloneDeep(text);
  
  // @TODO Here we'll process text entries into frames
  const playerResults = getAllPlayerResults( playerEntries );
  console.log(playerResults);

  // now we can save player results to sessionstorage
  saveToSessionStorage( playerResults );

  // now we can switch to results.html
  redirectToResultsPage();  
}
