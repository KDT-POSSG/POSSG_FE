import React from 'react';
import { orderState } from 'store/utils/function';

function OrderDetailNav({ callStatus, callRef, callDate }) {

  return (
    <div className='order-detail-middle'>
      <div>
        <div className={`order-status order-status-${callStatus}`}>{orderState(callStatus)}</div>

        <div className='number-date'>
          <div className='left'>
            <span>발주번호</span>
            &nbsp;&nbsp;&nbsp;{callRef}
          </div>
          <div className='right'>
            <span>발주날짜</span>
            &nbsp;&nbsp;&nbsp;{callDate}
          </div>
        </div>
      </div>

      <div>
        {
          callStatus === 1 ?
          <button className='order-cancel'>발주 취소</button>
          :
          <button className='order-cancel' disabled>발주 취소</button>
        }
      </div>

    </div>
  )
}

export default OrderDetailNav;