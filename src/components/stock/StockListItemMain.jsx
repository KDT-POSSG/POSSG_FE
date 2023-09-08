import React, { useState } from 'react';
import StockListItemSub from './StockListItemSub';
import Modal from 'components/Modal';
import StockAddModal from './StockAddModal';

function StockListItemMain({ stock, idx }) {

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
    <>
      <div className='stock-grid stock-grid-item'>
        <div>{idx + 1}</div>
        <div className='stock-grid-name'>
          <div>{stock.product_name}</div>
          <div>
            <span className={`material-symbols-rounded ${isSubOpen ? 'sub-btn-open' : 'sub-btn'}`} onClick={handleSubOpen}>
              expand_more
            </span>
          </div>
        </div>
        <div>{stock.totalStock}</div>
        <div>
          <button type='button' className='stock-add' onClick={modalOpen}>발주 추가</button>
        </div>
      </div>

      <div className='stock-sub-container'>
        {
          stock.details.map((item) => (
            <StockListItemSub key={item.product_seq} item={item} isSubOpen={isSubOpen} />
          ))
        }
      </div>

      <Modal isOpen={isModalOpen} onClose={modalClose}
             style={{ content: { width: '30rem', height: '30rem' } }}>
        <StockAddModal name={stock.product_name} />
      </Modal>
    </>
  )
}

export default StockListItemMain;