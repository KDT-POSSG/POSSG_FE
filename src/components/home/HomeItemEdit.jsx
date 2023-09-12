import Modal from 'components/Modal'
import React, { useState } from 'react'
import HomeModal from './HomeModal';

function HomeItemEdit() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpen = () => {
    setIsModalOpen(true);
  }

  const modalClose = () => {
    setIsModalOpen(false);
  }

  return (
    <div className='home-item home-edit' onClick={modalOpen}>
      <span className="material-symbols-rounded home-add-icon">add_circle</span>
      추가 및 편집

      <Modal isOpen={isModalOpen} onClose={modalClose}
             style={{ content: { width: '44rem', height: '40rem', padding: '0' } }}>
        <HomeModal />
      </Modal>
    </div>
  )
}

export default HomeItemEdit