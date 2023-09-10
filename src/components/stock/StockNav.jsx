import React, { useState } from 'react';

function StockNav({ search, setSearch, setFilter }) {

  const [keyword, setKeyword] = useState(search);

  const handleSearchBtn = () => {
    setSearch(keyword);
  }

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  }

  const handleFilter = (e) => {
    setFilter(e.target.value);
  }

  return (
    <div className='stock-top-nav'>

      <div className='stock-search'>
        <input type="text" placeholder='검색할 상품을 입력해주세요' value={keyword} onChange={handleKeyword} />
        <button type='button' onClick={handleSearchBtn}>
          <span className="material-symbols-rounded">search</span>
        </button>
      </div>

      <div className='stock-sort'>
        <select onChange={handleFilter}>
          <option value="newest">최신순</option>
          <option value="lowestPrice">낮은가격순</option>
          <option value="highestPrice">높은가격순</option>
          <option value="leastExpiry">유통기한짧은순</option>
          <option value="mostExpiry">유통기한긴순</option>
        </select>
        <span className="material-symbols-rounded">expand_more</span>
      </div>

    </div>
  )
}

export default StockNav;