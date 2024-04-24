import MegaverseService from "./megaverse.service";
import axiosInstance from "../axios.instance";
import { ComethDirection, MegaverseGoalMapDto, MegaverseMapDto, SoloonColor } from "./dto/megaverse.dto";

class MegaverseApiService implements MegaverseService {
  
  async getGoalMap(candidateId: string): Promise<MegaverseGoalMapDto> {
    try {
      return (await axiosInstance.get(`/map/${candidateId}/goal`)).data;
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async getMap(candidateId: string): Promise<MegaverseMapDto> {
    try {
      return (await axiosInstance.get(`/map/${candidateId}`)).data;
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async createPolyanet(candidateId: string, x: number, y: number): Promise<void> {
    try {
      await axiosInstance.post(`/polyanets`, {
        row: x,
        column: y,
        candidateId: candidateId,
      });
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async createCometh(candidateId: string, x: number, y: number, direction: ComethDirection): Promise<void> {
    try {
      await axiosInstance.post(`/comeths`, {
          row: x,
          column: y,
          direction: direction,
          candidateId: candidateId,
        });
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async createSoloon(candidateId: string, x: number, y: number, color: SoloonColor): Promise<void> {
    try {
      await axiosInstance.post(`/soloons`, {
          row: x,
          column: y,
          color: color,
          candidateId: candidateId,
        });
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async deletePolyanet(candidateId: string, x: number, y: number): Promise<void> {
    try {
      await axiosInstance.delete(`/polyanets`, {
        data: {
          row: x,
          column: y,
          candidateId: candidateId,
            }});
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async deleteCometh(candidateId: string, x: number, y: number): Promise<void> {
    try {
      await axiosInstance.delete(`/comeths`,
        { data: {
            row: x,
            column: y,
            candidateId: candidateId,
          }});
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async deleteSoloon(candidateId: string, x: number, y: number): Promise<void> {
    try {
      await axiosInstance.delete(`/soloons`,
        { data: {
            row: x,
            column: y,
            candidateId: candidateId,
          }});
    } catch (error) {
      console.error(error)
      throw error;
    }
  }
}
export default MegaverseApiService