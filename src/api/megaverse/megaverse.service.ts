import { MegaverseGoalMapDto, MegaverseMapDto } from "./dto/megaverse.dto";

export default interface MegaverseService {
  getGoalMap(): Promise<MegaverseGoalMapDto>;
  getMap(): Promise<MegaverseMapDto>;
  createPolyanet(x: number, y: number): Promise<void>;
  deletePolyanet(x: number, y: number): Promise<void>;
}