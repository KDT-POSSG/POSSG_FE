import React, { useEffect, useRef, useState } from 'react';
import ProductNav from '../components/product/ProductNav';
import ProductItem from '../components/product/ProductItem';
import axios from 'axios';
import { getProductList } from 'store/apis/product';

function ProductList() {

  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState({
    choice: "productName",
    pageNumber: page,
    promotionInfo: 0,
    search: null,
    sortOrder: "newest"
  });

  useEffect(() => {

    const timer = setTimeout(() => {

      getProductList(keyword)
      .then((response) => {
        console.log(response.data);
        console.log(response.data.ProductList);
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      })

    }, 300); 
    return () => clearTimeout(timer);
    
  }, [keyword]);

  const target = useRef(null);

  useEffect(() => {
    observer.observe(target.current);
  }, []);

  const options = {
    threshold: 0.8
  };

  const callback = () => {
    console.log("관측");
    setPage(page + 1);
    console.log("머임?");
    console.log(page);
  };

  const observer = new IntersectionObserver(callback, options);

  return (
    <div className='product-page'>

      <div className='product-test'>
        <div className='page-title product-page-title'>상품 페이지</div>

        <div>
          <ProductNav keyword={keyword} setKeyword={setKeyword} />
        </div>

        {
          !product.ProductList || product.ProductList.length === 0 ? 
          (
            <div className='product-noitem'>
              <span className='tossface'>📦</span>
              <br /><br />해당하는 상품이 없습니다
            </div>
          )
          :
          (<></>)
        }

        <div className='product-item-container'>
          {
            product.ProductList && product.ProductList.map((item) => (
              <ProductItem key={item.productSeq} product={item} />
            ))
          }
        </div>

        <div ref={target}>test</div>
      </div>

    </div>
  )
}

export default ProductList;