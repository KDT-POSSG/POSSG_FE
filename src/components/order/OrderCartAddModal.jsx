import axios from 'axios';
import React, { useEffect, useState } from 'react';

function OrderCartAddModal({ setIsModalOpen }) {

  const [keyword, setKeyword] = useState("");
  const [searchList, setSearchList] = useState([]);

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  }

  const handleSearch = () => {
    console.log("handleSearch");

    axios.get("http://10.10.10.54:3000/productList", {
      params: {
        convSeq: 1,
        search: keyword
      }
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const handleAdd = () => {
    setIsModalOpen(false);
  }

  return (
    <div className='order-cart-add-modal'>

      <div className='stock-search'>
        <input type="text" placeholder='상품명을 입력해주세요' value={keyword} onChange={handleKeyword} />
        <button type='button' onClick={handleSearch}>
          <span className="material-symbols-rounded">search</span>
        </button>
      </div>

      <div className='ordercart-search'>
        <hr />
        <div className='ordercart-search-item' onClick={handleAdd}>상품명 상품명 상품명 상품명 상품명</div>
        <hr />
        <div className='ordercart-search-item' onClick={handleAdd}>상품명 상품명 상품명 상품명 상품명</div>
        <hr />
        <div className='ordercart-search-item' onClick={handleAdd}>상품명 상품명 상품명 상품명 상품명</div>
        <hr />
        <div className='ordercart-search-item' onClick={handleAdd}>상품명 상품명 상품명 상품명 상품명</div>
      </div>

    </div>
  )
}

export default OrderCartAddModal;