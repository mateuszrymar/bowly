import './index.css';
import { processUpload } from './modules/fileUpload';


// DOM Elements:
const uploadButton = document.querySelector('.upload-page__button');
const uploadInput: HTMLInputElement | null = document.querySelector('.upload-page__input');


const addUploadListener = () => {  
  uploadButton?.addEventListener('click', (event) => {
    uploadInput?.click();
    event.preventDefault();
  })

  // @TODO This type check on the event is tricky:
  uploadInput?.addEventListener('change', async (event: any ) => {
    const uploadedText = processUpload( event );
    processTextEntries( await uploadedText );
  })
}

// Initialization:
(() => {
  addUploadListener();  
})();

const redirectToResultsPage = () => {
  const newLocation = `${window.location.origin}/results.html`
  window.location.replace(newLocation);
}

const processTextEntries = ( text: object[] ) => {
  console.log('We caught it in index.html: ', text );

  // @TODO Here we'll process text entries into frames

  // @TODO Validation will be handled in an external module. 

  // now we can switch to results.html
  // redirectToResultsPage();
}
