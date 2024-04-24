import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MegaverseApiService from "../../api/megaverse/megaverse.api.service";
import {
  ComethDirection,
  MegaverseElement,
  MegaverseGoalMapDto,
  MegaverseMapDto,
  SoloonColor
} from "../../api/megaverse/dto/megaverse.dto";
import transformMegaverse from "../../api/megaverse/dto/megaverse.utils";
import './your.megaverse.css'
import Megaverse from "../../components/megaverse/megaverse";
import MegaverseService from "../../api/megaverse/megaverse.service";

function YourMegaverse() {
  const apiService: MegaverseService = useMemo(() => new MegaverseApiService(), []);
  const createButtonRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState(null)
  const [megaverse, setMegaverse] = useState<MegaverseElement[][]>([])

  const fetchMap = useCallback(async (): Promise<void> => {
    try {
      const mapDto: MegaverseMapDto = await apiService.getMap()
      setMegaverse(transformMegaverse(mapDto.map.content))
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  },[apiService]);

  useEffect( () => {
    fetchMap()
  }, [fetchMap]);

  const buildUniverse = async (): Promise<void> => {
    if (createButtonRef.current) {
      createButtonRef.current.disabled = true;
      createButtonRef.current.textContent = "Creating universe...";
    }
    try {
      const mapDto: MegaverseGoalMapDto = await apiService.getGoalMap()
      const goal: MegaverseElement[][] = mapDto.goal;
      for (let i = 0; i < goal.length; i++) {
        for (let j = 0; j < goal[0].length; j++) {
          await buildElement(megaverse[i][j], goal[i][j], i, j)
        }
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      if (createButtonRef.current) {
        createButtonRef.current.textContent = "Build towards goal!";
        createButtonRef.current.disabled = false;
      }
    }
  }

  const deleteElement = async (element: MegaverseElement, x: number, y: number): Promise<void> => {
    switch (element) {
      case MegaverseElement.Polyanet:
        await apiService.deletePolyanet(x, y);
        break;
      case MegaverseElement.BlueSoloon:
      case MegaverseElement.PurpleSoloon:
      case MegaverseElement.RedSoloon:
      case MegaverseElement.WhiteSoloon:
        await apiService.deleteSoloon(x, y);
        break;
      case MegaverseElement.RightCometh:
      case MegaverseElement.LeftCometh:
      case MegaverseElement.UpCometh:
      case MegaverseElement.DownCometh:
        await apiService.deleteCometh(x, y);
        break;
    }
  }

  const buildElement = async (myElement: MegaverseElement, targetElement: MegaverseElement, x: number, y: number): Promise<void> => {
    if (!targetElement || myElement === targetElement) return;
    switch (targetElement) {
      case MegaverseElement.Space:
        await deleteElement(myElement, x, y);
        break;
      case MegaverseElement.Polyanet:
        await apiService.createPolyanet(x, y)
        break;
      case MegaverseElement.RightCometh:
        await apiService.createCometh(x, y, ComethDirection.Right)
        break;
      case MegaverseElement.UpCometh:
        await apiService.createCometh(x, y, ComethDirection.Up)
        break;
      case MegaverseElement.LeftCometh:
        await apiService.createCometh(x, y, ComethDirection.Left)
        break;
      case MegaverseElement.DownCometh:
        await apiService.createCometh(x, y, ComethDirection.Down)
        break;
      case MegaverseElement.WhiteSoloon:
        await apiService.createSoloon(x, y, SoloonColor.White)
        break;
      case MegaverseElement.BlueSoloon:
        await apiService.createSoloon(x, y, SoloonColor.Blue)
        break;
      case MegaverseElement.PurpleSoloon:
        await apiService.createSoloon(x, y, SoloonColor.Purple)
        break;
      case MegaverseElement.RedSoloon:
        await apiService.createSoloon(x, y, SoloonColor.Red)
        break;
    }
    await fetchMap();
    await delay(2000);
  }

  // This function is called in order to space out API calls, so we don't get a too many requests from it.
  // It's not an ideal solution. A more robust solution would be to build a Dispatcher, where API calls are enqueued,
  // and it should manage the requests failures and try again.
  const delay = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
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

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex-container vertical'>
      { error ? <span>Error {error}</span> : <Megaverse megaverse={megaverse} /> }
      <button
        onClick={buildUniverse}
        type={"button"}
        className="build-button ok-button"
        ref={createButtonRef}>
          Build towards goal!
      </button>
      <button onClick={eraseUniverse} type={"button"} className="build-button danger-button">Erase Universe</button>
    </div>
  )
}

export default YourMegaverse