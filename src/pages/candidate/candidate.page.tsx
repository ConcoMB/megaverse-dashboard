import "./candidate.page.css"
import { useRef } from "react";
import LOCAL_STORAGE_KEY_CANDIDATE_ID from "../../privateRoutes/private.route";
import { useNavigate } from "react-router-dom";
function CandidatePage() {
  const navigate = useNavigate();
  const candidateIdRef = useRef<HTMLInputElement>(null);
  const saveCandidateId = () => {
    if (!candidateIdRef || !candidateIdRef.current) return;
    localStorage.setItem(LOCAL_STORAGE_KEY_CANDIDATE_ID, candidateIdRef.current.value);
    navigate("/map")
  }

  return (
    <div className="appBody">
      <h1>Enter Candidate</h1>
      <input type={"text"} placeholder="Candidate ID" className="candidate-id-input" ref={candidateIdRef}/>
      <button className="ok-button" onClick={saveCandidateId}>Save</button>
    </div>
  );
}

export default CandidatePage;
