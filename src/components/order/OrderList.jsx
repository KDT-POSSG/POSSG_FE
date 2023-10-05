import React, { useState } from 'react';
import { addComma } from 'store/utils/function';
import OrderListItem from './OrderListItem';

function OrderList({ type, orderList, selectedItems, setSelectedItems, totalAmount, totalProduct, totalPrice }) {

  const handleAllCheck = (e) => {
    console.log("handleAllCheck >> ", e.target.checked);

    if (e.target.checked) {
      setSelectedItems((prevSelectedItems) => orderList.map((item) => item.productName));
    } else {
      setSelectedItems([]);
    }
  }

  const handleCheck = (e) => {
  
    if (e.target.checked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, e.target.value,]);
    } else {
      setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((item) => item !== e.target.value));
    }
  };

  return (
    <>
      <div className='ordercart-grid-container'>

        <div className='ordercart-grid ordercart-grid-head'>
          <div>
            {
              type === "before" ?
              <input type="checkbox" className='ordercart-check' value="all" checked={selectedItems.length === orderList.length && orderList.length !== 0 } onChange={handleAllCheck} />
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
          orderList && orderList.map((item, idx) => (
            <OrderListItem key={item.productSeq} type={type} item={item} handleCheck={handleCheck} selectedItems={selectedItems} idx={idx} />
          ))
        }

      </div>

      <div className='order-detail-bottom'>
        <div className='bottom-left'>
          <div className='bottom-text'>총 상품 종류</div>
          <div className='bottom-number'>{addComma(totalProduct)} 개</div>
        </div>
        <div className='bottom-left'>
          <div className='bottom-text'>총 상품 수량</div>
          <div className='bottom-number'>{addComma(totalAmount)} 개</div>
        </div>
        <div className='bottom-right'>
          <div className='bottom-text'>총 금액</div>
          <div className='bottom-number'>{addComma(totalPrice)} 원</div>
        </div>
      </div>
    </>
  )
}

export default OrderList;