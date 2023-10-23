import React, { useState, useEffect } from "react";
import axios from "axios";
import { addComma } from "store/utils/function";

function CashpayReceiptInfoModal({
  paymentData,
  handlePaymentSuccess,
  closeModal,
}) {
  const [paymentdetail, setPaymentdetail] = useState([]);
  const accesstoken = localStorage.getItem("accesstoken");

  const handlePaymentComplete = () => {
    handlePaymentSuccess();
    closeModal();
  };

  // 단일 상세 결제내역 불러오는 함수
  useEffect(() => {
    axios
      .get("http://54.180.60.149:3000/paymentOneList", {
        params: { receiptId: paymentData.receiptId },
        headers: { accessToken: `Bearer ${accesstoken}` },
      })
      .then((response) => {
        setPaymentdetail(response.data);
        console.log("현금 결제내역 상세 불러오기 성공");
        console.log("페이먼트 데이터", response.data);
      })
      .catch((error) => {
        console.log("결제내역 상세 불러오기 실패:", error);
      });
  }, []);

  return (
    <div className="cashpayreceipt-1">
      <div className="cashpayreceipt-title">현금영수증</div>
      <div className="cashpayreceipt-header">
        {paymentdetail.param && (
          <>
            <div className="branch">
              [지점명] {paymentdetail.param.branchName}
            </div>
            <div className="branch-num">[사업자번호] 111-22-33333</div>
            <div className="branch-info">
              <div className="representative">
                [대표자] : {paymentdetail.param.representativeName}
              </div>
            </div>
            <div className="payment-date">
              [거래일시] {paymentdetail.param.purchasedAt}
            </div>
          </>
        )}
      </div>
      <div className="cashpayreceipt-body1">
        <div className="body1-info1">상품명</div>
        <div className="body1-info2">단가</div>
        <div className="body1-info3">수량</div>
        <div className="body1-info4">금액</div>
      </div>
      <div className="cashpayreceipt-body2">
        {paymentdetail.list &&
          paymentdetail.list.map((item) => (
            <div className="cashpayreceipt-body2-list">
              <div className="body2-info1">{item.itemName} </div>
              <div className="body2-info2">{addComma(item.price)}</div>
              <div className="body2-info3">{item.qty}</div>
              <div className="body2-info4">
                {addComma(item.price * item.qty)}
              </div>
            </div>
          ))}
      </div>
      {paymentdetail.param && (
        <>
          <div className="cashpayreceipt-body3">
            <div className="body3-totalprice">
              <div className="body3-info">총 상품 금액</div>
              <div className="body3-info">
                {addComma(
                  paymentdetail.param.price + paymentdetail.param.usePoint
                )}
              </div>
            </div>
            {paymentdetail.param.usePoint !== 0 && (
              <div className="body3-totalprice">
                <div className="body3-point">포인트</div>
                <div className="body3-point">
                  -{addComma(paymentdetail.param.usePoint)}
                </div>
              </div>
            )}
          </div>
          <div className="cashpayreceipt-body4">
            <div className="body4-top">
              <div className="body4-info1">과세 금액</div>
              <div className="body4-info2">
                {addComma(
                  paymentdetail.param.price -
                    Math.round((paymentdetail.param.price * 10) / 110)
                )}
              </div>
            </div>
            <div className="body4-top">
              <div className="body4-info1">부가세</div>
              <div className="body4-info2">
                {addComma(Math.round((paymentdetail.param.price * 10) / 110))}
              </div>
            </div>
          </div>
          <div className="cashpayreceipt-body5">
            <div className="body5-info">총 결제 금액</div>
            <div className="body5-info">
              {addComma(paymentdetail.param.price)}
            </div>
          </div>
          <div className="cashpayreceipt-footer">
            <div className="payment-type">
              [결제구분] {paymentdetail.param.method}
            </div>
            <div className="payment-num">
              [승인번호] {paymentdetail.param.receiptId}
            </div>
          </div>
        </>
      )}
      <div className="cashpayreceipt-footer2">
        <div className="call-number">전화 : 국번없이 126</div>
      </div>
    </div>
  );
}

export default CashpayReceiptInfoModal;
