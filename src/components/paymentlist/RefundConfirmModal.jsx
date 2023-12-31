import axios from "axios";
import toast from "react-hot-toast";

function RefundConfirmModal({
  closeModal,
  paymentlistdetail,
  setPaymentlistdetail,
}) {
  const accesstoken = localStorage.getItem("accesstoken");

  const Refund = () => {
    axios
      .post("http://54.180.60.149:3000/cancelpayment", null, {
        params: { receiptId: paymentlistdetail.param.receiptId },
        headers: { accessToken: `Bearer ${accesstoken}` },
      })
      .then((response) => {
        console.log("환불 성공");
        toast.success("환불이 완료되었습니다");
        closeModal();
        const updatePaymentlistdetail = { ...paymentlistdetail };
        updatePaymentlistdetail.param.del = "결제 취소";
        setPaymentlistdetail(updatePaymentlistdetail);
      })
      .catch((error) => {
        console.log("환불 실패:", error);
        toast.error("환불에 실패하였습니다");
      });
  };

  return (
    <div className="refund-confirm-modal">
      <div className="refund-confirm-title">환불</div>
      <div className="refund-confirm-msg">환불 하시겠습니까?</div>
      <div className="refund-confirm-button">
        <button className="refund-confirm-button1" onClick={closeModal}>
          취소
        </button>
        <button className="refund-confirm-button2" onClick={Refund}>
          확인
        </button>
      </div>
    </div>
  );
}

export default RefundConfirmModal;
