import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ACCESS_TOKEN, baseURL } from 'store/apis/base';
import { addComma } from 'store/utils/function';

function DeliveryDetail() {

  const { ref } = useParams();

  useEffect(() => {

    axios
      .post(`${baseURL}/allDeliveryList`, null, {
        params: {
          ref: ref
        },
        headers: {
          accessToken: `Bearer ${ACCESS_TOKEN}`,
        }
      })
      .then((response) => {
        console.log(response.data);
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

          <div className='total-price'>{addComma(32000)} 원</div>

          <div className='item-product-container'>

            <div className='item-product item-index'>
              <div>상품명</div>
              <div>단가</div>
              <div>수량</div>
              <div>금액</div>
            </div>

            <div className='item-product'>
              <div className='item-product-name'>
                센카)퍼펙트휩비타민C포어리스글로우100g
              </div>
              <div>{addComma(2000)}</div>
              <div>{addComma(5)}</div>
              <div>{addComma(2000 * 5)}</div>
            </div>
            <>
            <div className='item-product'>
              <div className='item-product-name'>
                센카)퍼펙트휩비타민C포어리스글로우100g
              </div>
              <div>{addComma(2000)}</div>
              <div>{addComma(5)}</div>
              <div>{addComma(2000 * 5)}</div>
            </div>
            <div className='item-product'>
              <div className='item-product-name'>
                센카)퍼펙트휩비타민C포어리스글로우100g
              </div>
              <div>{addComma(2000)}</div>
              <div>{addComma(5)}</div>
              <div>{addComma(2000 * 5)}</div>
            </div>
            <div className='item-product'>
              <div className='item-product-name'>
                센카)퍼펙트휩비타민C포어리스글로우100g
              </div>
              <div>{addComma(2000)}</div>
              <div>{addComma(5)}</div>
              <div>{addComma(2000 * 5)}</div>
            </div>
            </>

          </div>
        </div>

        <div className='item-bottom'>
          <button className='receipt-btn'>배달접수</button>
          <button className='detail-btn'>상세보기</button>
        </div>

      </div>
      
    </div>
  )
}

export default DeliveryDetail;