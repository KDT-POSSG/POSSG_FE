import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { baseURL } from 'store/apis/base';

function StockDispose() {

  const accesstoken = localStorage.getItem("accesstoken");

  const [barcode, setBarcode] = useState("");

  const handleBarcode = (e) => {
    setBarcode(e.target.value);
  }

  const handleDispose = () => {
    
    axios.post(`${baseURL}/updateProductExpirationFlag`, 
      [{
        barcode: barcode,
        convSeq: 1 
      }], {
        headers: {
          accessToken: `Bearer ${accesstoken}`
        }
      })
      .then((response) => {
        console.log(response.data);
        // toast.success(`바밤바 상품 폐기되었습니다`);
        toast.success(`바밤바\n폐기되었습니다`);
        setBarcode("");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className='stock-dispose-modal'>
      
      <div className='dispose-title'>폐기할 상품의 바코드를 스캔해주세요</div>

      <div>
        <input 
          type="text" 
          className='dispose-input'
          // placeholder='바코드를 스캔해주세요'
          autoFocus
          value={barcode} 
          onChange={handleBarcode} 
          onKeyDown={(e) => { if (e.key === 'Enter') {handleDispose();} }} 
        />
      </div>

    </div>
  )
}

export default StockDispose;