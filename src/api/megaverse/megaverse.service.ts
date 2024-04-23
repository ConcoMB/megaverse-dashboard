import { ComethDirection, MegaverseGoalMapDto, MegaverseMapDto, SoloonColor } from "./dto/megaverse.dto";

export default interface MegaverseService {
  getGoalMap(): Promise<MegaverseGoalMapDto>;
  getMap(): Promise<MegaverseMapDto>;
  createPolyanet(x: number, y: number): Promise<void>;
  deletePolyanet(x: number, y: number): Promise<void>;
  createSoloon(x: number, y: number, color: SoloonColor): Promise<void>;
  deleteSoloon(x: number, y: number): Promise<void>;
  createCometh(x: number, y: number, direction: ComethDirection): Promise<void>;
  deleteCometh(x: number, y: number): Promise<void>;
}