import React, { useState } from 'react';
import { addComma } from 'store/utils/function';

function Delivery() {

  const [activeSort, setActiveSort] = useState(1);

  const handleActiveSort = (status) => {
    console.log("status >> ", status);
    setActiveSort(status);
  }

  return (
    <div className='delivery-page'>

      <div className='delivery-test'>
      
        <div className='page-title delivery-title'>배달 페이지</div>

        <div className='delivery-sort'>
          <div className={`delivery-sort-active status-0${activeSort}`}></div>
          <div className='delivery-status delivery-status-01' onClick={() => handleActiveSort(1)}>대기<span>&nbsp;&nbsp;4</span></div>
          <div className='delivery-status delivery-status-02' onClick={() => handleActiveSort(2)}>접수<span>&nbsp;&nbsp;5</span></div>
          <div className='delivery-status delivery-status-03' onClick={() => handleActiveSort(3)}>완료<span>&nbsp;&nbsp;20</span></div>
        </div>

        <div className='delivery-list-container'>
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

      </div>

    </div>
  )
}

export default Delivery;