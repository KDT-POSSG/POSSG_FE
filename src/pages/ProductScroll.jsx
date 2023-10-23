import React, { useEffect, useRef, useState } from 'react';
import ProductNav from '../components/product/ProductNav';
import ProductItem from '../components/product/ProductItem';
import axios from 'axios';
import { baseURL } from 'store/apis/base';
import Modal from 'components/ui/Modal';
import ProductNutrition from 'components/product/ProductNutrition';

function ProductScroll() {

  const accesstoken = localStorage.getItem("accesstoken");
  const convSeq = localStorage.getItem("convSeq");

  const bottomRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [product, setProduct] = useState([]);

  const [keyword, setKeyword] = useState({
    choice: "productName",
    pageNumber: page,
    promotionInfo: 0,
    search: null,
    sortOrder: "newest",
    convSeq: convSeq
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState({
    productSeq: 0,
    productName: ""
  });

  const modalOpen = (productSeq, productName) => {
    setModalProduct({
      ...modalProduct,
      productSeq: productSeq,
      productName: productName
    });
    setIsModalOpen(true);
  }

  const modalClose = () => {
    setIsModalOpen(false);
  }

  const getProduct = async (nowPage) => {

    console.log("getProduct keyword >> ", keyword);
    
    const response = await axios.get(`${baseURL}/productList`, {
        params: {
          choice: keyword.choice,
          pageNumber: nowPage,
          promotionInfo: keyword.promotionInfo,
          search: keyword.search,
          sortOrder: keyword.sortOrder,
          convSeq: convSeq
        },
        headers: {
          accessToken: `Bearer ${accesstoken}`
        }
      })
    
    return response;
  }

  useEffect(() => {

    console.log("=====초기세팅=====");

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
        setLoading(false);
      });
    
  }, [keyword.promotionInfo, keyword.search, keyword.sortOrder]);

  useEffect(() => {

    if (loading) {
      return; 
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

  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
  }

  return (
    <div className='product-page'>

      <div className='product-test'>
        <div className='page-title product-page-title'>편의점 상품</div>

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
            product && product.map((item) => (
              <ProductItem key={item.productSeq} product={item} modalOpen={modalOpen} />
            ))
          }
        </div>
      </div>

      {
        !loading &&
        <div ref={bottomRef} className='product-loading'></div>
      }

      <Modal isOpen={isModalOpen} onClose={modalClose} style={{ content: { width: '25rem', height: 'auto' } }}>
        { modalProduct && <ProductNutrition modalProduct={modalProduct} />}
      </Modal>

      <div className="scroll-top-container">
        <button type="button" className="scroll-top-btn" onClick={scrollToTop}>
          <span className="material-symbols-rounded">expand_less</span>
        </button>
      </div>

    </div>
  )
}

export default ProductScroll;