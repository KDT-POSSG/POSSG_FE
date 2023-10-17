import React, { useEffect, useRef, useState } from 'react';
import ProductNav from '../components/product/ProductNav';
import ProductItem from '../components/product/ProductItem';
import axios from 'axios';
import { baseURL } from 'store/apis/base';

function ProductList() {

  const accesstoken = localStorage.getItem("accesstoken");

  const [bottom, setBottom] = useState(null);
	const bottomObserver = useRef(null);

  const [product, setProduct] = useState([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const [keyword, setKeyword] = useState({
    choice: "productName",
    pageNumber: page,
    promotionInfo: 0,
    search: null,
    sortOrder: "newest"
  });

  const getProduct = async () => {

    try {
      const response = await axios.get(`${baseURL}/productList`, {
        params: keyword,
        headers: {
          accessToken: `Bearer ${accesstoken}`
        }
      })
      console.log(response.data);
      return response.data;
    } 
    catch (error) {
      console.log(error);
    }
  }

  const loadMoreData = () => {

    const nextPage = page + 1;
    setKeyword((prevKeyword) => ({
      ...prevKeyword,
      pageNumber: nextPage,
    }));

    axios
      .get(`${baseURL}/productList`, {
        params: keyword,
        headers: {
          accessToken: `Bearer ${accesstoken}`
        }
      })
      .then((response) => {
        setProduct((prevProduct) => [...prevProduct, ...response.data.ProductList]);
        setPage(nextPage); // 페이지 번호 업데이트
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {

    const timer = setTimeout(() => {

      axios
        .get(`${baseURL}/productList`, {
          params: keyword,
          headers: {
            accessToken: `Bearer ${accesstoken}`
          }
        })
        .then((response) => {
          console.log(response.data);
          console.log(response.data.ProductList);
          // setProduct(response.data);
          setProduct((prevProduct) => [...prevProduct, ...response.data.ProductList]);
        })
        .catch((error) => {
          console.error(error);
        })

    }, 300); 
    return () => clearTimeout(timer);
    
  }, [keyword]);

  

  useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting) {
          loadMoreData();
          console.log("1");
				}
			},
			{ threshold: 0.25, rootMargin: '0px' },
		);
		bottomObserver.current = observer;
	}, []);

	useEffect(() => {
		const observer = bottomObserver.current;
		if (bottom) {
			observer.observe(bottom);
		}
		return () => {
			if (bottom) {
				observer.unobserve(bottom);
			}
		};
	}, [bottom]);

  return (
    <div className='product-page'>

      <div className='product-test'>
        <div className='page-title product-page-title'>상품 페이지</div>

        <div>
          <ProductNav keyword={keyword} setKeyword={setKeyword} />
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
              <ProductItem key={item.productSeq} product={item} />
            ))
          }
        </div>
      </div>

      <div ref={setBottom} style={{ height: "300px", backgroundColor: "skyblue" }}>loading...</div>
      {/* <div ref={setBottom}>loading...</div> */}

    </div>
  )
}

export default ProductList;