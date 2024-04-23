import MegaverseService from "./megaverse.service";
import axiosInstance from "../axios.instance";
import { MegaverseGoalMapDto, MegaverseMapDto } from "./dto/megaverse.dto";

class MegaverseApiService implements MegaverseService {

  readonly CANDIDATE_ID: string = process.env.REACT_APP_CANDIDATE_ID as string;

  async getGoalMap(): Promise<MegaverseGoalMapDto> {
    try {
      return (await axiosInstance.get(`/map/${this.CANDIDATE_ID}/goal`)).data;
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async getMap(): Promise<MegaverseMapDto> {
    try {
      return (await axiosInstance.get(`/map/${this.CANDIDATE_ID}`)).data;
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async createPolyanet(x: number, y: number): Promise<void> {
    try {
      await axiosInstance.post(`/polyanets`,
        {
        row: x,
        column: y,
        candidateId: this.CANDIDATE_ID,
      });
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async deletePolyanet(x: number, y: number): Promise<void> {
    try {

      await axiosInstance.delete(`/polyanets`,
        { data: {
              row: x,
              column: y,
              candidateId: this.CANDIDATE_ID,
            }});
    } catch (error) {
      console.error(error)
      throw error;
    }
  }
}
export default MegaverseApiService