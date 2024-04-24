import { ComethDirection, MegaverseGoalMapDto, MegaverseMapDto, SoloonColor } from "./dto/megaverse.dto";

export default interface MegaverseService {
  getGoalMap(candidateId: string): Promise<MegaverseGoalMapDto>;
  getMap(candidateId: string): Promise<MegaverseMapDto>;
  createPolyanet(candidateId: string, x: number, y: number): Promise<void>;
  deletePolyanet(candidateId: string, x: number, y: number): Promise<void>;
  createSoloon(candidateId: string, x: number, y: number, color: SoloonColor): Promise<void>;
  deleteSoloon(candidateId: string, x: number, y: number): Promise<void>;
  createCometh(candidateId: string, x: number, y: number, direction: ComethDirection): Promise<void>;
  deleteCometh(candidateId: string, x: number, y: number): Promise<void>;
}