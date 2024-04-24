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
import MegaverseMap from "../megaverseMap/megaverse.map";
import MegaverseService from "../../api/megaverse/megaverse.service";
import LOCAL_STORAGE_KEY_CANDIDATE_ID from "../../privateRoutes/private.route";
import CreateElementModal from "../createElementModal/create.element.modal";

function YourMegaverse() {
  const apiService: MegaverseService = useMemo(() => new MegaverseApiService(), []);
  const createButtonRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState(null)
  const [log, setLog] = useState("")
  const [rowSelected, setRowSelected] = useState(-1)
  const [columnSelected, setColumnSelected] = useState(-1)
  const [isCreateElementModalOpen, setIsCreateElementModalOpen] = useState(false)
  const [megaverse, setMegaverse] = useState<MegaverseElement[][]>([])
  const candidateId: string = localStorage.getItem(LOCAL_STORAGE_KEY_CANDIDATE_ID) as string;

  const fetchMap = useCallback(async (): Promise<void> => {
    try {
      const mapDto: MegaverseMapDto = await apiService.getMap(candidateId)
      setMegaverse(transformMegaverse(mapDto.map.content))
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  },[apiService, candidateId]);

  useEffect( () => {
    fetchMap()
  }, [fetchMap]);

  const buildUniverse = async (): Promise<void> => {
    if (createButtonRef.current) {
      createButtonRef.current.disabled = true;
      createButtonRef.current.textContent = "Creating universe...";
    }
    try {
      const mapDto: MegaverseGoalMapDto = await apiService.getGoalMap(candidateId)
      const goal: MegaverseElement[][] = mapDto.goal;
      for (let i = 0; i < goal.length; i++) {
        for (let j = 0; j < goal[0].length; j++) {
          await buildElement(megaverse[i][j], goal[i][j], i, j)
        }
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLog("")
      if (createButtonRef.current) {
        createButtonRef.current.textContent = "Build towards goal!";
        createButtonRef.current.disabled = false;
      }
    }
  }

  const deleteElement = async (element: MegaverseElement, x: number, y: number): Promise<void> => {
    switch (element) {
      case MegaverseElement.Polyanet:
        setLog("Deleting Polyanet")
        await apiService.deletePolyanet(candidateId, x, y);
        break;
      case MegaverseElement.BlueSoloon:
      case MegaverseElement.PurpleSoloon:
      case MegaverseElement.RedSoloon:
      case MegaverseElement.WhiteSoloon:
        setLog("Deleting Soloon")
        await apiService.deleteSoloon(candidateId, x, y);
        break;
      case MegaverseElement.RightCometh:
      case MegaverseElement.LeftCometh:
      case MegaverseElement.UpCometh:
      case MegaverseElement.DownCometh:
        setLog("Deleting Cometh")
        await apiService.deleteCometh(candidateId, x, y);
        break;
    }
  }

  const buildElement = async (myElement: MegaverseElement, targetElement: MegaverseElement, x: number, y: number, wait = true): Promise<void> => {
    if (!targetElement || myElement === targetElement) return;
    if (targetElement !== MegaverseElement.Space && myElement !== MegaverseElement.Space) {
      await deleteElement(myElement, x, y);
    }
    switch (targetElement) {
      case MegaverseElement.Space:
        await deleteElement(myElement, x, y);
        break;
      case MegaverseElement.Polyanet:
        setLog("Creating Polyanet")
        await apiService.createPolyanet(candidateId, x, y)
        break;
      case MegaverseElement.RightCometh:
        setLog("Creating Cometh")
        await apiService.createCometh(candidateId, x, y, ComethDirection.Right)
        break;
      case MegaverseElement.UpCometh:
        setLog("Creating Cometh")
        await apiService.createCometh(candidateId, x, y, ComethDirection.Up)
        break;
      case MegaverseElement.LeftCometh:
        setLog("Creating Cometh")
        await apiService.createCometh(candidateId, x, y, ComethDirection.Left)
        break;
      case MegaverseElement.DownCometh:
        setLog("Creating Cometh")
        await apiService.createCometh(candidateId, x, y, ComethDirection.Down)
        break;
      case MegaverseElement.WhiteSoloon:
        setLog("Creating Soloon")
        await apiService.createSoloon(candidateId, x, y, SoloonColor.White)
        break;
      case MegaverseElement.BlueSoloon:
        setLog("Creating Soloon")
        await apiService.createSoloon(candidateId, x, y, SoloonColor.Blue)
        break;
      case MegaverseElement.PurpleSoloon:
        setLog("Creating Soloon")
        await apiService.createSoloon(candidateId, x, y, SoloonColor.Purple)
        break;
      case MegaverseElement.RedSoloon:
        setLog("Creating Soloon")
        await apiService.createSoloon(candidateId, x, y, SoloonColor.Red)
        break;
    }
    await fetchMap();
    wait && await delay(2000);
    setLog("")
  }

  // This function is called in order to space out API calls, so we don't get a too many requests from it.
  // It's not an ideal solution. A more robust solution would be to build a Dispatcher, where API calls are enqueued,
  // and it should manage the requests failures and try again.
  const delay = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const eraseUniverse = async () => {
    for (let i = 0; i < megaverse.length; i++) {
      for (let j = 0; j < megaverse[0].length; j++) {
        if (megaverse[i][j] !== MegaverseElement.Space) {
          await deleteElement(megaverse[i][j], i, j)
          fetchMap()
          await delay(2000)
        }
      }
    }
    setLog("")
    fetchMap()
  }

  const onCellClickedListener = (i: number, j: number) => {
    setRowSelected(i);
    setColumnSelected(j);
    setIsCreateElementModalOpen(true);
  }

  const onModalSubmit = (element: MegaverseElement): void => {
    setIsCreateElementModalOpen(false)
    buildElement(megaverse[rowSelected][columnSelected], element, rowSelected, columnSelected, false)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {log && <div className="overlay"><div className="ellipsis-container"><p>{log}</p></div></div>}
      <CreateElementModal
        x={rowSelected}
        y={columnSelected}
        isOpen={isCreateElementModalOpen}
        onClose={() => setIsCreateElementModalOpen(false)}
        onSubmit={onModalSubmit}
      />
      <div className='flex-container vertical'>
        <h1>Welcome to your Megaverse!</h1>
        <p>Here you can click any cell to create the Megaverse Element you desire manually,
          or you can go straight to your goal by clicking the blue button below.</p>
        {error ?
          <p>Error {error}</p> :
          <MegaverseMap megaverse={megaverse} onCellClickedListener={onCellClickedListener}/>}
        <p>Candidate ID: {candidateId}</p>
        <button
          onClick={buildUniverse}
          type={"button"}
          className="build-button ok-button"
          ref={createButtonRef}>
          Build towards goal!
        </button>
        <button onClick={eraseUniverse} type={"button"} className="build-button danger-button">Erase Universe</button>
      </div>
    </div>
  );
}

export default YourMegaverse