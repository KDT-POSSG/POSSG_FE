import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { hourClock, orderState } from 'store/utils/function';

function OrderDetailNav({ callStatus, callRef, callDate }) {

  const accesstoken = localStorage.getItem("accesstoken");
  const convSeq = localStorage.getItem("convSeq");

  const navi = useNavigate();

  const handleOrderCancel = () => {

    axios
      .post("http://54.180.60.149:3000/cancelConvOrderList", {
        convSeq: convSeq,
        callRef: callRef
      }, {
        headers: {
          accessToken: `Bearer ${accesstoken}`
        }
      })
      .then((response) => {
        console.log(response.data);

        if(response.data === "YES") {
          toast("해당 발주가 취소되었습니다", {
            icon: <span className='tossface'>✏️</span>,
          });
          setTimeout(() => {
            navi("/ordercart");
            toast.remove();
            toast.success("상품이 발주 바구니로 이동되었습니다");
          }, 500);
        }
        else {
          toast.error("해당 발주 취소에 실패했습니다");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("해당 발주 취소에 실패했습니다");
      })
  }

  return (
    <div className='order-detail-middle'>
      <div>
        <div className={`order-status order-status-${callStatus}`}>{orderState(callStatus)}</div>

        <div className='number-date'>
          <div className='left'>
            <span>발주번호</span>
            &nbsp;&nbsp;&nbsp;{callRef}
          </div>
          <div className='right'>
            <span>발주날짜</span>
            {/* &nbsp;&nbsp;&nbsp;{callDate} */}
            &nbsp;&nbsp;&nbsp;{callRef.slice(0, 4)}-{callRef.slice(4, 6)}-{callRef.slice(6, 8)}&nbsp;{callRef.slice(8, 10)}:{callRef.slice(10, 12)}:{callRef.slice(12)}
          </div>
        </div>
      </div>

      <div>
        {
          callStatus === 1 ?
          <button className='order-cancel' onClick={handleOrderCancel}>발주 취소</button>
          :
          <></>
        }
      </div>

    </div>
  )
}

export default OrderDetailNav;