import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ACCESS_TOKEN, baseURL } from 'store/apis/base';
import { addComma } from 'store/utils/function';

function DeliveryDetail() {

  const { ref } = useParams();

  const [deliveryDetail, setDeliveryDetail] = useState({});

  useEffect(() => {

    axios
      .get(`${baseURL}/allDeliveryList`, {
        params: {
          ref: ref
        },
        headers: {
          accessToken: `Bearer ${ACCESS_TOKEN}`,
        }
      })
      .then((response) => {
        console.log(response.data[0]);
        setDeliveryDetail(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      })
    
  }, []);

  return (
    <div className='delivery-detail-page'>

      <div className='delivery-detail'>

        <div className='item-top'>
          <div>emart24</div>
          <div>14:06</div>
        </div>

        <div className='item-middle'>

          <div className='item-info'>
            <div className='total-price'>{addComma(32000)} 원</div>

            <div className='delivery-ref'>
              <span>주문번호</span>
              {deliveryDetail.ref}
            </div>
            <div className='delivery-location'>
              <span>주소</span>
              {deliveryDetail.location}
            </div>
          </div>

          <div className='item-product-container'>

            <div className='item-product item-index'>
              <div>상품명</div>
              <div>단가</div>
              <div>수량</div>
              <div>금액</div>
            </div>

            {
              deliveryDetail.details && deliveryDetail.details.map((item) => (
                <div className='item-product' key={item.product_seq}>
                  <div className='item-product-name'>
                    {item.product_name}
                  </div>
                  <div>{addComma(item.price)}</div>
                  <div>{addComma(item.quantity)}</div>
                  <div>{addComma(item.price * item.quantity)}</div>
                </div>
              ))
            }

          </div>
        </div>

        <div className='item-bottom'>
          <button className='receipt-btn'>배달접수</button>
        </div>

      </div>
      
    </div>
  )
}

export default DeliveryDetail;