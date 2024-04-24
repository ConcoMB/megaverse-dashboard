import { ComethDirection, MegaverseElement, MegaverseElementDto, SoloonColor } from "./megaverse.dto";

const transformMegaverse = (megaverse: MegaverseElementDto[][]): MegaverseElement[][] => {
  return megaverse.map((row: MegaverseElementDto[]) => {
    return row.map((elem: MegaverseElementDto) => {
      if (elem === null) return MegaverseElement.Space;
      switch (elem.type) {
        case 0:
          return MegaverseElement.Polyanet
        case 1:
          return transformSoloon(elem)
        case 2:
          return transformCometh(elem)
        default:
          return MegaverseElement.Default;
      }
    })
  })
}

const transformSoloon = (elem: MegaverseElementDto): MegaverseElement => {
  switch (elem.color) {
    case SoloonColor.Red:
      return MegaverseElement.RedSoloon;
    case SoloonColor.Purple:
      return MegaverseElement.PurpleSoloon;
    case SoloonColor.White:
      return MegaverseElement.WhiteSoloon;
    case SoloonColor.Blue:
      return MegaverseElement.BlueSoloon;
    default:
      return MegaverseElement.Default;
  }
}

const transformCometh = (elem: MegaverseElementDto): MegaverseElement => {
  switch (elem.direction) {
    case ComethDirection.Up:
      return MegaverseElement.UpCometh;
    case ComethDirection.Down:
      return MegaverseElement.DownCometh;
    case ComethDirection.Left:
      return MegaverseElement.LeftCometh;
    case ComethDirection.Right:
      return MegaverseElement.RightCometh;
    default:
      return MegaverseElement.Default;
  }
}

export default transformMegaverse;