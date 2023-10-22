import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { baseURL } from 'store/apis/base';

function StockDispose() {

  const accesstoken = localStorage.getItem("accesstoken");
  const convSeq = localStorage.getItem("convSeq");

  const [barcode, setBarcode] = useState("");

  const handleBarcode = (e) => {
    setBarcode(e.target.value);
  }

  const handleDispose = () => {
    
    axios.post(`${baseURL}/updateProductExpirationFlag`, 
      [{
        barcode: barcode,
        convSeq: convSeq 
      }], {
        headers: {
          accessToken: `Bearer ${accesstoken}`
        }
      })
      .then((response) => {
        console.log(response.data);

        if(response.data[0].YES) {
          toast.success(`'${response.data[0].YES}'\n폐기 처리되었습니다`, { style: { maxWidth: 500 } });
        } 
        else {
          toast.error(`${response.data[0].NO}`, { style: { maxWidth: 500 } });
        }
        setBarcode("");
      })
      .catch((error) => {
        console.log(error);
        toast.error("폐기 처리에 실패했습니다");
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