import React, { useEffect, useState } from 'react';
import orderListDatas from '../assets/datas/orderListDatas.json';
import OrderListItem from 'components/order/OrderListItem';
import axios from 'axios';

function Order() {

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    setOrderList(orderListDatas);

    // axios.post('http://10.10.10.208:3000/getAllConvOrderList', null)
    //   .then((response) => {
    //     console.log(response.data);
    //     setOrderList(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   })
  }, []);

  return (
    <div className='order-page'>

      <div className='order-top'>
        
        <div className='page-title order-page-title'>발주 내역 페이지</div>

        <div className='order-top-filter'>
          <button className='active-btn order-filter-btn'>점주 발주 목록</button>
          <button className='order-filter-btn'>고객 요청 목록</button>
        </div>

      </div>

      <div className='order-grid-container'>

        <div className='order-grid order-grid-head'>
          <div>발주 상태</div>
          <div>발주 번호</div>
          <div>발주 날짜</div>
          <div>총 발주 상품 수</div>
          <div>총 발주 금액</div>
        </div>

        {
          orderList && orderList.map((item) => (
            <OrderListItem key={item.callRef} item={item} />
          ))
        }

      </div>

    </div>
  )
}

export default Order;