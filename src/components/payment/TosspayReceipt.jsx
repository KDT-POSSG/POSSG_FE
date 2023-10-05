import CheckmarkComponent from "../CheckMark";
import { addComma  } from "store/utils/function";
import { useState } from "react";
import Modal from "../Modal";
import TosspayReceiptInfoModal from "./TosspayReceiptInfoModal"


function TosspayReceipt({  closeModal, totalAmount, paymentResponse, handlePaymentSuccess }){

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
       };

    const handlePaymentComplete = () => {
        handlePaymentSuccess();
        closeModal();
    }
    
   

    return(
        <div className="cashpayreceipt">
            <div className="cashpayreceipt-header">
                <div className="cashpayreceipt-header-title">결제 완료</div>
            </div>

            <div className="cashpayreceipt-body">
                <div className="cashpayreceipt-body-top">
                    <CheckmarkComponent />
                    <div className="cashpayreceipt-body-top-title">결제 완료</div>
                    <div className="cashpayreceipt-body-top-text">현금 결제가 완료되었습니다.</div>
                </div>
                <div className="cashpayreceipt-body-middle">
                    <div className="cashpayreceipt-body-middle-price">결제 금액</div>
                    <div className="cashpayreceipt-body-middle-price2">{addComma(totalAmount)} 원</div>
                </div>
                <div className="cashpayreceipt-body-bottom">
                    <div className="cashpayreceipt-input-price">
                        <div className="cashpayreceipt-body-input-price">부가세</div>
                        <div className="cashpayreceipt-body-input-price2">{addComma(Math.round(totalAmount*10/110))} 원</div>
                    </div>
                    <div className="cashpayreceipt-change">
                        <div className="cashpayreceipt-body-change">과세 금액</div>
                        <div className="cashpayreceipt-body-change2">{addComma(totalAmount -(Math.round(totalAmount*10/110)))} 원</div>
                    </div>
                </div>
            </div>

            <div className="cashpayreceipt-buttons">
                <button className="cashpayreceipt-btn" onClick={openModal}>영수증 보기</button>
                <button className="cashpayreceipt-complete-btn" onClick={handlePaymentComplete}>확인</button>
            </div>

            <Modal isOpen={modalIsOpen} onClose={ closeModal }>
                <TosspayReceiptInfoModal receiptURL={paymentResponse}/>
            </Modal>
        </div>
    );
    
}

export default TosspayReceipt;  