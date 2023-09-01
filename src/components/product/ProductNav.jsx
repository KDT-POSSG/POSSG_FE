import React, { useState } from 'react';
import productFilterDatas from '../../assets/datas/productFilterDatas.json';
import productSortDatas from '../../assets/datas/productSortDatas.json';

function ProductNav({ keyword, setKeyword }) {

  const [search, setSearch] = useState("");

  const handleKeyword = (e) => {
    setKeyword({...keyword, [e.target.name]: e.target.value});
  }

  const handleSearchKeyword = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className='product-nav'>

      <div className='product-nav-filter'>
        {/* active-btn */}
        {
          productFilterDatas.map((item) => (
            <button key={item.id} name={item.name} value={item.value} onClick={handleKeyword}>
              {item.title}
            </button>
          ))
        }
      </div>

      <div className='product-nav-search'>
        <input type="text" placeholder='검색할 상품을 입력해주세요' value={search} onChange={handleSearchKeyword} />
        <button type='button' name='search' value={search} onClick={handleKeyword}>
          <span className="material-symbols-rounded product-search">search</span>
        </button>
      </div>

      <div className='product-nav-sort'>
        <select name='sortOrder' onChange={handleKeyword}>
          {
            productSortDatas.map((item) => (
              <option key={item.id} value={item.value}>{item.title}</option>
            ))
          }
        </select>
        <span className="material-symbols-rounded">expand_more</span>
      </div>

    </div>
  )
}

export default ProductNav;