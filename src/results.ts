import { displayResults } from './modules/displayResults';


interface FrameInt {
  frameId: number;
  rolls: number[];
  isStrike: boolean;
  isSpare: boolean;
  pointResult: number;
}

interface PlayerInt {
  name: string;
  result: number | null;
  frames: FrameInt[];
}

console.log('This should work on table page only.');

const getDataFromSessionStorage = () => {
  const data = window.sessionStorage.getItem( 'playerResults' );
  let playerData: PlayerInt[] = [];

  if ( data !== null ) {
    playerData = JSON.parse( data );
  }

  return playerData;
}

const playerData = getDataFromSessionStorage();
displayResults( playerData );
