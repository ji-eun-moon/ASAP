import React from 'react';
import 'styles/common/Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <button type="button" onClick={onClose} className="close-button">
          <img src="/assets/icons/cross.png" alt="cross icon" />
        </button>
        <div className="my-4 mx-4">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
