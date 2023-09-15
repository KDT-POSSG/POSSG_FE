import React from 'react';
import { addComma } from 'store/utils/function';

function OrderDetail() {
  return (
    <div className='order-page order-detail-page'>
      
      <div className='order-detail-top'>
        <div className='page-title order-page-title'>발주 페이지</div>
      </div>

      <div className='order-detail-middle'>
        <div>
          <div className='order-status order-status-0'>발주대기</div>

          <div className='number-date'>
            <div className='left'>
              <span>발주번호</span>
              &nbsp;&nbsp;&nbsp;202309051811
            </div>
            <div className='right'>
              <span>발주날짜</span>
              &nbsp;&nbsp;&nbsp;2023-09-05 00:00:00
            </div>
            {/* <div className='left'>
              <span>발주번호</span>
              &nbsp;&nbsp;&nbsp;-
            </div>
            <div className='right'>
              <span>발주날짜</span>
              &nbsp;&nbsp;&nbsp;-
            </div> */}
          </div>
        </div>

        <div>
          <button className='order-cancel'>발주 취소</button>
        </div>
      </div>

      <div className='order-grid-container'>

        <div className='order-grid order-grid-head'>
          <div>번호</div>
          <div>상품명</div>
          <div>단가</div>
          <div>수량</div>
          <div>금액</div>
        </div>

        <div className='order-grid order-grid-item'>
          <div className='order-status-0'>1</div>
          <div className='order-datail-product'>요거트볼</div>
          <div>{addComma(1800)}</div>
          <div>{addComma(2)}</div>
          <div>{addComma(1800 * 2)} 원</div>
        </div>
        
      </div>

      <div className='order-detail-bottom'>
        <div className='bottom-left'>
          <div className='bottom-text'>총 상품 수량</div>
          <div className='bottom-number'>{addComma(1800)} 개</div>
        </div>
        <div className='bottom-right'>
          <div className='bottom-text'>총 금액</div>
          <div className='bottom-number'>{addComma(12030000)} 원</div>
        </div>
      </div>

    </div>
  )
}

export default OrderDetail;