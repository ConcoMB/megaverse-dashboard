import { useEffect, useState } from "react";
import MegaverseApiService from "../api/megaverse/megaverse.api.service";
import { MegaverseMapDto } from "../api/megaverse/dto/megaverse.dto";
function MegaverseMap() {
  const apiService = new MegaverseApiService();
  const [loading, setLoading] = useState<boolean>(true)
  const [megaverse, setMegaverse] = useState<string[][]>([])
  useEffect( () => {
    fetchMap()
  }, []);

  const fetchMap = async () => {
    const mapDto: MegaverseMapDto = await apiService.getMap()
    setMegaverse(mapDto.map.content)
    setLoading(false)
  }

  const handleCellClick = (x: number, y: number) => {
    // apiService.createPolyanet(x, y)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return(
    <table>
      <tbody>
      {
        megaverse.map((row: string[], i: number) => {
          return <tr key={`megaverse-row-${i}`}>
            {
              row.map((cell: string, j: number) => {
                return <td key={`megaverse-cell-${i}-${j}`} onClick={() => handleCellClick(i, j)}>{cell ? cell : 'null'}</td>
              })
            }
          </tr>
        })
      }
      </tbody>
    </table>
  )
}

export default MegaverseMap