import CheckmarkComponent from "../ui/CheckMark";
import { addComma } from "store/utils/function";
import { useState } from "react";
import Modal from "../ui/Modal";
import PaymentReceiptInfoModal from "./PaymentReceiptInfoModal";

//카드 , 간편 결제 영수증 컴포넌트
function PaymentReceipt({
  closeModal,
  totalDiscountPrice,
  usepoint,
  paymentResponse,
  handlePaymentSuccess,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  //결제 완료 후처리
  const handlePaymentComplete = () => {
    handlePaymentSuccess();
    closeModal();
  };

  //영수증 보기
  const handleCheckReceipt = () => {
    setModalType("paymentreceiptmodal");
    openModal();
  };

  const paymentAmount = parseInt(totalDiscountPrice) - parseInt(usepoint);

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
            결제가 완료되었습니다.
          </div>
        </div>
        <div className="cashpayreceipt-body-middle">
          <div className="cashpayreceipt-body-middle-price">결제 금액</div>
          <div className="cashpayreceipt-body-middle-price2">
            {addComma(paymentAmount)} 원
          </div>
        </div>
        <div className="cashpayreceipt-body-bottom">
          <div className="cashpayreceipt-input-price">
            <div className="cashpayreceipt-body-input-price">부가세</div>
            <div className="cashpayreceipt-body-input-price2">
              {addComma(Math.round((paymentAmount * 10) / 110))} 원
            </div>
          </div>
          <div className="cashpayreceipt-change">
            <div className="cashpayreceipt-body-change">과세 금액</div>
            <div className="cashpayreceipt-body-change2">
              {addComma(paymentAmount - Math.round((paymentAmount * 10) / 110))}{" "}
              원
            </div>
          </div>
        </div>
      </div>

      <div className="cashpayreceipt-buttons">
        <button className="cashpayreceipt-btn" onClick={handleCheckReceipt}>
          영수증 보기
        </button>
        <button
          className="cashpayreceipt-complete-btn"
          onClick={handlePaymentComplete}
        >
          확인
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        style={{ content: { width: "40%" } }}
      >
        {modalType === "paymentreceiptmodal" && (
          <PaymentReceiptInfoModal receiptURL={paymentResponse} />
        )}
      </Modal>
    </div>
  );
}

export default PaymentReceipt;
