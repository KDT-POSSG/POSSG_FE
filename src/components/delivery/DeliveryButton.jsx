import React from 'react';
import { deliveryStatus } from 'store/utils/function';

function DeliveryButton({ deliveryRef, delStatus, handleOrderStatus, handleOrderCancel }) {
  return (
    <>
      {
        delStatus === 4 || delStatus === -1 ?
        <div className={`delivery-text status-${delStatus}`}>{deliveryStatus(delStatus)}</div>
        :
        <>
          <button className='receipt-btn' onClick={(e) => handleOrderStatus(e, deliveryRef)}>{deliveryStatus(delStatus)}</button>
          {
            delStatus === 1 ? 
            <button className='cancel-btn' onClick={(e) => handleOrderCancel(e, deliveryRef)}>주문취소</button>
            :
            <></>
          }
        </>
      }
    </>
  )
}

export default DeliveryButton;