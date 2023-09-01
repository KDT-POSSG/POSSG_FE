import React, { useEffect, useState } from 'react';
import ProductNav from '../components/product/ProductNav';
import ProductItem from '../components/product/ProductItem';
import axios from 'axios';

function ProductList() {

  const [product, setProduct] = useState([]);
  const [keyword, setKeyword] = useState({
    pageNumber: "",
    promotionInfo: "",
    search: "",
    sortOrder: ""
  });

  useEffect(() => {
    
    axios.get("http://10.10.10.70:3000/productList")
      .then((response) => {
        console.log(response.data);
        setProduct(response.data)
      })
      .catch((error) => {
        console.error(error);
      })

  }, []);

  return (
    <div className='product-page'>

      <div className='page-title'>상품 페이지</div>

      <div>
        <ProductNav />
      </div>

      <div className='product-item-container'>
        <div className='product-item'>1</div>

        {
          product && product.map((item) => (
            <ProductItem key={item.productSeq} product={item} />
          ))
        }
        
      </div>

    </div>
  )
}

export default ProductList;