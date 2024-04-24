import React, { useEffect, useMemo, useState } from "react";
import MegaverseApiService from "../../api/megaverse/megaverse.api.service";
import {
  MegaverseElement,
  MegaverseGoalMapDto,
} from "../../api/megaverse/dto/megaverse.dto";
import './goal.megaverse.css'
import MegaverseMap from "../megaverseMap/megaverse.map";
import MegaverseService from "../../api/megaverse/megaverse.service";
import LOCAL_STORAGE_KEY_CANDIDATE_ID from "../../privateRoutes/private.route";

function GoalMegaverse() {
  const apiService: MegaverseService = useMemo(() => new MegaverseApiService(), []);
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState(null)
  const [goalMegaverse, setGoalMegaverse] = useState<MegaverseElement[][]>([])
  const candidateId = localStorage.getItem(LOCAL_STORAGE_KEY_CANDIDATE_ID) as string;
  useEffect( () => {
    const fetchMap = async (): Promise<void> => {
      try {
        const mapDto: MegaverseGoalMapDto = await apiService.getGoalMap(candidateId)
        setGoalMegaverse(mapDto.goal)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMap()
  }, [apiService, candidateId]);

  if (loading) {
    return <div><h3>Loading...</h3></div>
  }

  return (
    <div className="flex-container vertical">
      <h1>This is the Megaverse you need to achieve:</h1>
      { error ? <p>Error {error}</p> : <MegaverseMap megaverse={goalMegaverse} /> }
      <p>Candidate ID: {candidateId}</p>
    </div>
  )
}

export default GoalMegaverse