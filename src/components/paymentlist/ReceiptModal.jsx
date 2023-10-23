import { addComma } from "store/utils/function";

// 현금과 카드 결제 영수증을 구분하여 렌더링
function ReceiptModal({ paymentlistdetail, paymentData }) {
  console.log(paymentlistdetail);

  return (
    <>
      {paymentlistdetail.param.method === "현금" ? (
        <div className="cashpayreceipt-1">
          <div className="cashpayreceipt-title">현금영수증</div>
          <div className="cashpayreceipt-header">
            {paymentlistdetail.param && (
              <>
                <div className="branch">
                  [지점명] {paymentlistdetail.param.branchName}
                </div>
                <div className="branch-num">[사업자번호] 111-22-33333</div>
                <div className="branch-info">
                  <div className="representative">
                    [대표자] : {paymentlistdetail.param.representativeName}
                  </div>
                </div>
                <div className="payment-date">
                  [거래일시] {paymentlistdetail.param.purchasedAt}
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
            {paymentlistdetail.list &&
              paymentlistdetail.list.map((item) => (
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

          {paymentlistdetail.param && (
            <>
              <div className="cashpayreceipt-body3">
                <div className="body3-totalprice">
                  <div className="body3-info">총 상품 금액</div>
                  <div className="body3-info">
                    {addComma(
                      paymentlistdetail.param.price +
                        paymentlistdetail.param.usePoint
                    )}
                  </div>
                </div>
                {paymentlistdetail.param.usePoint !== 0 && (
                  <div className="body3-totalprice">
                    <div className="body3-point">포인트</div>
                    <div className="body3-point">
                      -{addComma(paymentlistdetail.param.usePoint)}
                    </div>
                  </div>
                )}
              </div>

              <div className="cashpayreceipt-body4">
                <div className="body4-top">
                  <div className="body4-info1">과세 금액</div>
                  <div className="body4-info2">
                    {addComma(
                      paymentlistdetail.param.price -
                        Math.round((paymentlistdetail.param.price * 10) / 110)
                    )}
                  </div>
                </div>
                <div className="body4-top">
                  <div className="body4-info1">부가세</div>
                  <div className="body4-info2">
                    {addComma(
                      Math.round((paymentlistdetail.param.price * 10) / 110)
                    )}
                  </div>
                </div>
              </div>

              <div className="cashpayreceipt-body5">
                <div className="body5-info">총 결제 금액</div>
                <div className="body5-info">
                  {addComma(paymentlistdetail.param.price)}
                </div>
              </div>

              <div className="cashpayreceipt-footer">
                <div className="payment-type">
                  [결제구분] {paymentlistdetail.param.method}
                </div>
                <div className="payment-num">
                  [승인번호] {paymentlistdetail.param.receiptId}
                </div>
              </div>
            </>
          )}
          <div className="cashpayreceipt-footer2">
            <div className="call-number">전화 : 국번없이 126</div>
          </div>
        </div>
      ) : (
        <div className="payreceipt">
          <iframe
            className="payreceipt-iframe"
            src={paymentlistdetail.param.receiptUrl}
            width="100%"
            height="790px"
          ></iframe>
        </div>
      )}
    </>
  );
}

export default ReceiptModal;
