import React from 'react';
import { orderState } from 'store/utils/function';

function OrderDetailNav() {

  let orderStateTest = 2;

  return (
    <div className='order-detail-middle'>
      <div>
        <div className='order-status order-status-1'>{orderState(1)}</div>

        <div className='number-date'>
          <div className='left'>
            <span>발주번호</span>
            &nbsp;&nbsp;&nbsp;202309051811
          </div>
          <div className='right'>
            <span>발주날짜</span>
            &nbsp;&nbsp;&nbsp;2023-09-05 00:00:00
          </div>
        </div>
      </div>

      <div>
        {
          orderStateTest === 1 ?
          <button className='order-cancel'>발주 취소</button>
          :
          <button className='order-cancel' disabled>발주 취소</button>
        }
      </div>

    </div>
  )
}

export default OrderDetailNav;