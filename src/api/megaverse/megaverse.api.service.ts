import MegaverseService from "./megaverse.service";
import axiosInstance from "../axios.instance";
import { ComethDirection, MegaverseGoalMapDto, MegaverseMapDto, SoloonColor } from "./dto/megaverse.dto";

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
      await axiosInstance.post(`/polyanets`, {
        row: x,
        column: y,
        candidateId: this.CANDIDATE_ID,
      });
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async createCometh(x: number, y: number, direction: ComethDirection): Promise<void> {
    try {
      await axiosInstance.post(`/comeths`, {
          row: x,
          column: y,
          direction: direction,
          candidateId: this.CANDIDATE_ID,
        });
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async createSoloon(x: number, y: number, color: SoloonColor): Promise<void> {
    try {
      await axiosInstance.post(`/soloons`, {
          row: x,
          column: y,
          color: color,
          candidateId: this.CANDIDATE_ID,
        });
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async deletePolyanet(x: number, y: number): Promise<void> {
    try {
      await axiosInstance.delete(`/polyanets`, {
        data: {
          row: x,
          column: y,
          candidateId: this.CANDIDATE_ID,
            }});
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async deleteCometh(x: number, y: number): Promise<void> {
    try {
      await axiosInstance.delete(`/comeths`,
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

  async deleteSoloon(x: number, y: number): Promise<void> {
    try {
      await axiosInstance.delete(`/soloons`,
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