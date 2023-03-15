// Interfaces
interface PlayerRolls {
  name: string;
  rolls: number[];
};

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

// Variables
const maxFileSize: number = 1e6; // in bytes.
const errorMessageBox: HTMLHeadingElement | null = document.querySelector('.upload-page__file-error-msg')

// Functions
const getFileFromInput = (file: File): Promise<any> => {

  return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function () { 
        resolve(reader.result);
      };
      reader.readAsText(file);
  });
}

const getNamesAndResults = ( text: string ) => {
  const textCopy = `${text}`;
  const regEx = RegExp(/(?<name>^[^,|\n]+)\n(?<results>[\d|,| |-]+$)/gm);
  const matchArray = [...textCopy.matchAll(regEx)];
  const allPlayerRolls: PlayerRolls[] = [];

  matchArray.forEach(element => {
    allPlayerRolls.push({ 
      name: element[1], 
      rolls: element[2]
        .replace(/\s+/g, '')
        .split(',')
        .map(numAsString => Number(numAsString))
    });
  });

  console.log(matchArray);
  
  
  return allPlayerRolls;
};

const displayUploadError = ( message: string ) => {
  if ( errorMessageBox !== null ) {
    errorMessageBox.innerHTML = message;
  } else return;
}

const clearUploadError = () => {
  if ( errorMessageBox !== null ) {
    errorMessageBox.innerHTML = ``;
  } else return;
}

const checkFileSize = ( file: File ) => {
  const message = "File's too large.";
  
  if ( file.size > maxFileSize ) {
    displayUploadError( message );
    throw new Error( message );
  }
  else console.log( `The file size is ${file.size}b. OK.` );
};

const checkFileExtension = ( file: File ) => {
  const extension = file.name.split('.')[1];
  const message = "Wrong extension.";

  if ( extension !== 'txt' ) {
    displayUploadError( message );
    throw new Error( message );
  }
  else console.log( `The file extension is ${extension}. OK.` );
}

const checkMatches = ( text: string ) => {
  const errorMessage = "No matching names and results found.";
  const matches = getNamesAndResults( text );

  if ( matches.length <= 0) {
    displayUploadError( errorMessage );
    throw new Error( errorMessage );
  } else {
    clearUploadError();
    console.log( `Found ${matches.length} matches. OK.` );
  }

  return matches;
}

const validateUploadedFile = ( text: string, file: File ) => {  
  
  // This is only basic validation.
  // More thorough checks are performed in calculateResults module.
  checkFileSize( file );
  checkFileExtension( file );
  const matches = checkMatches( text );

  return matches;
}

export const processUpload = async (event: HTMLInputEvent ) => {
  console.log('passed to processUpload', event.target?.files );
  const files: any = event.target?.files;
  let file: File;
  
  if ( files[0] ) { 
    file = files[0]
    const result = getFileFromInput( file );
    console.log(result);    
    const namesAndResults = validateUploadedFile( await result, file);
    console.log(namesAndResults);    

    return namesAndResults;
  } else return [];
}