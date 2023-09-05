import React from 'react';

function StockNav() {
  return (
    <div className='stock-top-nav'>

      <div className='stock-search'>
        <input type="text" placeholder='검색할 상품을 입력해주세요' />
        <button type='button'>
          <span className="material-symbols-rounded">search</span>
        </button>
      </div>

      <div className='stock-sort'>
        <select name="" id="">
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
        </select>
        <span className="material-symbols-rounded">expand_more</span>
      </div>

    </div>
  )
}

export default StockNav;