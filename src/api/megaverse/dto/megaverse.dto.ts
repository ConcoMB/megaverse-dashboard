export interface MegaverseMapDto {
  map: MegaverseMapInstanceDto;
}

export interface MegaverseMapInstanceDto {
  _id: string;
  content: MegaverseElementDto[][];
}

export interface MegaverseElementDto {
  type: number
  color?: string;
  direction?: string;
}

export interface MegaverseGoalMapDto {
  goal: MegaverseElement[][];
}

export enum MegaverseElement {
  Space = "SPACE",
  Polyanet = "POLYANET",
  RightCometh= "RIGHT_COMETH",
  UpCometh= "UP_COMETH",
  LeftCometh= "LEFT_COMETH",
  DownCometh= "DOWN_COMETH",
  WhiteSoloon= "WHITE_SOLOON",
  BlueSoloon= "BLUE_SOLOON",
  PurpleSoloon= "PURPLE_SOLOON",
  RedSoloon= "RED_SOLOON",
  Default="default"
}

export enum SoloonColor {
  White = "white",
  Red = "red",
  Blue = "blue",
  Purple = "purple"
}

export enum ComethDirection {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}