import React from 'react';
import { addComma } from 'store/utils/function';

function DeliveryList() {

  let delDate = "2023-09-13 14:42:14";

  let month = delDate.slice(5, 7);
  let day = delDate.slice(8, 10);
  let time = delDate.slice(11, 16);

  return (
    <div className='delivery-list-container'>
      
      <div className='delivery-list-item'>

        <div className='item-top'>
          <div className='convenience-name'>emart24</div>
          <div className='delivery-time'>{month}월 {day}일 {time}</div>
        </div>

        <div className='item-middle'>

          <div className='total-price'>{addComma(32000)} 원</div>

          <div className='item-product-container'>

            <div className='item-product'>
              <div>먹태깡</div>
              <div>5</div>
            </div>

            <div className='item-product'>
              <div>피죤</div>
              <div>5</div>
            </div>

            <div className='item-product'>
              <div>감자깡</div>
              <div>5</div>
            </div>

            <div className='item-product-more'>
              <div>…</div>
            </div>

          </div>

        </div>

        <div className='item-bottom'>
          <button className='receipt-btn'>배달접수</button>
          <button className='detail-btn'>상세보기</button>
        </div>

      </div>

      <div className='delivery-list-item'>

        <div className='item-top'>
          <div>emart24</div>
          <div>14:06</div>
        </div>

        <div className='item-middle'>

          <div className='total-price'>{addComma(32000)} 원</div>

          <div className='item-product-container'>

            <div className='item-product'>
              <div>먹태깡</div>
              <div>5</div>
            </div>

            <div className='item-product'>
              <div>피죤</div>
              <div>5</div>
            </div>

            <div className='item-product'>
              <div>감자깡</div>
              <div>5</div>
            </div>

          </div>

        </div>

        <div className='item-bottom'>
          <button className='receipt-btn'>배달접수</button>
          <button className='detail-btn'>상세보기</button>
        </div>

      </div>
      <div className='delivery-list-item'>

        <div className='item-top'>
          <div>emart24</div>
          <div>14:06</div>
        </div>

        <div className='item-middle'>

          <div className='total-price'>{addComma(32000)} 원</div>

          <div className='item-product-container'>

            <div className='item-product'>
              <div>감자깡</div>
              <div>5</div>
            </div>

          </div>

        </div>

        <div className='item-bottom'>
          <button className='receipt-btn'>배달접수</button>
          <button className='detail-btn'>상세보기</button>
        </div>

      </div>
      <div className='delivery-list-item'>

        <div className='item-top'>
          <div>emart24</div>
          <div>14:06</div>
        </div>

        <div className='item-middle'>

          <div className='total-price'>{addComma(32000)} 원</div>

          <div className='item-product-container'>

            <div className='item-product'>
              <div>먹태깡</div>
              <div>5</div>
            </div>

            <div className='item-product'>
              <div>피죤</div>
              <div>5</div>
            </div>

            <div className='item-product'>
              <div>감자깡</div>
              <div>5</div>
            </div>

          </div>

        </div>

        <div className='item-bottom'>
          <button className='receipt-btn'>배달접수</button>
          <button className='detail-btn'>상세보기</button>
        </div>

      </div>
      <div className='delivery-list-item'>

        <div className='item-top'>
          <div>emart24</div>
          <div>14:06</div>
        </div>

        <div className='item-middle'>

          <div className='total-price'>{addComma(32000)} 원</div>

          <div className='item-product-container'>

            <div className='item-product'>
              <div>먹태깡</div>
              <div>5</div>
            </div>

            <div className='item-product'>
              <div>피죤</div>
              <div>5</div>
            </div>

            <div className='item-product'>
              <div>감자깡</div>
              <div>5</div>
            </div>

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

export default DeliveryList;