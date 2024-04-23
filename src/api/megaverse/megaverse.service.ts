import { MegaverseMapDto } from "./dto/megaverse.dto";

export default interface MegaverseService {
  getMap(): Promise<MegaverseMapDto>;
}