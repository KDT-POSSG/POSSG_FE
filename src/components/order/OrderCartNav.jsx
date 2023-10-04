import Modal from 'components/Modal';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import OrderCartAddModal from './OrderCartAddModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OrderCartNav({ isDone, setIsDone, selectedItems }) {

  const navi = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpen = () => {
    setIsModalOpen(true);
  }

  const modalClose = () => {
    setIsModalOpen(false);
    setIsDone(!isDone);
  }

  const handleProductDelete = () => {

    if(selectedItems.length === 0) {
      toast.error("선택된 상품이 없습니다");
      return;
    }

    axios
      .post("http://54.180.60.149:3000/deleteCallProduct", {
        convSeq: 1,
        nameList: selectedItems,
        callRef: 0
      })
      .then((response) => {
        console.log(response.data);

        if(response.data === "YES") {
          toast.success("선택한 상품이 삭제되었습니다");
          setIsDone(!isDone);
        }
        else {
          toast.error("선택한 상품 삭제에 실패했습니다");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("선택한 상품 삭제에 실패했습니다");
      })
  }

  const handleOrderSend = () => {

    axios.post("http://54.180.60.149:3000/addConvOrderList", {
        convSeq: 1
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
        <button className='ordercart-delete-btn' onClick={handleProductDelete}>선택 상품 삭제</button>
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