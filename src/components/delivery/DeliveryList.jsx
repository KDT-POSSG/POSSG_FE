import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { ACCESS_TOKEN, baseURL } from 'store/apis/base';
import { addComma, dateString, deliveryStatus } from 'store/utils/function';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

function DeliveryList() {

  const activeSort = useOutletContext();
  const navi = useNavigate();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [deliveryList, setDeliveryList] = useState([]);

  useEffect(() => {

    axios
      .get("http://54.180.60.149:3000/convenienceDeliveryList", {
        params: {
          pageNumber: page - 1,
          orderStatus: activeSort
        },
        headers: {
          accessToken: `Bearer ${ACCESS_TOKEN}`,
        }
      })
      .then((response) => {
        console.log(response.data);
        setDeliveryList(response.data.DeliveryList);
        setTotalPage(response.data.AllPage);
      })
      .catch((error) => {
        console.error(error);
      })
    
  }, [page, activeSort]);

  const handlePage = (pageNumber) => {
    setPage(pageNumber);
  }

  const handleLink = (ref) => {
    navi(`/delivery/${ref}`);
  }

  const handleOrderStatus = () => {

    axios
      .post(`${baseURL}/statusUpdate`, null, {
        headers: {
          accessToken: `Bearer ${ACCESS_TOKEN}`,
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const handleOrderCancel = () => {

    axios
      .post(`${baseURL}/refuseDelivery`, null, {
        headers: {
          accessToken: `Bearer ${ACCESS_TOKEN}`,
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  return (
    <>
      <div className='delivery-list-container'>
        {
          deliveryList && deliveryList.map((item) => (
            <div className='delivery-list-item' key={item.ref} onClick={() => handleLink(item.ref)}>

              <div className='item-top'>
                <div className='convenience-name'>emart24</div>
                <div className='delivery-time'>{dateString(item.delDate)}</div>
              </div>

              <div className='item-middle'>

                <div className='total-price'>{addComma(item.delTotalPrice)} 원</div>

                <div className='item-product-container'>

                  {
                    item.details.slice(0, 3).map((product) => (
                      <div className='item-product' key={product.product_seq}>
                        <div className='product-name'>{product.product_name}</div>
                        <div className='product-quantity'>{product.quantity}</div>
                      </div>
                    ))
                  }
                  {
                    item.details.length > 3 ?
                    <div className='item-product-more'>
                      <div>…</div>
                    </div>
                    :
                    <></>
                  }

                </div>

              </div>

              <div className='item-bottom'>
                <button className='receipt-btn'>{deliveryStatus(item.orderStatus)}</button>
                {
                  item.orderStatus === 1 ? 
                  <button className='cancel-btn'>주문취소</button>
                  :
                  <></>
                }
              </div>

            </div>
          ))
        }
      </div>

      <div className='delivery-paging'>
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
    </>
  )
}

export default DeliveryList;