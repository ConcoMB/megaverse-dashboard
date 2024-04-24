import React, { useEffect, useMemo, useState } from "react";
import MegaverseApiService from "../../api/megaverse/megaverse.api.service";
import {
  MegaverseElement,
  MegaverseGoalMapDto,
} from "../../api/megaverse/dto/megaverse.dto";
import './goal.megaverse.css'
import Megaverse from "../../components/megaverse/megaverse";
import MegaverseService from "../../api/megaverse/megaverse.service";

function GoalMegaverse() {
  const apiService: MegaverseService = useMemo(() => new MegaverseApiService(), []);
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState(null)
  const [goalMegaverse, setGoalMegaverse] = useState<MegaverseElement[][]>([])
  useEffect( () => {
    const fetchMap = async (): Promise<void> => {
      try {
        const mapDto: MegaverseGoalMapDto = await apiService.getGoalMap()
        setGoalMegaverse(mapDto.goal)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMap()
  }, [apiService]);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      { error ? <span>Error {error}</span> : <Megaverse megaverse={goalMegaverse} /> }
    </div>
  )
}

export default GoalMegaverse