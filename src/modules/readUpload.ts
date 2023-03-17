import { HTMLInputEvent, PlayerRollsInt } from "../types/types";

/* 
  This module:
  1. Reads a .txt file.
  2. Checks if the file is valid.
  3. If not, the app will stop code execution and display an error.
  4. If file checks are ok, the module returns an array of objects, each with player name and rolls array.
*/

// Variables
const maxFileSize: number = 1e6; // in bytes.
const searchRegEx = RegExp(/(?<name>^[^,|\n]+)\r\n(?<results>[\d|,| ]+$)/gm); 
// Name and results must be applied in this order on two neighbouring lines.
// Name can have any characters, except a comma.
// Results can have only digits, commas or spaces.
// If any of the above is not true, the entry will not be read.

// DOM Elements
const errorMessageBox: HTMLHeadingElement | null = document.querySelector('.upload-group__file-error-msg')





export const readUpload = async (event: HTMLInputEvent ) => {
  const files: FileList | null = event.target?.files;
  let file: File;
  let namesAndResults: PlayerRollsInt[] = [];
  
  if ( (files !== null) && files[0] ) { 

    const errorMessage = "File is invalid.";
    file = files[0]

    const result = getFileFromInput( file );
    const isValid = validateFile( await result, file);
    isValid ? namesAndResults = getNamesAndResults( await result, searchRegEx ) : displayUploadError( errorMessage );

  } else { 

    const errorMessage = "No file uploaded.";    
    return displayUploadError( errorMessage );

  };
  
  return namesAndResults;
};

const getFileFromInput = (file: File): Promise<any> => {
  return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function () { 
        resolve(reader.result);
      };
      reader.readAsText(file);
  });
};

const validateFile = ( text: string, file: File ) => {  
  let isValid: boolean;
  
  // This is only basic validation.
  // More thorough checks are performed in calculateResults module.
  const isSizeValid = checkFileSize( file );
  const isExtensionValid = checkFileExtension( file );
  const isAnyMatch = checkMatches( text );
  isValid = (isSizeValid && isExtensionValid && isAnyMatch);

  return isValid;
};

const checkFileSize = ( file: File ) => {
  const errorMessage = "File's too large.";
  const successMessage = `The file size is ${file.size}b. OK.`;
  return check ( file.size > maxFileSize, errorMessage, successMessage );;
};

const checkFileExtension = ( file: File ) => {
  const extension = file.name.split('.')[1];
  const errorMessage = "Wrong extension.";
  const successMessage = `The file extension is ${extension}. OK.`;
  return check ( extension !== 'txt', errorMessage, successMessage );;
};

const checkMatches = ( text: string ) => {
  const matches = getNamesAndResults( text, searchRegEx );
  const errorMessage = "No matching names and results found.";
  const successMessage = `Found ${matches.length} matches. OK.`;
  return check ( matches.length <= 0, errorMessage, successMessage );
};

const check = ( testCondition: boolean, errorMessage: string, successMessage: string ): boolean => {
  let isValid: boolean;

  if ( testCondition ) {
    isValid = false;
    displayUploadError( errorMessage );
  } else {
    console.log( `${successMessage}` );
    isValid = true;
    clearUploadError();
  };

  return isValid;
}

const displayUploadError = ( message: string ): never => {
  if ( errorMessageBox !== null ) {
    errorMessageBox.innerHTML = message;
  };
  
  throw new Error( message );
};

const clearUploadError = () => {
  if ( errorMessageBox !== null ) {
    errorMessageBox.innerHTML = ``;
  } else return;
};

const getNamesAndResults = ( text: string, regEx: RegExp ) => {
  const textCopy = `${text}`;  
  const matchArray = [...textCopy.matchAll(regEx)];
  const allPlayerRolls: PlayerRollsInt[] = [];

  matchArray.forEach(element => {
    allPlayerRolls.push({ 
      name: element[1], 
      rolls: element[2]
        .replace(/\s+/g, '')
        .split(',')
        .map(numAsString => Number(numAsString))
    });
  });
  
  return allPlayerRolls;
};