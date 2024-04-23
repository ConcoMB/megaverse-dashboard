import MegaverseService from "./megaverse.service";
import axiosInstance from "../axios.instance";
import { MegaverseMapDto } from "./dto/megaverse.dto";

class MegaverseApiService implements MegaverseService {

  readonly CANDIDATE_ID = process.env.REACT_APP_CANDIDATE_ID

  async getMap(): Promise<MegaverseMapDto> {
    try {
      return (await axiosInstance.get(`/map/${this.CANDIDATE_ID}`)).data;
    } catch (error) {
      console.error(error)
      throw error;
    }
  }
}
export default MegaverseApiService