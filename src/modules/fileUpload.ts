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

const validateUploadedFile = ( text: string, file: File ) => {  
  
  // We check the file size:
  if ( text.length > maxFileSize ) throw new Error( "File's too large." )
  else console.log( `The file size is ${text.length}. It's OK.` );
  
  // We check the file extension:
  const extension = file.name.split('.')[1];
  if ( extension !== 'txt' ) throw new Error( "Wrong extension." )
  else console.log( `The file extension is ${extension}. It's OK.` );

  // We check if the text has any matches:
  // console.log(text);
  const matches = getNamesAndResults( text );
  if ( matches.length > 0) console.log( `Found ${matches.length} matches. It's OK.` )
  else throw new Error( "No matches found." ); 

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