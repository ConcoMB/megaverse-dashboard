import React from "react";
import { FC } from "react";
import { MegaverseProps } from "./megaverse.props";
import { MegaverseElement, MegaverseElementDto } from "../../api/megaverse/dto/megaverse.dto";

const Megaverse: FC<MegaverseProps> = ({ megaverse }) => {

  const getElementEmoji = (cell: MegaverseElement): string => {
    switch (cell) {
      case MegaverseElement.Space:
        return '🌌'
      case MegaverseElement.Polyanet:
        return '🪐';
      case MegaverseElement.RightCometh:
      case MegaverseElement.UpCometh:
      case MegaverseElement.LeftCometh:
      case MegaverseElement.DownCometh:
        return '☄️';
      case MegaverseElement.WhiteSoloon:
      case MegaverseElement.BlueSoloon:
      case MegaverseElement.PurpleSoloon:
      case MegaverseElement.RedSoloon:
        return '🌕'
    }
    return "❓"
  }

  const getElementClass = (cell: MegaverseElement): string => {
    switch (cell) {
      case MegaverseElement.Space:
        return ''
      case MegaverseElement.Polyanet:
        return '';
      case MegaverseElement.RightCometh:
        return 'rotate-140deg'
      case MegaverseElement.UpCometh:
        return 'rotate-48deg'
      case MegaverseElement.LeftCometh:
        return 'rotate-330deg'
      case MegaverseElement.DownCometh:
        return 'rotate-230deg';
      case MegaverseElement.WhiteSoloon:
        return 'white-soloon'
      case MegaverseElement.BlueSoloon:
        return 'blue-soloon'
      case MegaverseElement.PurpleSoloon:
        return 'purple-soloon'
      case MegaverseElement.RedSoloon:
        return 'red-soloon'
    }
    return ""
  }

  return (
    <table>
      <tbody>
      {
        megaverse.map((row: MegaverseElement[], i: number) => {
          return <tr key={`megaverse-row-${i}`}>
            {
              row.map((cell: MegaverseElement, j: number) => {
                return <td
                  key={`megaverse-cell-${i}-${j}`}
                  className={`megaverse-cell ${getElementClass(cell)}`} >
                  {getElementEmoji(cell)}
                </td>
              })
            }
          </tr>
        })
      }
      </tbody>
    </table>
  );
}

export default Megaverse;