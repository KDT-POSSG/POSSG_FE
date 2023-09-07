import React from 'react';
import StockListItemMain from './StockListItemMain';

function StockList({ stock }) {

  return (
    <div className='stock-grid-container'>

      <div className='stock-grid stock-grid-head'>
        <div>번호</div>
        <div>상품명</div>
        <div>재고 수량</div>
        <div>발주 추가</div>
      </div>

      {
        stock && stock.map((item, idx) => (
          <StockListItemMain key={item.product_name} stock={item} idx={idx} />
        ))
      }

    </div>
  )
}

export default StockList;