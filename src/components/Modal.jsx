import React from 'react';
import ReactModal from 'react-modal';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <button className="modal-close" onClick={onClose}>
        <span aria-hidden="true">×</span>
      </button>
      {children}
    </ReactModal>
  );
};

export default Modal;
