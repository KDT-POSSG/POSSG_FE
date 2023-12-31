import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { baseURL } from 'store/apis/base';

function OrderCartAddModal({ setIsModalOpen }) {

  const accesstoken = localStorage.getItem("accesstoken");
  const convSeq = localStorage.getItem("convSeq");

  const [keyword, setKeyword] = useState("");
  const [searchList, setSearchList] = useState([]);

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  }

  const handleSearch = () => {

    axios.get(`${baseURL}/productList`, {
      params: {
        convSeq: convSeq,
        search: keyword,
        pageSize: 65534,
        pageNumber: 0,
        choice: "productName",
        sortOrder: "newest",
        promotionInfo: 0
      },
      headers: {
        accessToken: `Bearer ${accesstoken}`
      }
    })
      .then((response) => {
        console.log(response.data);
        setSearchList(response.data.ProductList);
        console.log("searchList >> ", searchList);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const handleAddProduct = (item) => {
    
    axios
      .post(`${baseURL}/addCallProductConv`, {
          convSeq: convSeq,
          productSeq: item.productSeq, 
          priceOrigin: item.priceOrigin,
          price: item.price,
          productName: item.productName,
          imgUrl: item.imgUrl,
          amount: 1
      }, {
        headers: {
          accessToken: `Bearer ${accesstoken}`
        }
      })
      .then((response) => {
        console.log(response.data);

        if(response.data === "YES") {
          toast.success("상품이 추가되었습니다");
        }
        else {
          toast.error("상품 추가에 실패했습니다");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("상품 추가에 실패했습니다");
      })
  }

  return (
    <div className='order-cart-add-modal'>

      <div className='stock-search'>
        <input type="text" placeholder='상품명을 입력해주세요' value={keyword} onChange={handleKeyword} onKeyDown={(e) => { if (e.key === 'Enter') {handleSearch();} }} />
        <button type='button' onClick={handleSearch}>
          <span className="material-symbols-rounded">search</span>
        </button>
      </div>

      <div className='ordercart-search'>
        {
          searchList && searchList.length !== 0 ?
          searchList.map((item) => (
            <React.Fragment key={item.productSeq}>
              <hr />
              <div className='ordercart-search-item' onClick={() => handleAddProduct(item)}>{item.productName}</div>
            </React.Fragment>
          ))
          :
          <React.Fragment>
            <div className='order-cart-add-empty'>
              <span className='tossface order-cart-add-icon'>📦</span>
              <br /><br />해당하는 상품이 없습니다
            </div>
          </React.Fragment>
        }
      </div>

    </div>
  )
}

export default OrderCartAddModal;