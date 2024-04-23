import React, { useEffect, useRef, useState } from "react";
import MegaverseApiService from "../../api/megaverse/megaverse.api.service";
import {
  ComethDirection,
  MegaverseElement,
  MegaverseElementDto,
  MegaverseGoalMapDto,
  MegaverseMapDto,
  SoloonColor
} from "../../api/megaverse/dto/megaverse.dto";
import './your.megaverse.css'
import Megaverse from "../../components/megaverse/megaverse";

function YourMegaverse() {
  const apiService = new MegaverseApiService();
  const createButtonRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState<boolean>(true)
  const [megaverse, setMegaverse] = useState<MegaverseElementDto[][]>([])
  useEffect( () => {
    fetchMap()
  }, []);

  const fetchMap = async (): Promise<void> => {
    const mapDto: MegaverseMapDto = await apiService.getMap()
    setMegaverse(mapDto.map.content)
    setLoading(false)
  }

  const handleCellClick = async (x: number, y: number): Promise<void> => {
    setLoading(true);
    if (megaverse[x][y] === null) {
      await apiService.createPolyanet(x, y)
    } else {
      await apiService.deletePolyanet(x, y)
    }
    fetchMap();
  }

  const refreshAndWait = async () => {
    await fetchMap();
    await delay(2000);
  }

  const buildElement = async (element: string, x: number, y: number) => {
    switch (element) {
      case "POLYANET":
        await apiService.createPolyanet(x, y)
        await refreshAndWait();
        return;
      case "RIGHT_COMETH":
        await apiService.createCometh(x, y, ComethDirection.Right)
        await refreshAndWait();
        return;
      case "UP_COMETH":
        await apiService.createCometh(x, y, ComethDirection.Up)
        await refreshAndWait();
        return;
      case "LEFT_COMETH":
        await apiService.createCometh(x, y, ComethDirection.Left)
        await refreshAndWait();
        return;
      case "DOWN_COMETH":
        await apiService.createCometh(x, y, ComethDirection.Down)
        await refreshAndWait();
        return;
      case "WHITE_SOLOON":
        await apiService.createSoloon(x, y, SoloonColor.White)
        await refreshAndWait();
        return;
      case "BLUE_SOLOON":
        await apiService.createSoloon(x, y, SoloonColor.Blue)
        await refreshAndWait();
        return;
      case "PURPLE_SOLOON":
        await apiService.createSoloon(x, y, SoloonColor.Purple)
        await refreshAndWait();
        return;
      case "RED_SOLOON":
        await apiService.createSoloon(x, y, SoloonColor.Red)
        await refreshAndWait();
        return;
      case "SPACE":
      default:
        return;
    }
  }

  const buildTowardsGoal = async () => {
    if (createButtonRef.current) {
      createButtonRef.current.disabled = true;
      createButtonRef.current.textContent = "Creating universe...";
    }
    const mapDto: MegaverseGoalMapDto = await apiService.getGoalMap()
    const goal: string[][] = mapDto.goal;
    for (let i = 0; i < goal.length; i++) {
      for (let j = 0; j < goal[0].length; j++) {
        await buildElement(goal[i][j], i, j)
      }
    }
    if (createButtonRef.current) {
      createButtonRef.current.textContent = "Build towards goal!";
      createButtonRef.current.disabled = false;
    }
  }

  const delay = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const deleteElement = async (element: MegaverseElementDto, x: number, y: number) => {
    if (!element) return;
    switch (element.type) {
      case 0:
        await apiService.deletePolyanet(x, y)
        return;
    }
  }

  const eraseUniverse = async () => {
    setLoading(true)
    for (let i = 0; i < megaverse.length; i++) {
      for (let j = 0; j < megaverse[0].length; j++) {
        await deleteElement(megaverse[i][j], i, j)
        await delay(2000)
      }
    }
    fetchMap()
  }

  const transformSoloon = (elem: MegaverseElementDto): MegaverseElement => {
    switch (elem.color) {
      case SoloonColor.Red:
        return MegaverseElement.RedSoloon;
      case SoloonColor.Purple:
        return MegaverseElement.PurpleSoloon;
      case SoloonColor.White:
        return MegaverseElement.WhiteSoloon;
      case SoloonColor.Blue:
        return MegaverseElement.BlueSoloon;
      default:
        return MegaverseElement.Default;
    }
  }

  const transformCometh = (elem: MegaverseElementDto): MegaverseElement => {
    switch (elem.direction) {
      case ComethDirection.Up:
        return MegaverseElement.UpCometh;
      case ComethDirection.Down:
        return MegaverseElement.DownCometh;
      case ComethDirection.Left:
        return MegaverseElement.LeftCometh;
      case ComethDirection.Right:
        return MegaverseElement.RightCometh;
      default:
        return MegaverseElement.Default;
    }
  }

  const transformMegaverse = (megaverse: MegaverseElementDto[][]): MegaverseElement[][] => {
    return megaverse.map((row: MegaverseElementDto[]) => {
      return row.map((elem: MegaverseElementDto) => {
        if (elem === null) return MegaverseElement.Space;
        switch (elem.type) {
          case 0:
            return MegaverseElement.Polyanet
          case 1:
           return transformSoloon(elem)
          case 2:
            return transformCometh(elem)
          default:
            return MegaverseElement.Default;
        }
      })
    })
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex-container vertical'>
      <Megaverse megaverse={transformMegaverse(megaverse)} />
      <button onClick={buildTowardsGoal} type={"button"} className="build-button ok-button" ref={createButtonRef}>Build towards goal!</button>
      <button onClick={eraseUniverse} type={"button"} className="build-button danger-button">Erase Universe</button>
    </div>
  )
}

export default YourMegaverse