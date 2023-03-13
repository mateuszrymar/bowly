
const maxFileSize: number = 1e6; // in bytes.

const getFileFromInput = (file: File): Promise<any> => {

  return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function () { 
        resolve(reader.result);
      };
      reader.readAsText(file); // here the file can be read in different way Text, DataUrl, ArrayBuffer
  });

}

const validateUploadedFile = ( text: String, file: File ) => {  
  
  // We check the file size:
  if ( text.length > maxFileSize ) throw new Error( "File's too large." )
  else console.log( `The file size is ${text.length}. It's OK.` );
  
  // We check the file extension:
  const extension = file.name.split('.')[1];
  if ( extension !== 'txt' ) throw new Error( "Wrong extension." )
  else console.log( `The file extension is ${extension}. It's OK.` );

  // We check if the text has any matches:
  console.log(text)
  
}

export const processUpload = async (event: Event ) => {
  console.log('passed to processUpload', event.target?.files );
  const file = event.target?.files[0];

  const result = getFileFromInput( file );
  validateUploadedFile( await result, file);
  // try {    
  //   manageUploadedFile( await result, file);
  // } catch (error) {
  //   // Here we can display error messages:
  //   console.log(error);  
  // } finally {
  //   console.log( await result);
  // }
  
  console.log( 'will it run after error?');
  return await result;
}