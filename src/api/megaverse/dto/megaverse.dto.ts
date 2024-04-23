export interface MegaverseMapDto {
  map: MegaverseMapInstanceDto;
}

export interface MegaverseMapInstanceDto {
  _id: string;
  content: string[][];
}