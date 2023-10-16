import axios from 'axios';
import OrderList from 'components/order/OrderList';
import OrderCartNav from 'components/order/OrderCartNav';
import React, { useEffect, useState } from 'react';
import { baseURL } from 'store/apis/base';

function OrderCart() {

  const accesstoken = localStorage.getItem("accesstoken");

  const [orderCart, setOrderCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    
    axios.get(`${baseURL}/getAllCallProductConvList`, {
        params: {
          convSeq: 1
        },
        headers: {
          accessToken: `Bearer ${accesstoken}`
        }
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.convList);
        setOrderCart(response.data.convList);
        setTotalAmount(response.data.amount);
        setTotalProduct(response.data.product);
        setTotalPrice(response.data.priceOrigin);
      })
      .catch((error) => {
        console.error(error);
      })

  }, [isDone]);

  return (
    <div className='order-cart-page'>
      
      <div className='page-title ordercart-title'>발주 바구니</div>

      <div>
        <OrderCartNav isDone={isDone} setIsDone={setIsDone} selectedItems={selectedItems} />
        <OrderList 
          type={"before"} 
          orderList={orderCart} 
          selectedItems={selectedItems} 
          setSelectedItems={setSelectedItems} 
          totalAmount={totalAmount}
          totalProduct={totalProduct}
          totalPrice={totalPrice}
          isDone={isDone} 
          setIsDone={setIsDone}
        />
      </div>

    </div>
  )
}

export default OrderCart;