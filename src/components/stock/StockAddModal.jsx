import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { baseURL } from 'store/apis/base';
import { addComma } from 'store/utils/function';

function StockAddModal({ product_seq, product_name, img_url, totalStock, price, price_origin, modalClose }) {

  const accesstoken = localStorage.getItem("accesstoken");
  const branchName = localStorage.getItem("branchName");

  const [addStock, setAddStock] = useState(1);

  const handleAddStock = (e) => {

    console.log(e.target.value);

    if(e.target.value === "plus") {
      setAddStock(addStock + 1);
    }
    else if(e.target.value === "minus") {
      if(addStock <= 1) {
        toast.error("수량은 1 미만이 될 수 없습니다");
        return;
      }
      setAddStock(addStock - 1);
    }
    else {
      if(e.target.value < 0) {
        toast.error("수량은 1 미만이 될 수 없습니다");
        return;
      }
      setAddStock(e.target.value);
    }
  }

  const handleSubmitStock =() => {

    if(addStock <= 0) {
      toast.error("수량은 1 미만이 될 수 없습니다");
      return;
    }
    
    axios
      .post(`${baseURL}/addCallProductConv`, {
        convSeq: 1,
        productSeq: product_seq, 
        priceOrigin: price_origin,
        price: price,
        productName: product_name,
        imgUrl: img_url,
        amount: addStock
      }, {
        headers: {
          accessToken: `Bearer ${accesstoken}`
      }})
      .then((response) => {
        console.log(response);

        if(response.data === "YES") {
          modalClose();
          toast.success(`발주 추가 완료`);
        }
        else {
          toast.error(`발주 추가 실패`);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(`발주 추가 실패`);
      })
  }

  return (
    <div className='stock-add-modal'>

      <div className='add-modal-top'>
        <div className='product-image'>
          <img src={img_url} alt={product_name} />
        </div>
        <div className='product-info'>
          <div className='name'>{product_name}</div>
          <div className='stock-cnt'>현재 수량 : {totalStock} 개</div>
          <div>개당 가격 : {addComma(price_origin)} 원</div>
        </div>
      </div>

      <hr />

      <div className='add-modal-input'>

        <div className='process'>
          <button value="minus" onClick={handleAddStock} className='minus'>
            <span className="material-symbols-rounded stock-calc">remove</span>
          </button>

          <input type="text" placeholder='추가 수량 입력' value={addStock} onChange={handleAddStock} disabled /><br/>
          
          <button value="plus" onClick={handleAddStock} className='plus'>
            <span className="material-symbols-rounded stock-calc">add</span>
          </button>
        </div>

        <div className='result'>
          총합 : {addComma(price_origin * addStock)} 원
        </div>
        
      </div>

      <hr />

      <div className='add-modal-btn' onClick={handleAddStock}>
        <button type='button' onClick={handleSubmitStock}>확인</button>
      </div>

    </div>
  )
}

export default StockAddModal;