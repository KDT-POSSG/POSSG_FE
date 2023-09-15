import Modal from '../Modal';
import { useState } from 'react';
import RefundConfirmModal from './RefundConfirmModal';

function RefundModal() {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (type) => {
        setModalIsOpen(true);
       };
    
    const closeModal = () => {
        setModalIsOpen(false);
        };

  return (
    <div className="refund">
        <div className="refund-header">
            <div className="refund-header-title">환불</div>
        </div>
        
        <div className="refund-body">
            <div className="refund-body-content">
                <div className="refund-body-content-row">
                    <div className="refund-number">1</div>
                    <div className="refund-name">모카 라떼</div>
                    <div className="refund-price">3,500원</div>
                </div>
                <div className="refund-body-content-row">
                    <div className="refund-number">2</div>
                    <div className="refund-name">바닐라 라떼</div>
                    <div className="refund-price">5,500원</div>
                </div>
                <div className="refund-body-content-row">
                    <div className="refund-number">2</div>
                    <div className="refund-name">바닐라 라떼</div>
                    <div className="refund-price">5,500원</div>
                </div>
                <div className="refund-body-content-row">
                    <div className="refund-number">2</div>
                    <div className="refund-name">바닐라 라떼</div>
                    <div className="refund-price">5,500원</div>
                </div>
                <div className="refund-body-content-row">
                    <div className="refund-number">2</div>
                    <div className="refund-name">바닐라 라떼</div>
                    <div className="refund-price">5,500원</div>
                </div>
                <div className="refund-body-content-row">
                    <div className="refund-number">2</div>
                    <div className="refund-name">바닐라 라떼</div>
                    <div className="refund-price">5,500원</div>
                </div>
                <div className="refund-body-content-row">
                    <div className="refund-number">2</div>
                    <div className="refund-name">바닐라 라떼</div>
                    <div className="refund-price">5,500원</div>
                </div>
                <div className="refund-body-content-row">
                    <div className="refund-number">2</div>
                    <div className="refund-name">바닐라 라떼</div>
                    <div className="refund-price">5,500원</div>
                </div>
            </div>
        </div>

        <div className="refund-footer">
            <div className="refund-footer-row">
                <div className="refund-total-price">총 환불 금액</div>
                <div className="refund-total-price2">3,500원</div>
            </div>
        </div>

        <div className="refund-button">
            <button className="refund-button-cancel" onClick={ openModal }>환불</button>
        </div>
    
        <Modal isOpen={modalIsOpen} onClose={ closeModal } style={{ content:{width:'30%',height:'30%' } }}>
                <RefundConfirmModal closeModal={ closeModal }/>
        </Modal>
    </div>
  );
}

export default RefundModal;