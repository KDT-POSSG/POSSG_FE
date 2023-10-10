import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { ACCESS_TOKEN, baseURL } from 'store/apis/base';
import { addComma, dateString, deliveryStatus } from 'store/utils/function';
import { useNavigate, useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';
import DeliveryButton from './DeliveryButton';

function DeliveryList() {

  const activeSort = useOutletContext();
  const navi = useNavigate();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [deliveryList, setDeliveryList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {

    axios
      .get(`${baseURL}/convenienceDeliveryList`, {
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
    
  }, [page, activeSort, isUpdate]);

  const handlePage = (pageNumber) => {
    setPage(pageNumber);
  }

  const handleLink = (ref) => {
    console.log("ref >> ", ref);
    navi(`/delivery/${ref}`);
  }

  const handleOrderStatus = (e, ref) => {

    console.log("handleOrderStatus >> ", ref);
    e.stopPropagation();

    axios
      .post(`${baseURL}/statusUpdate`, {
        ref: ref
      }, {
        headers: {
          accessToken: `Bearer ${ACCESS_TOKEN}`,
        }
      })
      .then((response) => {
        console.log(response.data);

        if(response.data === "YES") {
          toast.success("배달 상태가 업데이트되었습니다");
          setIsUpdate(!isUpdate);
        }
        else {
          toast.error("배달 상태 업데이트에 실패했습니다");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("배달 상태 업데이트에 실패했습니다");
      })
  }

  const handleOrderCancel = (e, ref) => {

    console.log("handleOrderCancel >> ", ref);
    e.stopPropagation();

    axios
      .post(`${baseURL}/refuseDelivery`, {
        ref: ref
      }, {
        headers: {
          accessToken: `Bearer ${ACCESS_TOKEN}`,
        }
      })
      .then((response) => {
        console.log(response.data);

        if(response.data === "YES") {
          toast.success("배달 주문이 취소되었습니다");
          setIsUpdate(!isUpdate);
        }
        else {
          toast.error("배달 주문 취소에 실패했습니다");
        }
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
                    item.details.length > 2 ?
                    <div className='item-product-more'>
                      <div>…</div>
                    </div>
                    :
                    <></>
                  }

                </div>

              </div>

              <div className='item-bottom'>
                <DeliveryButton deliveryRef={item.ref} delStatus={item.delStatus} handleOrderStatus={handleOrderStatus} handleOrderCancel={handleOrderCancel} />
              </div>

            </div>
          ))
        }
      </div>

      <div className='delivery-paging'>
        {
          deliveryList && deliveryList.length > 0 ?
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
          :
          <></>
        }
      </div>
    </>
  )
}

export default DeliveryList;