import React from 'react';
import { Link } from 'react-router-dom';
import { addComma, orderState } from 'store/utils/function';

function OrderItem({ item }) {
  return (
    <>
      <Link to={`/order/${item.callRef}`}>
        <div className='order-grid order-grid-item'>
          <div className={`order-status order-status-${item.callStatus}`}>{orderState(item.callStatus)}</div>
          <div>{item.callRef}</div>
          <div>{item.callDate}</div>
          <div>{addComma(item.amount)} 개</div>
          <div>{addComma(item.price)} 원</div>
        </div>
      </Link>
    </>
  )
}

export default OrderItem;