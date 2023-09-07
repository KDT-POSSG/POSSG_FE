import React from 'react';

function StockListItemSub({ item, isSubOpen }) {
  return (
    <div className={`stock-grid ${isSubOpen ? 'stock-grid-sub' : 'stock-grid-sub-none'}`}>
      <div></div>
      <div className='content'>
        <div>{item.product_name}</div>
        <div>{item.expiration_date}</div>
      </div>
      <div className='stock'>{item.stock}</div>
      <div></div>
    </div>
  )
}

export default StockListItemSub;