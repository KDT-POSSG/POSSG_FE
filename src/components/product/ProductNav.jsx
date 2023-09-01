import React from 'react';

function ProductNav() {
  return (
    <div className='product-nav'>

      <div className='product-nav-filter'>
        <button className='active-btn'>전체</button>
        <button>1+1</button>
        <button>2+1</button>
        <button>세일</button>
        <button>덤증정</button>
      </div>

      <div className='product-nav-search'>
        <input type="text" placeholder='검색할 상품을 입력해주세요' />
        <span className="material-symbols-rounded product-search">search</span>
      </div>

      <div className='product-nav-sort'>
        <select>
          <option value="">최신순</option>
          <option value="">낮은가격순</option>
          <option value="">높은가격순</option>
          <option value="">할인율높은순</option>
        </select>
        <span className="material-symbols-rounded">expand_more</span>
      </div>

    </div>
  )
}

export default ProductNav;