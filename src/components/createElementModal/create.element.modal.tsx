import './create.element.modal.css'
import { FC, useState } from "react";
import { CreateElementModalProps } from "./create.elemnt.modal.props";
import { MegaverseElement } from "../../api/megaverse/dto/megaverse.dto";

const CreateElementModal: FC<CreateElementModalProps> = ({ x, y, isOpen, onClose, onSubmit }) => {
  const [element, setElement] = useState(MegaverseElement.Polyanet.toString())
  if (!isOpen) return null;
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <h3>Create an element in cell ({x}, {y})</h3>
        <div className="option-box">
          <label>Type: </label>
          <select value={element} onChange={(e) => setElement(e.target.value)}>
            <option value={MegaverseElement.Space}>Space</option>
            <option value={MegaverseElement.Polyanet}>Polyanet</option>
            <option value={MegaverseElement.RedSoloon}>Red Soloon</option>
            <option value={MegaverseElement.BlueSoloon}>Blue Soloon</option>
            <option value={MegaverseElement.WhiteSoloon}>White Soloon</option>
            <option value={MegaverseElement.PurpleSoloon}>Purple Soloon</option>
            <option value={MegaverseElement.UpCometh}>Up Cometh</option>
            <option value={MegaverseElement.DownCometh}>Down Cometh</option>
            <option value={MegaverseElement.LeftCometh}>Left Cometh</option>
            <option value={MegaverseElement.RightCometh}>Right Cometh</option>
          </select>
        </div>
        <div className="pair-buttons">
          <button className='danger-button' onClick={onClose}>Cancel</button>
          <button className='ok-button' onClick={() => onSubmit(element)}>Create</button>
        </div>
      </div>
    </>
  )
}

export default CreateElementModal