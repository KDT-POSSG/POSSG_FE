import React from 'react';

function StockListItemSub({ item, isSubOpen }) {

  let today = new Date();   

  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);
  let hours = ('0' + today.getHours()).slice(-2); 
  let minutes = ('0' + today.getMinutes()).slice(-2);
  let seconds = ('0' + today.getSeconds()).slice(-2); 

  let timeString = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes  + ':' + seconds;

  return (
    <div className={`stock-grid ${isSubOpen ? 'stock-grid-sub' : 'stock-grid-sub-none'}`}>
      <div></div>
      <div className='content'>
        <div>{item.product_name}</div>
        <div className={`${timeString > item.expiration_date ? "expiration-over" : ""}`}>
          {item.expiration_date}
        </div>
      </div>
      <div className='stock'>{item.stock}</div>
      <div></div>
    </div>
  )
}

export default StockListItemSub;