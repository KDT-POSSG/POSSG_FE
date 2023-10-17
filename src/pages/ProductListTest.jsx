import React, { useEffect, useRef, useState } from 'react';
import ProductNav from '../components/product/ProductNav';
import ProductItem from '../components/product/ProductItem';
import axios from 'axios';
import { baseURL } from 'store/apis/base';

function ProductListTest() {

  const accesstoken = localStorage.getItem("accesstoken");

  const [product, setProduct] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const [keyword, setKeyword] = useState({
    choice: "productName",
    pageNumber: page,
    promotionInfo: 0,
    search: null,
    sortOrder: "newest",
    convSeq: 1
  });

  const getProduct = async () => {

    console.log("getProduct keyword >> ", keyword);
    
    const response = await axios
      .get(`${baseURL}/productList`, {
        params: keyword,
        headers: {
          accessToken: `Bearer ${accesstoken}`
        }
      })
    
    return response;
  }

  useEffect(() => {

    // const timer = setTimeout(() => {

      setPage(0);
      setKeyword({...keyword, pageNumber: 0});

      getProduct()
        .then((response) => {
          console.log(response.data);
          // console.log(response.data.ProductList);
          setProduct(response.data.ProductList);
        })
        .catch((error) => {
          console.error(error);
        })

    // }, 300); 
    // return () => clearTimeout(timer);
    
  }, [keyword.promotionInfo, keyword.search, keyword.sortOrder]);
  
  const bottomRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(page + 1);
          setKeyword({...keyword, pageNumber: page + 1});

          getProduct()
            .then((response) => {
              console.log(response.data);
              // console.log(response.data.ProductList);
              setProduct((prevProduct) => [...prevProduct, ...response.data.ProductList]);
              setHasMore(response.data.ProductList.length > 0);
            })
            .catch((error) => {
              console.error(error);
            })
        }
      },
      { threshold: 0.3 }
    );
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    }
  }, [page]);

  return (
    <div className='product-page'>

      <div className='product-test'>
        <div className='page-title product-page-title'>상품 페이지</div>

        <div>
          <ProductNav keyword={keyword} setKeyword={setKeyword} setPage={setPage} page={page} />
        </div>
        
        {
          !product || product.length === 0 ? 
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
            product && product.map((item, idx) => (
              <ProductItem key={idx} product={item} />
            ))
          }
        </div>
      </div>

      <div ref={bottomRef} style={{ height: "100px", backgroundColor: "skyblue" }}>loading...</div>
      {/* <div ref={setBottom}>loading...</div> */}

    </div>
  )
}

export default ProductListTest;