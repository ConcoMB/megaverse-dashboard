import { useEffect, useState } from "react";
function MegaverseMap() {
  const [loading , setLoading] = useState(true)
  const [megaverse, setMegaverse] = useState(null)
    useEffect( () => {
    fetchMap()
  }, []);

  const fetchMap = async () => {
  }


  if (loading) {
    return <div>Loading...</div>
  }

  return(
    <table>
      <tbody>

      </tbody>
    </table>
  )
}

export default MegaverseMap