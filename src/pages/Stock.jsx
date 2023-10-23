import axios from 'axios';
import StockList from 'components/stock/StockList';
import StockNav from 'components/stock/StockNav';
import React, { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import { baseURL } from 'store/apis/base';

function Stock() {

  const accesstoken = localStorage.getItem("accesstoken");
  const convSeq = localStorage.getItem("convSeq");

  const [stock, setStock] = useState([]);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("newest");

  const handlePage = (pageNumber) => {
    setPage(pageNumber);
  }

  useEffect(() => {

    axios.get(`${baseURL}/getAllProductStock`, {
        params: {
          convSeq: convSeq,
          pageNumber: page - 1,
          search: search,
          sortOrder: filter,
          pageSize: 10,
          stockListCheck: 1
        },
        headers:{ 
          accessToken: `Bearer ${accesstoken}`
        }
      })
      .then((response) => {
        console.log(response.data);
        setStock(response.data);
      })
      .catch((error) => {
        console.error(error);
      })

  }, [page, search, filter]);

  return (
    <div className='stock-page'>

      <div className='page-title stock-page-title'>상품 재고 관리</div>
      
      <div className='stock-top'>
        <StockNav search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} setPage={setPage} />
      </div>

      <StockList stock={stock.ProductList} />

      <Pagination
        activePage={page}
        itemsCountPerPage={1}
        totalItemsCount={stock.pageProduct}
        pageRangeDisplayed={5}
        firstPageText={<span className="material-symbols-rounded page-btn">keyboard_double_arrow_left</span>}
        prevPageText={<span className="material-symbols-rounded page-btn">chevron_left</span>}
        nextPageText={<span className="material-symbols-rounded page-btn">chevron_right</span>}
        lastPageText={<span className="material-symbols-rounded page-btn">keyboard_double_arrow_right</span>}
        onChange={handlePage}
      />

    </div>
  )
}

export default Stock;