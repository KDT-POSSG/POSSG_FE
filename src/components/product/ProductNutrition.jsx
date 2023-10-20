import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseURL } from 'store/apis/base';

function ProductNutrition({ modalProduct }) {

  const accesstoken = localStorage.getItem("accesstoken")

  const [nutrition, setNutrition] = useState([]);

  useEffect(() => {

    console.log("modalProduct >> ", modalProduct);

    axios.get(`${baseURL}/getNutritionInfo`, {
      params: {
        // productSeq: 3451
        productSeq: modalProduct.productSeq
      },
      headers: {
        accessToken: `Bearer ${accesstoken}`
      }
    })
    .then((response) => {
      console.log(response.data);
      setNutrition(response.data)
    })
    .catch((error) => {
      console.error(error);
    })
    
  }, []);

  return (
    <div className='product-nutrition-modal-container'>

      <div className='product-nutrition-modal'>
      
        <div className='nutrition-product'>
          {modalProduct.productName}
        </div>

        {
          nutrition && nutrition.length === 0 ?
          <div className='nutrition-none'>
            <span className='tossface nutrition-none-icon'>🧑‍🍳</span>
            <br/><br/>
            영양정보 준비 중입니다!
          </div>
          :
          <>
            <div className='nutrition-title'>
              <div className='nutrition-title-left'>영양정보</div>

              <div className='nutrition-title-right'>
                <div>{nutrition[1] && nutrition[1].title} {nutrition[1] && nutrition[1].value}</div>
                <div>{nutrition[2] && nutrition[2].title} {nutrition[2] && nutrition[2].value}</div>
              </div>
            </div>

            <div className='nutrition-content-container'>
              {
                nutrition && nutrition.slice(3).map((item) => (
                  <div key={item.title} className='nutrition-content'>
                    <div className='nutrition-content-title'>{item.title}</div>
                    <div className='nutrition-content-value'>{item.value}</div>
                  </div>
                ))
              }

              <div className='nutrition-content-bottom'></div>
            </div>
          </>
        }

      </div>

    </div>
  )
}

export default ProductNutrition;