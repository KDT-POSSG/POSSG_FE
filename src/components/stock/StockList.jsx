import Modal from 'components/Modal';
import React, { useState } from 'react';
import StockAddModal from './StockAddModal';

function StockList() {

  const [isSubOpen, setIsSubOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubOpen = () => {
    setIsSubOpen(!isSubOpen);
  }

  const modalOpen = () => {
    setIsModalOpen(true);
  }

  const modalClose = () => {
    setIsModalOpen(false);
  }

  return (
    <div className='stock-grid-container'>

      <div className='stock-grid stock-grid-head'>
        <div>번호</div>
        <div>상품명</div>
        <div>재고 수량</div>
        <div>발주 추가</div>
      </div>

      <>
        <div className='stock-grid stock-grid-item'>
          <div>1</div>
          <div className='stock-grid-name'>
            <div>피죤</div>
            <div>
              <span className={`material-symbols-rounded ${isSubOpen ? 'sub-btn-open' : 'sub-btn'}`} onClick={handleSubOpen}>
                expand_more
              </span>
            </div>
          </div>
          <div>5</div>
          <div>
            <button type='button' className='stock-add' onClick={modalOpen}>발주 추가</button>
          </div>
        </div>

        <div className='stock-sub-container'>
          <div className={`stock-grid ${isSubOpen ? 'stock-grid-sub' : 'stock-grid-sub-none'}`}>
            <div></div>
            <div className='content'>
              <div>피죤</div>
              <div>2023-08-17 11:13</div>
            </div>
            <div></div>
            <div></div>
          </div>
          <div className={`stock-grid ${isSubOpen ? 'stock-grid-sub' : 'stock-grid-sub-none'}`}>
            <div></div>
            <div className='content'>
              <div>피죤</div>
              <div>2023-08-17 23:45</div>
            </div>
            <div></div>
            <div></div>
          </div>
        </div>
        
      </>

      <Modal isOpen={isModalOpen} onClose={modalClose}
             style={{ content: { width: '30vw', height: '70vh' } }}>
        <StockAddModal />
      </Modal>

    </div>
  )
}

export default StockList;