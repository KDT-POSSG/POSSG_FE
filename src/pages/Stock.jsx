import axios from 'axios';
import StockList from 'components/stock/StockList';
import StockNav from 'components/stock/StockNav';
import React, { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";

function Stock() {

  const [stock, setStock] = useState([]);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("newest");

  const handlePage = (pageNumber) => {
    setPage(pageNumber);
  }

  useEffect(() => {

    console.log("page - 1 >> ", page - 1);
    console.log("search >> ", search);
    console.log("filter >> ", filter);

    axios.get('http://10.10.10.81:3000/getAllProductStock', {
        params: {
          pageNumber: page - 1,
          search: search,
          sortOrder: filter,
          pageSize: 10
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
      
      <div className='stock-top'>
        <div className='page-title stock-page-title'>재고 관리</div>
        <StockNav search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
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