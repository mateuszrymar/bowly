import './index.css'


const addUploadListener = () => {
  const uploadButton = document.querySelector('.upload-page__button');
  const uploadInput: HTMLInputElement | null = document.querySelector('.upload-page__input');
  
  uploadButton?.addEventListener('click', (event) => {uploadInput?.click()})
}

const init = (() => {
  addUploadListener();  
})();
