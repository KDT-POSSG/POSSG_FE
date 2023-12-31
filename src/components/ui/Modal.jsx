import React from 'react';
import ReactModal from 'react-modal';

const Modal = ({ isOpen, onClose, children, style, shouldCloseOnOverlayClick }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="modal-content"
      overlayClassName="modal-overlay"
      style={style}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      <button className="modal-close" onClick={onClose}>
        <span aria-hidden="true">
          <span className="material-symbols-rounded">close</span>
        </span>
      </button>
      {children}
    </ReactModal>
  );
};

export default Modal;
