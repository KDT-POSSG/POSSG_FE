import React, { useEffect, useRef, useState } from 'react';
import ProductNav from '../components/product/ProductNav';
import ProductItem from '../components/product/ProductItem';
import axios from 'axios';
import { baseURL } from 'store/apis/base';

function ProductScroll() {

  const accesstoken = localStorage.getItem("accesstoken");

  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(0);

  const [keyword, setKeyword] = useState({
    choice: "productName",
    pageNumber: page,
    promotionInfo: 0,
    search: null,
    sortOrder: "newest",
    convSeq: 2
  });

  const getProduct = async (nowPage) => {

    console.log("getProduct keyword >> ", keyword);
    
    const response = await axios.get(`${baseURL}/productList`, {
        params: {
          choice: keyword.choice,
          pageNumber: nowPage,
          promotionInfo: keyword.promotionInfo,
          search: keyword.search,
          sortOrder: keyword.sortOrder,
          convSeq: 2
        },
        headers: {
          accessToken: `Bearer ${accesstoken}`
        }
      })
    
    return response;
  }

  useEffect(() => {

    console.log("=====초기세팅=====");

    // const timer = setTimeout(() => {
      setLoading(true);

      setHasMore(true);
      setPage(0);
      setKeyword({...keyword, pageNumber: 0});

      getProduct(0)
        .then((response) => {
          console.log(response.data);
          // console.log(response.data.ProductList);
          setProduct(response.data.ProductList);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          // 초기 로딩이 완료되면 loading 상태를 해제합니다.
          setLoading(false);
        });

    // }, 300); 
    // return () => clearTimeout(timer);
    
  }, [keyword.promotionInfo, keyword.search, keyword.sortOrder]);
  
  const bottomRef = useRef(null);

  useEffect(() => {

    if (loading) {
      return; // 로딩 중에는 무한 스크롤 이벤트를 무시
    }

    console.log("=====무한스크롤=====");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {

          setLoading(true);
          setPage(page + 1);
          setKeyword({...keyword, pageNumber: page + 1});

          getProduct(page + 1)
            .then((response) => {
              console.log(response.data);
              // console.log(response.data.ProductList);
              setProduct((prevProduct) => [...prevProduct, ...response.data.ProductList]);
              setHasMore(response.data.ProductList.length > 0);
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              // 초기 로딩이 완료되면 loading 상태를 해제합니다.
              setLoading(false);
            });
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

  }, [page, loading]);

  return (
    <div className='product-page'>

      <div className='product-test'>
        <div className='page-title product-page-title'>상품 페이지</div>

        <div>
          <ProductNav keyword={keyword} setKeyword={setKeyword} setPage={setPage} page={page} setHasMore={setHasMore} />
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
              // <ProductItem key={idx} product={item} />
              <ProductItem key={item.productSeq} product={item} />
            ))
          }
        </div>
      </div>

      {
        // product && 
        // product.length !== 0 && 
        // hasMore &&
        !loading &&
        <div ref={bottomRef} className='product-loading'></div>
        // <div ref={bottomRef} style={{ height: "100px", backgroundColor: "none" }}></div>
      }

    </div>
  )
}

export default ProductScroll;