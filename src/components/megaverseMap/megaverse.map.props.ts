import { MegaverseElement } from "../../api/megaverse/dto/megaverse.dto";

export interface MegaverseMapProps {
  megaverse: MegaverseElement[][];
  onCellClickedListener?: Function;
}