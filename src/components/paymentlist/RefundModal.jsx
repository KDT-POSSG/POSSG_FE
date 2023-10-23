import Modal from "../ui/Modal";
import { useState } from "react";
import RefundConfirmModal from "./RefundConfirmModal";
import { addComma } from "store/utils/function";

function RefundModal({ closeModal, paymentlistdetail, setPaymentlistdetail }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  return (
    <div className="refund">
      <div className="refund-header">
        <div className="refund-header-title">환불</div>
      </div>

      <div className="refund-body">
        <div className="refund-body-content">
          {paymentlistdetail.list?.map((item, idx) => (
            <div key={idx} className="refund-body-content-row">
              <div className="refund-number">{idx + 1}</div>
              <div className="refund-name">
                {item.itemName} x {item.qty}
              </div>
              <div className="refund-price">
                {addComma(item.price * item.qty)} 원
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="refund-footer">
        <div className="refund-footer-row">
          <div className="refund-total-price">총 환불 금액</div>
          <div className="refund-total-price2">
            {addComma(paymentlistdetail.param.price)} 원
          </div>
        </div>
      </div>

      <div className="refund-button">
        <button className="refund-button-cancel" onClick={openModal}>
          환불
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        style={{ content: { width: "30%", height: "30%" } }}
      >
        <RefundConfirmModal
          paymentlistdetail={paymentlistdetail}
          setPaymentlistdetail={setPaymentlistdetail}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
}

export default RefundModal;
