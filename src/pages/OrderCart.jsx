import axios from 'axios';
import OrderList from 'components/order/OrderList';
import OrderCartNav from 'components/order/OrderCartNav';
import React, { useEffect, useState } from 'react';

function OrderCart() {

  const [orderCart, setOrderCart] = useState([]);

  useEffect(() => {
    
    // axios.get("http://10.10.10.54:3000/getAllCallProductConvList", {
    //     params: {
    //       convSeq: 1
    //     }
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setOrderCart(response.data[0]);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   })

  }, []);

  return (
    <div className='order-cart-page'>
      
      <div className='page-title ordercart-title'>발주 바구니</div>

      <div>
        <OrderCartNav />
        <OrderList type={"before"} />
      </div>

    </div>
  )
}

export default OrderCart;