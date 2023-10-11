import Modal from 'components/ui/Modal';
import React, { useState } from 'react';
import DeliveryMap from './DeliveryMap';

function DeliveryRegister({ setIsRegi }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpen = () => {
    setIsModalOpen(true);
  }

  const modalClose = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className='delivery-none'>
        <span className='tossface delivery-icon'>🛵</span>
        <p className='delivery-regi-text'>아직 배달 점포로<br/>등록되지 않았습니다</p>
        <button className='delivery-regi-btn' onClick={modalOpen}>배달 점포 등록하기</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={modalClose}
            style={{ content: { width: '80vw', height: '80vh' } }}>
        <DeliveryMap setIsRegi={setIsRegi} />
      </Modal>
    </>
  )
}

export default DeliveryRegister;