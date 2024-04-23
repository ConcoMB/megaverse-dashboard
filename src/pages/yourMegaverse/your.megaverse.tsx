import React, { useEffect, useState } from "react";
import MegaverseApiService from "../../api/megaverse/megaverse.api.service";
import { MegaverseElementDto, MegaverseMapDto } from "../../api/megaverse/dto/megaverse.dto";
import './your.megaverse.css'
function YourMegaverse() {
  const apiService = new MegaverseApiService();
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

  const getElementEmoji = (cell: MegaverseElementDto): string => {
    if (!cell) return '🌌'
    switch (cell.type) {
      case 0:
        return '🪐';
    }
    return "❓"
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <table>
      <tbody>
      {
        megaverse.map((row: MegaverseElementDto[], i: number) => {
          return <tr key={`megaverse-row-${i}`}>
            {
              row.map((cell: MegaverseElementDto, j: number) => {
                return <td key={`megaverse-cell-${i}-${j}`} className="megaverse-cell" onClick={() => handleCellClick(i, j) }>{getElementEmoji(cell)}</td>
              })
            }
          </tr>
        })
      }
      </tbody>
    </table>
  )
}

export default YourMegaverse