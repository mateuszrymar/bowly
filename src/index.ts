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

  uploadInput?.addEventListener('change', async (event: Event) => {
    const uploadedText = processUpload( event );
    nowDoSomethingWithData( await uploadedText );
  })
}

const init = (() => {
  addUploadListener();  
})();

const nowDoSomethingWithData = ( text: string) => {
  console.log('we cauht it here: ', text);  
}
