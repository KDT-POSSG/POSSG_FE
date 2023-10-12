import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ACCESS_TOKEN, baseURL } from 'store/apis/base';
import { addComma, dateString, deliveryStatus } from 'store/utils/function';
import DeliveryButton from './DeliveryButton';
import toast from 'react-hot-toast';

function DeliveryDetail() {

  const { ref } = useParams();
  const navi = useNavigate();

  const [deliveryDetail, setDeliveryDetail] = useState({});
  // const [isDetailUpdate, setIsDetailUpdate] = useState(false);

  useEffect(() => {

    axios
      .get(`${baseURL}/allDeliveryList`, {
        params: {
          ref: ref
        },
        headers: {
          accessToken: `Bearer ${ACCESS_TOKEN}`,
        }
      })
      .then((response) => {
        console.log(response.data);
        setDeliveryDetail(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
    
  }, []);

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
          // setIsDetailUpdate(!isDetailUpdate);
          navi("/delivery");
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
          // setIsDetailUpdate(!isDetailUpdate);
          navi("/delivery");
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
    <div className='delivery-detail-page'>

      <div className='delivery-detail'>

        <div className='item-top'>
          <div>emart24</div>
          <div>{deliveryDetail.delDate && dateString(deliveryDetail.delDate)}</div>
        </div>

        <div className='item-middle'>

          <div className='item-info'>
            <div className='total-price'>{addComma(deliveryDetail.delTotalPrice)} 원</div>

            <div className='delivery-ref'>
              <span>주문번호</span>
              {deliveryDetail.ref}
            </div>
            <div className='delivery-location'>
              <span>주소</span>
              {deliveryDetail.location}
            </div>
            <div className='delivery-ref'>
              <span>요청사항</span>
              {deliveryDetail.delRemark}
            </div>
          </div>

          <div className='item-product-container'>

            <div className='item-product item-index'>
              <div>상품명</div>
              <div>단가</div>
              <div>수량</div>
              <div>금액</div>
            </div>

            {
              deliveryDetail.details && deliveryDetail.details.map((item) => (
                <div className='item-product' key={item.product_seq}>
                  <div className='item-product-name'>
                    {item.product_name}
                  </div>
                  <div>{addComma(item.price)}</div>
                  <div>{addComma(item.quantity)}</div>
                  <div>{addComma(item.price * item.quantity)}</div>
                </div>
              ))
            }

          </div>
        </div>

        <div className='item-bottom'>
          <DeliveryButton 
            deliveryRef={deliveryDetail.ref} 
            delStatus={deliveryDetail.delStatus} 
            handleOrderStatus={handleOrderStatus} 
            handleOrderCancel={handleOrderCancel} 
          />
        </div>

      </div>
      
    </div>
  )
}

export default DeliveryDetail;