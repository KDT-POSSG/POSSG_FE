import axios from 'axios';
import OrderList from 'components/order/OrderList';
import OrderCartNav from 'components/order/OrderCartNav';
import React, { useEffect, useState } from 'react';

function OrderCart() {

  const [orderCart, setOrderCart] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    
    axios.get("http://54.180.60.149:3000/getAllCallProductConvList", {
        params: {
          convSeq: 1
        }
      })
      .then((response) => {
        console.log(response.data.convList);
        setOrderCart(response.data.convList);
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
        <OrderList type={"before"} orderList={orderCart} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
      </div>

    </div>
  )
}

export default OrderCart;