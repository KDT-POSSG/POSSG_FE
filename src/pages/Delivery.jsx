import axios from 'axios';
import DeliveryRegister from 'components/delivery/DeliveryRegister';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from 'store/apis/base';

function Delivery() {

  const navi = useNavigate();
  
  const [isRegi, setIsRegi] = useState(false);
  const [convAddress, setConvAddress] = useState("");
  const [activeSort, setActiveSort] = useState(1);

  const handleActiveSort = (status) => {
    navi("/delivery");
    setActiveSort(status);
  }

  useEffect(() => {

    axios
      .get("http://54.180.60.149:3000/deliveryCheck", {
        headers: {
          accessToken: `Bearer ${ACCESS_TOKEN}`,
        }
      })
      .then((response) => {
        console.log(response.data);

        if(response.data === "YES") {
          setIsRegi(true);
        }
      })
      .catch((error) => {
        console.error(error);
      })
    
  }, [isRegi]);

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
              <div className='delivery-status' onClick={() => handleActiveSort(1)}>주문접수<span>4</span></div>
              <div className='delivery-status' onClick={() => handleActiveSort(2)}>배달접수<span>5</span></div>
              <div className='delivery-status' onClick={() => handleActiveSort(3)}>배송중<span>20</span></div>
              <div className='delivery-status' onClick={() => handleActiveSort(4)}>완료<span>12</span></div>
            </div>
            <Outlet context={activeSort} />
          </>
          :
          <DeliveryRegister setIsRegi={setIsRegi} />
        }

      </div>

    </div>
  )
}

export default Delivery;