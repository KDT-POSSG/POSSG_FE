import React, { useEffect, useState } from 'react';
import { addComma } from '../../store/utils/function.js';

function ProductItem({ product }) {

  const [isPromotion, setIsPromotion] = useState(1);

  useEffect(() => {
    
    switch (product.promotionInfo) {
      case 1:
        setIsPromotion("");
        break;
      case 2:
        setIsPromotion("세일");
        break;
      case 3:
        setIsPromotion("덤증정");
        break;
      case 4:
        setIsPromotion("1+1");
        break;
      case 5:
        setIsPromotion("2+1");
        break;
      default:
        break;
    }

  }, []);

  return (
    <div className='product-item'>

      <div className='product-promotion'>
        <div className={`promo promotion${product.promotionInfo}`}>
          {isPromotion}
        </div>
      </div>

      <div className='product-image'>
        <img src={product.imgUrl} alt={product.productName} />
      </div>

      <div className='product-name'>
        {product.productName}
      </div>

      <div className='product-price'>
        {
          product.price === product.priceDiscount ? 
          (
            <div className='product-price-sale'>
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

      <div>
        남은 재고 : {product.stockQuantity} 개
      </div>

    </div>
  )
}

export default ProductItem;