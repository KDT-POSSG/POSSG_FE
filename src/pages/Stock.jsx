import StockList from 'components/stock/StockList';
import StockNav from 'components/stock/StockNav';
import React, { useState } from 'react';
import Pagination from "react-js-pagination";

function Stock() {

  // const [totalCnt, setTotalCnt] = useState(10);
  const [page, setPage] = useState(1);  // 현재 페이지
  // const [itemsPerPage, setItemsPerPage] = useState(1);

  const handlePage = (pageNumber) => {
    setPage(pageNumber);
  }

  return (
    <div className='stock-page'>
      
      <div className='stock-top'>
        <div className='page-title stock-page-title'>재고 관리</div>
        <StockNav />
      </div>

      <StockList />

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