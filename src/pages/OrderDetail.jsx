import OrderDetailNav from 'components/order/OrderDetailNav';
import OrderList from 'components/order/OrderList';
import React from 'react';
import { addComma } from 'store/utils/function';

function OrderDetail() {
  return (
    <div className='order-page order-detail-page'>
      
      <div className='order-detail-top'>
        <div className='page-title order-page-title'>발주 내역 상세</div>
      </div>

      <OrderDetailNav />
      <OrderList type={"after"} />

    </div>
  )
}

export default OrderDetail;