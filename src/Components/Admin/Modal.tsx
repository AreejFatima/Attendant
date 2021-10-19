import { FC, useState } from "react";
import ReactModal from "react-modal";
import { GrClose } from "react-icons/gr";
import { AiFillClockCircle } from "react-icons/ai";
import Settings from "./Settings";

const Modal: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  function toggleModal() {
    setShowModal((prev) => !prev);
  }

  return (
    <div>
      <button className="gsetting" onClick={toggleModal}>
        <AiFillClockCircle size={26} />
        General Settings
      </button>
      <ReactModal
        isOpen={showModal}
        contentLabel="Minimal Modal Example"
        className="Modal"
        overlayClassName="Overlay"
        onRequestClose={toggleModal}
      >
        <Settings />
        <button className="cross" onClick={toggleModal}>
          <GrClose size={20} />
        </button>
      </ReactModal>
    </div>
  );
};

export default Modal;
