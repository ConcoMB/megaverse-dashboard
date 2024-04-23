export interface MegaverseMapDto {
  map: MegaverseMapInstanceDto;
}

export interface MegaverseMapInstanceDto {
  _id: string;
  content: MegaverseElementDto[][];
}

export interface MegaverseElementDto {
  type: number
}

export interface MegaverseGoalMapDto {
  goal: string[][];
}