import React, { useEffect, useState } from 'react';
import { addComma } from '../../store/utils/function.js';
import { promotion } from '../../store/utils/function.js';

function ProductItem({ product, modalOpen }) {

  const [isPromotion, setIsPromotion] = useState(1);

  useEffect(() => {
    
    setIsPromotion(promotion(product.promotionInfo));

  }, []);

  return (
    <div className='product-item' onClick={() => modalOpen(product.productSeq, product.productName, product.productRomanName)}>

      {
        product.stockQuantity === 0 ?
        (
          <div className='product-soldout'>
            <div className='product-soldout-title'>
              일시품절<br /><br />
              <span className='tossface'>🥲</span>
            </div>
            {/* <div>
              <button>발주 요청하기</button>
            </div> */}
          </div>
        )
        :
        (<></>)
        
      }

      <div className='product-promotion'>
        <div className={`promo promotion${product.promotionInfo}`}>
          {isPromotion}
        </div>
      </div>

      <div className='product-image'>
        <div className='product-image-box'>
          <img src={product.imgUrl} alt={product.productName} />
        </div>
      </div>

      <div className='product-name'>
        {product.productName}
      </div>

      <div className='product-price'>
        {
          product.price === product.priceDiscount ? 
          (
            <div className='product-price-normal'>
              {addComma(product.price)} 원
            </div>
          )
          :
          (
            <>
              <div className='product-price-origin'>
                {addComma(product.price)} 원
              </div>
              <div className='product-price-sale'>
                {addComma(product.priceDiscount)} 원
              </div>
            </>
          )
        }
      </div>

      <div className='product-stock'>
        남은 재고 : {product.stockQuantity} 개
      </div>

    </div>
  )
}

export default ProductItem;