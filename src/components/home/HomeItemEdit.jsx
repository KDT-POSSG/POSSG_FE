import React, { useState } from 'react';
import HomeModal from './HomeModal';
import Modal from 'components/Modal';

function HomeItemEdit() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpen = () => {
    console.log("modalClose");
    setIsModalOpen(true);
  }

  const modalClose = () => {
    console.log("modalClose");
    setIsModalOpen(false);
  }

  return (
    <>
      <div className='home-item home-edit' onClick={modalOpen}>
        <span className="material-symbols-rounded home-add-icon">add_circle</span>
        추가 및 편집
      </div>
      
      <Modal isOpen={isModalOpen} onClose={modalClose}
             style={{ content: { width: '50rem', height: '40rem', padding: '0' } }}>
        <HomeModal modalClose={modalClose} />
      </Modal>
    </>

  )
}

export default HomeItemEdit;