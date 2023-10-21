import axios from 'axios';
import DeliveryRegister from 'components/delivery/DeliveryRegister';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function Delivery() {

  const accesstoken = localStorage.getItem("accesstoken");

  const navi = useNavigate();
  
  const [isRegi, setIsRegi] = useState(false);
  const [activeSort, setActiveSort] = useState(1);
  const [page, setPage] = useState(1);
  const [location, setLocation] = useState("");
  const [before, setBefore] = useState(0);
  const [after, setAfter] = useState(0);
  const [delivering, setDelivering] = useState(0);

  const handleActiveSort = (status) => {
    navi("/delivery");
    setActiveSort(status);
    setPage(1);
  }

  useEffect(() => {

    axios
      .get("http://54.180.60.149:3000/deliveryCheck", {
        headers: {
          accessToken: `Bearer ${accesstoken}`,
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
          <div className='page-title'>배달</div>
          <div className='delivery-top-address'>
            <span className='tossface'>🏠&nbsp;&nbsp;</span>
            {location}
          </div>
        </div>

        {
          isRegi ?
          <>
            <div className='delivery-sort'>
              <div className={`delivery-sort-active status-0${activeSort}`}></div>
              <div className='delivery-status' onClick={() => handleActiveSort(1)}>주문접수<span>{before}</span></div>
              <div className='delivery-status' onClick={() => handleActiveSort(2)}>배달픽업대기<span>{after}</span></div>
              <div className='delivery-status' onClick={() => handleActiveSort(3)}>배달중<span>{delivering}</span></div>
              <div className='delivery-status' onClick={() => handleActiveSort(4)}>완료</div>
            </div>
            <Outlet context={{ activeSort, setActiveSort, page, setPage, setBefore, setAfter, setDelivering, setLocation }} />
          </>
          :
          <DeliveryRegister setIsRegi={setIsRegi} />
        }

      </div>

    </div>
  )
}

export default Delivery;