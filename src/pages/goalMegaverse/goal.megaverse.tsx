import React, { useEffect, useState } from "react";
import MegaverseApiService from "../../api/megaverse/megaverse.api.service";
import { MegaverseElementDto, MegaverseGoalMapDto, MegaverseMapDto } from "../../api/megaverse/dto/megaverse.dto";
import './goal.megaverse.css'

function GoalMegaverse() {
  const apiService = new MegaverseApiService();
  const [loading, setLoading] = useState<boolean>(true)
  const [goalMegaverse, setGoalMegaverse] = useState<string[][]>([])
  useEffect( () => {
    fetchMap()
  }, []);

  const fetchMap = async (): Promise<void> => {
    const mapDto: MegaverseGoalMapDto = await apiService.getGoalMap()
    setGoalMegaverse(mapDto.goal)
    const set = new Set;
    for (const s1 of mapDto.goal) {
      for (const s of s1) {
        set.add(s)
      }
    }
    console.log(set)
    setLoading(false)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const getElementEmoji = (cell: string): string => {
    switch (cell) {
      case "SPACE":
        return '🌌'
      case "POLYANET":
        return '🪐';
      case "RIGHT_COMETH":
      case "UP_COMETH":
      case "LEFT_COMETH":
      case "DOWN_COMETH":
        return '☄️';
      case "WHITE_SOLOON":
      case "BLUE_SOLOON":
      case "PURPLE_SOLOON":
      case "RED_SOLOON":
        return '🌕'
    }
    return "❓"
  }

  const getElementClass = (cell: string): string => {
    switch (cell) {
      case "SPACE":
        return ''
      case "POLYANET":
        return '';
      case "RIGHT_COMETH":
        return 'rotate-140deg'
      case "UP_COMETH":
        return 'rotate-48deg'
      case "LEFT_COMETH":
        return 'rotate-330deg'
      case "DOWN_COMETH":
        return 'rotate-230deg';
      case "WHITE_SOLOON":
        return 'white-soloon'
      case "BLUE_SOLOON":
        return 'blue-soloon'
      case "PURPLE_SOLOON":
        return 'purple-soloon'
      case "RED_SOLOON":
        return 'red-soloon'
    }
    return ""
  }

  return (
    <table>
      <tbody>
      {
        goalMegaverse.map((row: string[], i: number) => {
          return <tr key={`megaverse-goal-row-${i}`}>
            {
              row.map((cell: string, j: number) => {
                return <td key={`megaverse-goal-cell-${i}-${j}`} className={`megaverse-goal-cell ${getElementClass(cell)}`}>{getElementEmoji(cell)}</td>
              })
            }
          </tr>
        })
      }
      </tbody>
    </table>
  )
}

export default GoalMegaverse