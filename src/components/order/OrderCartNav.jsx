import Modal from 'components/Modal';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import OrderCartAddModal from './OrderCartAddModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OrderCartNav() {

  const navi = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpen = () => {
    setIsModalOpen(true);
  }

  const modalClose = () => {
    setIsModalOpen(false);
  }

  const handleOrderSend = () => {

    axios.post("http://10.10.10.140:3000/addConvOrderList", {
        params: {
          convSeq: 1
        }
      })
      .then((response) => {
        console.log(response.data);

        if(response.data === "YES") {
          toast.success("발주 완료");
          navi("/order");
        }
        else {
          toast.error("발주 실패");
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  return (
    <>
      <div className='ordercart-nav'>
        <button className='ordercart-delete-btn'>선택 상품 삭제</button>
        <div>
          <button className='ordercart-add-btn' onClick={modalOpen}>상품 추가</button>
          <button className='ordercart-confirm-btn' onClick={handleOrderSend}>발주하기</button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={modalClose}
             style={{ content: { width: '40vw', height: '70vh' } }}>
        <OrderCartAddModal setIsModalOpen={setIsModalOpen} />
      </Modal>
    </>
  )
}

export default OrderCartNav;