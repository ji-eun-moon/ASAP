import React, { useState } from 'react';
import Modal from 'components/common/Modal';

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      MainPage
      <button type="button" onClick={openModal}>
        Open Modal
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>This is a custom modal!</h2>
        <p>Custom modal content goes here.</p>
      </Modal>
    </div>
  );
}

export default MainPage;
