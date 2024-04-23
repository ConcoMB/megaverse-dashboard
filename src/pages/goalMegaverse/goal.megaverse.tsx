import React, { useEffect, useState } from "react";
import MegaverseApiService from "../../api/megaverse/megaverse.api.service";
import {
  MegaverseElement,
  MegaverseElementDto,
  MegaverseGoalMapDto,
  MegaverseMapDto
} from "../../api/megaverse/dto/megaverse.dto";
import './goal.megaverse.css'
import Megaverse from "../../components/megaverse/megaverse";
import megaverse from "../../components/megaverse/megaverse";

function GoalMegaverse() {
  const apiService = new MegaverseApiService();
  const [loading, setLoading] = useState<boolean>(true)
  const [goalMegaverse, setGoalMegaverse] = useState<MegaverseElement[][]>([])
  useEffect( () => {
    fetchMap()
  }, []);

  const fetchMap = async (): Promise<void> => {
    const mapDto: MegaverseGoalMapDto = await apiService.getGoalMap()
    setGoalMegaverse(mapDto.goal)
    setLoading(false)
  }

  if (loading) {
    return <div>Loading...</div>
  }


  return (
    <Megaverse megaverse={goalMegaverse}/>
  )
}

export default GoalMegaverse