import { HTMLInputEvent, PlayerRollsInt } from "../types/types";

/* 
  This module:
  1. Reads a .txt file.
  2. Checks if the file is valid.
  3. If not, the app will stop code execution and display an error.
     If yes, the app will proceed.
*/

// Variables
const maxFileSize: number = 1e6; // in bytes.

// DOM Elements
const errorMessageBox: HTMLHeadingElement | null = document.querySelector('.upload__file-error-msg')





export const readUpload = async (event: HTMLInputEvent ) => {

  // @TODO Try to avoid this "any":
  const files: any = event.target?.files;
  let file: File;
  
  if ( files[0] ) { 
    file = files[0]
    const result = getFileFromInput( file );
    const isValid = validateFile( await result, file);
    let namesAndResults: PlayerRollsInt[];

    isValid ? namesAndResults = getNamesAndResults( await result ) : namesAndResults = [];

    return namesAndResults;
  } else return [];
  // @TODO I don't like returning empty arrays like that. ^
  // It's better to throw and display errors! Rewrite that!
  
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

  const message = "File's too large.";
  let isValid: boolean;
  
  if ( file.size > maxFileSize ) {
    displayUploadError( message );
    isValid = false;
    throw new Error( message );
  } else {
    console.log( `The file size is ${file.size}b. OK.` );
    isValid = true;
  }

  return isValid;

};

const checkFileExtension = ( file: File ) => {
  const extension = file.name.split('.')[1];
  const message = "Wrong extension.";
  let isValid: boolean;

  if ( extension !== 'txt' ) {
    displayUploadError( message );
    isValid = false;
    throw new Error( message );
  } else {
    console.log( `The file extension is ${extension}. OK.` );
    isValid = true;
  };

  return isValid;
}

const checkMatches = ( text: string ) => {
  const errorMessage = "No matching names and results found.";
  const matches = getNamesAndResults( text );
  let isValid: boolean;

  if ( matches.length <= 0) {
    displayUploadError( errorMessage );
    isValid = false;
    throw new Error( errorMessage );
  } else {
    console.log( `Found ${matches.length} matches. OK.` );
    isValid = true;
    clearUploadError();
  }

  return isValid;
}

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

const getNamesAndResults = ( text: string ) => {

  const textCopy = `${text}`;
  const regEx = RegExp(/(?<name>^[^,|\n]+)\n(?<results>[\d|,| |-]+$)/gm);
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











