import React, { useEffect, useState } from 'react';
import ProductNav from '../components/product/ProductNav';
import ProductItem from '../components/product/ProductItem';
import axios from 'axios';

function ProductList() {

  const [product, setProduct] = useState([]);
  const [keyword, setKeyword] = useState({
    choice: "product_name",
    pageNumber: 0,
    promotionInfo: 0,
    search: null,
    sortOrder: "newest"
  });

  useEffect(() => {

    console.log("keyword >> ", keyword);
    
    axios.get("http://10.10.10.70:3000/productList", {
      params: keyword
    })
      .then((response) => {
        console.log(response.data);
        setProduct(response.data)
      })
      .catch((error) => {
        console.error(error);
      })

  }, [keyword]);

  return (
    <div className='product-page'>

      <div className='page-title'>상품 페이지</div>

      <div>
        <ProductNav keyword={keyword} setKeyword={setKeyword} />
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