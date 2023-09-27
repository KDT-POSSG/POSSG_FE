import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function OrderCartAddModal({ setIsModalOpen }) {

  const [keyword, setKeyword] = useState("");
  const [searchList, setSearchList] = useState([]);

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  }

  const handleSearch = () => {
    console.log("handleSearch");

    axios.get("http://10.10.10.140:3000/productList", {
      params: {
        convSeq: 1,
        search: keyword,
        pageSize: 65534,
        pageNumber: 0,
        choice: "productName",
        sortOrder: "newest",
        promotionInfo: 0
      }
    })
      .then((response) => {
        console.log(response.data);
        setSearchList(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const handleAddProduct = () => {
    
    axios.post("http://10.10.10.140:3000/addCallProductConv", {
          convSeq: 1,
          productSeq: 1, 
          primePrice: 1,
          price: 1,
          productName: "1",
          imgUrl: "1",
          amount: 1
      })
      .then((response) => {
        console.log(response.data);
        toast.success("상품 추가 성공");
      })
      .catch((error) => {
        console.error(error);
        toast.error("상품 추가 실패");
      })
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
        {
          searchList && searchList.map((item) => (
            <React.Fragment>
              <hr />
              <div className='ordercart-search-item' onClick={handleAddProduct}>상품명 상품명 상품명 상품명 상품명</div>
            </React.Fragment>
          ))
        }
      </div>

    </div>
  )
}

export default OrderCartAddModal;