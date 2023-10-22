import React, { useEffect, useState } from 'react';
import OrderItem from 'components/order/OrderItem';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { baseURL } from 'store/apis/base';

function Order() {

  const accesstoken = localStorage.getItem("accesstoken");
  const convSeq = localStorage.getItem("convSeq");

  const [orderList, setOrderList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {

    axios.get(`${baseURL}/getAllConvOrderList`, {
        params: {
          convSeq: convSeq,
          pageNumber: page - 1,
          pageSize: 20
        },
        headers: {
          accessToken: `Bearer ${accesstoken}`
        }
      })
      .then((response) => {
        console.log(response.data);
        setOrderList(response.data.orderList);
        setTotalPage(response.data.pageProduct);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  const handlePage = (pageNumber) => {
    setPage(pageNumber);
  }

  return (
    <div className='order-page'>

      <div className='order-top'>
        <div className='page-title order-page-title'>발주 내역</div>

        {/* <div className='order-top-filter'>
          <button className='active-btn order-filter-btn'>점주 발주 목록</button>
          <button className='order-filter-btn'>고객 요청 목록</button>
        </div> */}
      </div>

      <div className='order-grid-container'>

        <div className='order-grid order-grid-head'>
          <div>발주 상태</div>
          <div>발주 번호</div>
          <div>발주 날짜</div>
          <div>총 발주 상품 종류</div>
          <div>총 발주 금액</div>
        </div>

        {
          orderList && orderList.length === 0 &&
          <div className='order-list-none-container'>
            <span className='tossface order-list-none'>📑</span>
            <br/><br/>발주 내역이 없습니다
          </div>
        }

        {
          orderList && orderList.map((item) => (
            <OrderItem key={item.callRef} item={item} />
          ))
        }

      </div>

      <Pagination
        activePage={page}
        itemsCountPerPage={1}
        totalItemsCount={totalPage}
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

export default Order;