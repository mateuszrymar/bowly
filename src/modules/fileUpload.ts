interface PlayerRolls {
  name: string;
  rolls: number[];
};

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

const maxFileSize: number = 1e6; // in bytes.

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
  const regEx = RegExp(/(?<name>^[^,|\n]+)\r\n(?<results>[\d|,| ]+)/gm);
  const matchArray = [...textCopy.matchAll(regEx)];
  const allPlayerRolls: PlayerRolls[] = [];

  matchArray.forEach(element => {
    allPlayerRolls.push({ 
      name: element[1], 
      rolls: element[2].replace(/\s+/g, '').split(',').map(numAsString => Number(numAsString))
    });
  });
  
  return allPlayerRolls;
};

const displayUploadError = ( message: string ) => {

}

const checkFileSize = ( file: File ) => {
  if ( file.size > maxFileSize ) throw new Error( "File's too large." )
  else console.log( `The file size is ${file.size}b. OK.` );
};

const checkFileExtension = ( file: File ) => {
  const extension = file.name.split('.')[1];

  if ( extension !== 'txt' ) throw new Error( "Wrong extension." )
  else console.log( `The file extension is ${extension}. OK.` );
}

const checkMatches = ( text: string ) => {
  const matches = getNamesAndResults( text );
  if ( matches.length > 0) console.log( `Found ${matches.length} matches. OK.` )
  else throw new Error( "No matches found." ); 

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
    const namesAndResults = validateUploadedFile( await result, file);

    return namesAndResults;
  } else return [];
}