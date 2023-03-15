export interface PlayerRollsInt {
  name: string;
  rolls: number[];
};

export interface FrameInt {
  frameId: number;
  rolls: number[];
  isStrike: boolean;
  isSpare: boolean;
  pointResult: number;
};

export interface PlayerInt {
  name: string;
  result: number | null;
  frames: FrameInt[];
};
