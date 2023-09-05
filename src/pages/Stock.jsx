import StockList from 'components/stock/StockList';
import StockNav from 'components/stock/StockNav';
import React from 'react';

function Stock() {
  
  return (
    <div className='stock-page'>
      
      <div className='stock-top'>
        <div className='page-title stock-page-title'>재고 관리</div>
        <StockNav />
      </div>

      <StockList />

    </div>
  )
}

export default Stock;