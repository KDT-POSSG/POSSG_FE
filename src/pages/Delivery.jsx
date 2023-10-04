import axios from 'axios';
import Modal from 'components/Modal';
import DeliveryMap from 'components/delivery/DeliveryMap';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { addComma } from 'store/utils/function';

function Delivery() {

  const accesstoken = localStorage.getItem("accesstoken");

  const [isRegi, setIsRegi] = useState(false);
  const [convAddress, setConvAddress] = useState("");
  const [activeSort, setActiveSort] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpen = () => {
    setIsModalOpen(true);
  }

  const modalClose = () => {
    setIsModalOpen(false);
  }

  const handleActiveSort = (status) => {
    console.log("status >> ", status);
    setActiveSort(status);
  }

  useEffect(() => {

    // axios
    //   .post("http://54.180.60.149:3000/deliveryCheck", null, {
    //     headers: {
    //       accessToken: `Bearer ${accesstoken}`,
    //       Authorization: `Bearer ${accesstoken}`,
    //     }
    //   })
    //   .then((response) => {
    //     console.log(response.data);

    //     if(response.data === "YES") {
    //       setIsRegi(true);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   })
    
  }, []);

  return (
    <div className='delivery-page'>

      <div className='delivery-test'>
      
        <div className='delivery-top'>
          <div className='page-title'>배달 페이지</div>
          <div className='delivery-top-address'>{convAddress}</div>
          {/* <div className='delivery-top-address'>해운대구 APEC로 17 센텀리더스마크 (주)지오택 227호</div> */}
        </div>

        {
          isRegi ? 
          <>
            <div className='delivery-sort'>
              <div className={`delivery-sort-active status-0${activeSort}`}></div>
              <div className='delivery-status delivery-status-01' onClick={() => handleActiveSort(1)}>대기<span>&nbsp;&nbsp;4</span></div>
              <div className='delivery-status delivery-status-02' onClick={() => handleActiveSort(2)}>접수<span>&nbsp;&nbsp;5</span></div>
              <div className='delivery-status delivery-status-03' onClick={() => handleActiveSort(3)}>완료<span>&nbsp;&nbsp;20</span></div>
            </div>

            <Outlet />
          </>
          :
          <>
            <div className='delivery-none'>
              <span className='tossface delivery-icon'>🛵</span>
              <p className='delivery-regi-text'>아직 배달 점포로<br/>등록되지 않았습니다</p>
              <button className='delivery-regi-btn' onClick={modalOpen}>배달 점포 등록하기</button>
            </div>

            <Modal isOpen={isModalOpen} onClose={modalClose}
                  style={{ content: { width: '40vw', height: '80vh' } }}>
              <DeliveryMap />
            </Modal>
          </>
        }

      </div>

    </div>
  )
}

export default Delivery;