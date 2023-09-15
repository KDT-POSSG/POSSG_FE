import React from 'react';
import { Link } from 'react-router-dom';
import { addComma } from 'store/utils/function';

function Order() {
  return (
    <div className='order-page'>

      <div className='order-top'>
        <div className='page-title order-page-title'>발주 페이지</div>
      </div>

      <div className='order-top-filter'>

        <div>
          <button className='active-btn order-filter-btn'>점주 발주 목록</button>
          <button className='order-filter-btn'>고객 요청 목록</button>
        </div>

        <div>
          <button className='order-add-btn'>발주 추가</button>
        </div>
        
      </div>

      <div className='order-grid-container'>

        <div className='order-grid order-grid-head'>
          <div>발주 상태</div>
          <div>발주 번호</div>
          <div>발주 날짜</div>
          <div>총 발주 상품 수</div>
          <div>총 발주 금액</div>
        </div>

        <Link to="/order/1">
          <div className='order-grid order-grid-item'>
            <div className='order-status order-status-0'>발주대기</div>
            <div>-</div>
            <div>-</div>
            <div>{addComma(1800)} 개</div>
            <div>{addComma(21000000)} 원</div>
          </div>
        </Link>

        <Link to="/order/1">
          <div className='order-grid order-grid-item'>
            <div className='order-status order-status-1'>접수완료</div>
            <div>20230905133319</div>
            <div>2023-09-05 13:33:19</div>
            <div>{addComma(1800)}</div>
            <div>{addComma(21000000)}</div>
          </div>
        </Link>
        <Link to="/order/1">
          <div className='order-grid order-grid-item'>
            <div className='order-status order-status-2'>배송중</div>
            <div>20230905133319</div>
            <div>2023-09-05 13:33:19</div>
            <div>{addComma(1800)}</div>
            <div>{addComma(21000000)}</div>
          </div>
        </Link>
        <Link to="/order/1">
          <div className='order-grid order-grid-item'>
            <div className='order-status order-status-3'>배송완료</div>
            <div>20230905133319</div>
            <div>2023-09-05 13:33:19</div>
            <div>{addComma(1800)}</div>
            <div>{addComma(21000000)}</div>
          </div>
        </Link>

      </div>

    </div>
  )
}

export default Order;