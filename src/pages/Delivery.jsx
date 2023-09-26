import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { addComma } from 'store/utils/function';

function Delivery() {

  const [activeSort, setActiveSort] = useState(1);

  const handleActiveSort = (status) => {
    console.log("status >> ", status);
    setActiveSort(status);
  }

  return (
    <div className='delivery-page'>

      <div className='delivery-test'>
      
        <div className='page-title delivery-title'>배달 페이지</div>

        <div className='delivery-sort'>
          <div className={`delivery-sort-active status-0${activeSort}`}></div>
          <div className='delivery-status delivery-status-01' onClick={() => handleActiveSort(1)}>대기<span>&nbsp;&nbsp;4</span></div>
          <div className='delivery-status delivery-status-02' onClick={() => handleActiveSort(2)}>접수<span>&nbsp;&nbsp;5</span></div>
          <div className='delivery-status delivery-status-03' onClick={() => handleActiveSort(3)}>완료<span>&nbsp;&nbsp;20</span></div>
        </div>

        <Outlet />

      </div>

    </div>
  )
}

export default Delivery;