import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import OrderDetailNav from 'components/order/OrderDetailNav';
import OrderList from 'components/order/OrderList';

function OrderDetail() {

  const accesstoken = localStorage.getItem("accesstoken");
  const convSeq = localStorage.getItem("convSeq");

  const { callRef } = useParams();

  const [orderDetail, setOrderDetail] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {

    axios.get("http://54.180.60.149:3000/getRefCallProductConvList", {
        params: {
          convSeq: convSeq,
          callRef: callRef
        }, 
        headers: {
          accessToken: `Bearer ${accesstoken}`
        }
      })
      .then((response) => {
        console.log(response.data);
        setOrderDetail(response.data.convList);
        setTotalAmount(response.data.amount);
        setTotalProduct(response.data.product);
        setTotalPrice(response.data.priceOrigin);
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

      {
        orderDetail[0] &&
        <>
          <OrderDetailNav callStatus={orderDetail[0].callStatus} callRef={orderDetail[0].callRef} callDate={orderDetail[0].callDate} />
          <OrderList 
            type={"after"} 
            orderList={orderDetail} 
            totalAmount={totalAmount}
            totalProduct={totalProduct}
            totalPrice={totalPrice}
          />
        </>
      }

    </div>
  )
}

export default OrderDetail;