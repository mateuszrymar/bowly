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
    isValid ? namesAndResults = getNamesAndResults( await result ) : displayUploadError( errorMessage );

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

// @TODO check if three "check..." functions can be merged into one. There's a bit of repetition.
const checkFileSize = ( file: File ) => {
  const errorMessage = "File's too large.";
  let isValid: boolean;
  
  if ( file.size > maxFileSize ) {
    isValid = false;
    displayUploadError( errorMessage );
  } else {
    console.log( `The file size is ${file.size}b. OK.` );
    isValid = true;
  }

  return isValid;
};

const checkFileExtension = ( file: File ) => {
  const extension = file.name.split('.')[1];
  const errorMessage = "Wrong extension.";
  let isValid: boolean;

  if ( extension !== 'txt' ) {
    isValid = false;
    displayUploadError( errorMessage );
  } else {
    console.log( `The file extension is ${extension}. OK.` );
    isValid = true;
  };

  return isValid;
};

const checkMatches = ( text: string ) => {
  const errorMessage = "No matching names and results found.";
  const matches = getNamesAndResults( text );
  let isValid: boolean;

  if ( matches.length <= 0) {
    isValid = false;
    displayUploadError( errorMessage );
  } else {
    console.log( `Found ${matches.length} matches. OK.` );
    isValid = true;
    clearUploadError();
  };

  return isValid;
};

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

const getNamesAndResults = ( text: string ) => {
  const textCopy = `${text}`;
  const regEx = RegExp(/(?<name>^[^,|\n]+)\r\n(?<results>[\d|,| ]+$)/gm);
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