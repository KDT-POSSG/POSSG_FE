import Modal from "components/ui/Modal";
import CheckmarkComponent from "../ui/CheckMark";
import ReceiptModal from '../paymentlist/ReceiptModal'
import { addComma } from "store/utils/function";
import { useState } from "react";

function CashpayReceipt({ closeModal, inputValue, changeAmount, totalAmount, handlePaymentSuccess}){

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
                        <div className="cashpayreceipt-body-input-price">받은 금액</div>
                        <div className="cashpayreceipt-body-input-price2">{addComma(inputValue)} 원</div>
                    </div>
                    <div className="cashpayreceipt-change">
                        <div className="cashpayreceipt-body-change">거스름 돈</div>
                        <div className="cashpayreceipt-body-change2">{addComma(changeAmount)} 원</div>
                    </div>
                </div>
            </div>

            <div className="cashpayreceipt-buttons">
                <button className="cashpayreceipt-btn" onClick={openModal}>영수증 출력</button>
                <button className="cashpayreceipt-complete-btn" onClick={handlePaymentComplete}>확인</button>
            </div>

            <Modal openModal={openModal} closeModal={closeModal} style={{ content:{width:'70%', height:'auto', backgroundColor:'#fff', maxHeight:'40rem'  } }}>
                <ReceiptModal/>
            </Modal>
        </div>
    );
    
}

export default CashpayReceipt;  