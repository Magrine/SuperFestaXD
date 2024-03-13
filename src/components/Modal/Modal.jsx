import "./Modal.scss";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Modal = (Props) => {
  return (
    <div className="modal">
      <div className="modal_container">
        <div>
          <IoMdCloseCircleOutline
            onClick={Props.closeModal}
            fill="Black"
            className="close_modal"
          />
        </div>
        {Props.content}
      </div>
    </div>
  );
};

export default Modal;
