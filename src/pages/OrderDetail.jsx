import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import OrderDetailNav from 'components/order/OrderDetailNav';
import OrderList from 'components/order/OrderList';

function OrderDetail() {

  const { callRef } = useParams();

  const [OrderDetail, setOrderDetail] = useState([]);

  useEffect(() => {

    axios.get("http://10.10.10.140:3000/getRefCallProductConvList", {
        params: {
          convSeq: 1,
          callRef: callRef
        }
      })
      .then((response) => {
        console.log(response.data);
        setOrderDetail(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
    
  }, []);

  return (
    <div className='order-page order-detail-page'>
      
      <div className='order-detail-top'>
        <div className='page-title order-page-title'>발주 내역 상세</div>
      </div>

      <OrderDetailNav />
      <OrderList type={"after"} orderList={OrderDetail} />

    </div>
  )
}

export default OrderDetail;