import React from 'react';
import 'styles/common/Modal.scss';
import { ReactComponent as Cross } from 'assets/icons/Cross.svg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose} aria-hidden="true">
      <div
        className="modal"
        onClick={(e) => e.stopPropagation}
        aria-hidden="true"
      >
        <button type="button" onClick={onClose} className="close-button">
          <Cross className="close-button-img" />
        </button>
        <div className="my-4 mx-4">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
