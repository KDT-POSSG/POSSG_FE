import React from 'react';
import { addComma } from 'store/utils/function';
import OrderListItem from './OrderListItem';

function OrderList({ type, orderList }) {
  return (
    <>
      <div className='ordercart-grid-container'>

        <div className='ordercart-grid ordercart-grid-head'>
          <div>
            {
              type === "before" ?
              <input type="checkbox" className='ordercart-check' value="all" />
              :
              <p>번호</p>
            }
          </div>
          <div>상품 이미지</div>
          <div>상품명</div>
          <div>발주 수량</div>
          <div>총 금액</div>
        </div>

        {
          orderList && orderList.length === 0 ? 
          (
            <div className='ordercart-empty'>
              <span className='tossface ordercart-icon'>📦</span>
              <br /><br />아직 상품이 없습니다
            </div>
          )
          :
          (<></>)
        }

        {
          orderList && orderList.map((item) => (
            <OrderListItem key={item.productSeq} type={type} item={item} />
          ))
        }

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
    </>
  )
}

export default OrderList;