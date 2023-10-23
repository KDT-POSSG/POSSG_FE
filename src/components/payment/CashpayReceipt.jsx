import CheckmarkComponent from "../ui/CheckMark";
import { addComma } from "store/utils/function";

function CashpayReceipt({
  openModal,
  closeModal,
  inputValue,
  changeAmount,
  totalDiscountPrice,
  handlePaymentSuccess,
  usepoint,
}) {
  //결제 완료 후처리
  const handlePaymentComplete = () => {
    handlePaymentSuccess();
    closeModal();
  };

  const handleCashReceipt = () => {
    openModal("cashpayreceiptinfomodal");
  };

  return (
    <div className="cashpayreceipt">
      <div className="cashpayreceipt-header">
        <div className="cashpayreceipt-header-title">결제 완료</div>
      </div>

      <div className="cashpayreceipt-body">
        <div className="cashpayreceipt-body-top">
          <CheckmarkComponent />
          <div className="cashpayreceipt-body-top-title">결제 완료</div>
          <div className="cashpayreceipt-body-top-text">
            현금 결제가 완료되었습니다.
          </div>
        </div>
        <div className="cashpayreceipt-body-middle">
          <div className="cashpayreceipt-body-middle-price">결제 금액</div>
          <div className="cashpayreceipt-body-middle-price2">
            {addComma(parseInt(totalDiscountPrice) - parseInt(usepoint))} 원
          </div>
        </div>
        <div className="cashpayreceipt-body-bottom">
          <div className="cashpayreceipt-input-price">
            <div className="cashpayreceipt-body-input-price">받은 금액</div>
            <div className="cashpayreceipt-body-input-price2">
              {addComma(inputValue)} 원
            </div>
          </div>
          <div className="cashpayreceipt-change">
            <div className="cashpayreceipt-body-change">거스름 돈</div>
            <div className="cashpayreceipt-body-change2">
              {addComma(changeAmount)} 원
            </div>
          </div>
        </div>
      </div>

      <div className="cashpayreceipt-buttons">
        <button className="cashpayreceipt-btn" onClick={handleCashReceipt}>
          영수증 확인
        </button>
        <button
          className="cashpayreceipt-complete-btn"
          onClick={handlePaymentComplete}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default CashpayReceipt;
