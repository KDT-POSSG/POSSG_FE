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
        <div className='delivery-status delivery-status-01' onClick={() => handleActiveSort(1)}>대기<span>&nbsp;&nbsp;4</span></div>
        <div className='delivery-status delivery-status-02' onClick={() => handleActiveSort(2)}>접수<span>&nbsp;&nbsp;5</span></div>
        <div className='delivery-status delivery-status-03' onClick={() => handleActiveSort(3)}>완료<span>&nbsp;&nbsp;20</span></div>
      </div>

      <Outlet />
    </>
  )
}

export default DeliveryProgress;