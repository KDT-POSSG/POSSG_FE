import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ACCESS_TOKEN } from 'store/apis/base';

function DeliveryProgress() {

  const [activeSort, setActiveSort] = useState(1);

  const handleActiveSort = (status) => {
    console.log("status >> ", status);
    setActiveSort(status);
  }

  useEffect(() => {

    axios
      .get("http://54.180.60.149:3000/convenienceDeliveryList", {
        params: {
          pageNumber: 0,
          orderStatus: 1
        },
        headers: {
          accessToken: `Bearer ${ACCESS_TOKEN}`,
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
    
  }, []);

  return (
    <>
      <div className='delivery-sort'>
        <div className={`delivery-sort-active status-0${activeSort}`}></div>
        <div className='delivery-status' onClick={() => handleActiveSort(1)}>주문접수<span>4</span></div>
        <div className='delivery-status' onClick={() => handleActiveSort(2)}>배달접수<span>5</span></div>
        <div className='delivery-status' onClick={() => handleActiveSort(3)}>배송중<span>20</span></div>
        <div className='delivery-status' onClick={() => handleActiveSort(4)}>배송완료<span>12</span></div>
      </div>

      <Outlet />
    </>
  )
}

export default DeliveryProgress;