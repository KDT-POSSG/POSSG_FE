import React, { useState } from 'react';

import Modal from '../components/Modal';
import Cardpay from '../components/payment/Cardpay'
import Cashpay from '../components/payment/Cashpay'
import Etcpay from '../components/payment/Etcpay'
import Discount from '../components/payment/Discount'
import Point from '../components/payment/Point'
import Division from '../components/payment/Division'
import CashpayReceipt from '../components/payment/CashpayReceipt';



function Payment() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [paymentType, setPaymentType] = useState(null);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);

    const openModal = (type) => {
        setPaymentType(type);
        setModalIsOpen(true);
       };
   
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handlePaymentComplete = () => {
        closeModal();
        setIsReceiptOpen(true);
    };

    const closeReceiptModal = () => {
        setIsReceiptOpen(false);
    };

    return (
        <div className="payment-container">
            <div className='payment-header'>
                <div className='page-title'>결제</div>
            </div>
            
            <div className='payment-body'>
                <div className='payment-list'>
                    <div className='payment-list-list'>
                        <div className='payment-list-row'>
                            <div className='payment-list-row-info'>
                                <div className='payment-list-name'>아메리카노</div>
                                <div className='payment-list-amount'>x 1</div>
                                <div className='payment-list-price'>2,500 원</div>
                            </div>
                            <div className='payment-list-discount-info'>
                                <div className='payment-list-discount'>할인</div>
                                <div className='payment-list-discount2'>-500 원</div>
                            </div>
                        </div>

                        <div className='payment-list-row'>
                            <div className='payment-list-row-info'>
                                <div className='payment-list-name'>바닐라 라떼</div>
                                <div className='payment-list-amount'>x 3</div>
                                <div className='payment-list-price'>10,500 원</div>
                            </div>
                            <div className='payment-list-discount-info'>
                                <div className='payment-list-discount'>정재원 할인</div>
                                <div className='payment-list-discount2'>-500 원</div>
                            </div>
                        </div>

                        <div className='payment-list-row'>
                            <div className='payment-list-row-info'>
                                <div className='payment-list-name'>프로틴 쉐이크</div>
                                <div className='payment-list-amount'>x 2</div>
                                <div className='payment-list-price'>8,000 원</div>
                            </div>
                            <div className='payment-list-discount-info'>
                                <div className='payment-list-discount'>할인</div>
                                <div className='payment-list-discount2'>-500 원</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='payment-list-result'>
                        <div className='payment-list-total'>총액</div>
                        <div className='payment-list-total2'>2000 원</div>
                    </div> 
                </div>

                <div className='payment-method-container'>
                    <div className='container'>
                        <div className='payment-total'>결제 금액</div>
                        <div className='payment-total-container'>
                            <div className='payment-total-price'>2,000 원</div>
                            <button className='payment-division-button' onClick={() => openModal('division')}>분할 결제</button>
                        </div>
                        <div className='payment-method-container2'>
                            <div className='payment-method-top'>
                                <button className='payment-method-discount' onClick={() => openModal('discount')}>할인 / 쿠폰</button>
                                <button className='payment-method-point' onClick={() => openModal('point')}>포인트</button>
                            </div>
                            <div className='payment-method-bottom'>
                                <button className='payment-method-cardpay' onClick={() => openModal('card')}>카드 결제</button>
                                <button className='payment-method-cashpay' onClick={() => openModal('cash')}>현금 결제</button>
                                <button className='payment-method-etcpay' onClick={() => openModal('etc')}>기타 결제</button>
                            </div>
                        </div>
                </div>
                </div>
            </div>
            
            <Modal isOpen={modalIsOpen} onClose={closeModal} style={{ content:{padding:'1.5rem',}}}>
            
                {paymentType === 'card' && <Cardpay />}
                {paymentType === 'cash' && <Cashpay onPaymentComplete={handlePaymentComplete} />}
                {paymentType === 'etc' && <Etcpay />}
                {paymentType === 'discount' && <Discount />}
                {paymentType === 'point' && <Point />}
                {paymentType === 'division' && <Division />}
            </Modal>

            <Modal isOpen={isReceiptOpen} onClose={closeReceiptModal} style={{ content: { width: '500px' } }}>
                <CashpayReceipt />
            </Modal>
        </div>
    )
}

export default Payment;