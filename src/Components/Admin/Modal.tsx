/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React, { useState } from "react";
import ReactModal from "react-modal";
import { GrClose } from "react-icons/gr";
import { AiFillClockCircle } from "react-icons/ai";
import Settings from "./Settings";

const Modal: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  function handleOpenModal(): void {
    setShowModal(true);
  }
  function handleCloseModal(): void {
    setShowModal(false);
  }

  return (
    <div>
      <button className="gsetting" onClick={handleOpenModal}>
        <AiFillClockCircle size={26} />
        General Settings
      </button>
      <ReactModal
        isOpen={showModal}
        contentLabel="Minimal Modal Example"
        className="Modal"
        overlayClassName="Overlay"
        onRequestClose={handleCloseModal}
      >
        <Settings />
        <button className="cross" onClick={handleCloseModal}>
          <GrClose size={20} />
        </button>
      </ReactModal>
    </div>
  );
};

export default Modal;
