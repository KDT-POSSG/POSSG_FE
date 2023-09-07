import axios from 'axios';
import StockList from 'components/stock/StockList';
import StockNav from 'components/stock/StockNav';
import React, { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";

function Stock() {

  // const [totalCnt, setTotalCnt] = useState(10);
  const [page, setPage] = useState(1);  // 현재 페이지
  // const [itemsPerPage, setItemsPerPage] = useState(1);
  const [stock, setStock] = useState([]);

  const handlePage = (pageNumber) => {
    console.log("page >> ", page);
    setPage(pageNumber);
  }

  useEffect(() => {

    axios.get('http://10.10.10.81:3000/getAllProductStock', {
        parmas: {
          pageNumber: page
        }
      })
      .then((response) => {
        console.log(response.data);
        setStock(response.data);
      })
      .catch((error) => {
        console.error(error);
      })

  }, [page]);

  return (
    <div className='stock-page'>
      
      <div className='stock-top'>
        <div className='page-title stock-page-title'>재고 관리</div>
        <StockNav />
      </div>

      <StockList stock={stock} />

      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={100}
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