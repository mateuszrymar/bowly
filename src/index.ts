import './index.css'


const processUpload = async (event: Event ) => {
  console.log('passed to processUpload', event.target?.files );
  const file = event.target?.files[0];

  const result = getFileFromInput( file );
  manageUploadedFile( await result, file);
  // try {    
  //   manageUploadedFile( await result, file);
  // } catch (error) {
  //   // Here we can display 
  //   console.log(error);  
  // } finally {
  //   console.log( await result);
  // }
  
  console.log( 'will it run after error?');
}



const addUploadListener = () => {
  const uploadButton = document.querySelector('.upload-page__button');
  const uploadInput: HTMLInputElement | null = document.querySelector('.upload-page__input');
  
  uploadButton?.addEventListener('click', (event) => {
    uploadInput?.click();
    event.preventDefault();
    // uploadInput.onchange(console.log('changed'));
    // processUpload( event );
  })

  uploadInput?.addEventListener('change', (event: Event) => {
    processUpload( event )
  })


}

const init = (() => {
  addUploadListener();  
})();

function getFileFromInput (file: File): Promise<any> {
  return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function () { 
        resolve(reader.result);
      };
      reader.readAsText(file); // here the file can be read in different way Text, DataUrl, ArrayBuffer
  });
}

function manageUploadedFile(binary: String, file: File) {  
  
  if (binary.length > 100) throw new Error("File's too large.")
  else console.log(`The file size is ${binary.length}. It's OK.`);
  
  const extension = file.name.split('.')[1];
  if (extension !== 'txt') throw new Error("Wrong extension.")
  else console.log(`The file extension is ${extension}. It's OK.`);;
  
}
