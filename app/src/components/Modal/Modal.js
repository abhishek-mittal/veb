import React from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "./context";

const Modal = () => {

  let { modalContent, handleModal, modal } = React.useContext(ModalContext);

  if(modal) {
    return ReactDOM.createPortal(
      <div className={`modal is-active`}>
              <div className="modal-background"></div>
              <div className="modal-content">
                {modalContent}
              </div>
              <button className="modal-close is-large"
                onClick={handleModal}
              aria-label="close"></button>
      </div>,
      document.querySelector("#modal-root")
    );
  }

  return null;

};

export default Modal;