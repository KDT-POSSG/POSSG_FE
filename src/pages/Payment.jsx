import React, { useState } from 'react';

import Modal from '../components/Modal';
import Cardpay from '../components/payment/Cardpay'
import Cashpay from '../components/payment/Cashpay'
import Etcpay from '../components/payment/Etcpay'
import Discount from '../components/payment/Discount'
import Point from '../components/payment/Point'
import Division from '../components/payment/Division'




function Payment() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [paymentType, setPaymentType] = useState(null);

    const openModal = (type) => {
        setPaymentType(type);
        setModalIsOpen(true);
       };
   
       const closeModal = () => {
       setModalIsOpen(false);
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
                                <div className='payment-list-amount'>x1</div>
                                <div className='payment-list-price'>2,500 원</div>
                            </div>
                            <div className='payment-list-discount-info'>
                                <div className='payment-list-discount'>할인</div>
                                <div className='payment-list-discount2'>-500 원</div>
                            </div>
                        </div>

                        <div className='payment-list-row'>
                            <div className='payment-list-row-info'>
                                <div className='payment-list-name'>아메리카노</div>
                                <div className='payment-list-amount'>x1</div>
                                <div className='payment-list-price'>2,500 원</div>
                            </div>
                            <div className='payment-list-discount-info'>
                                <div className='payment-list-discount'>할인</div>
                                <div className='payment-list-discount2'>-500 원</div>
                            </div>
                        </div>

                        <div className='payment-list-row'>
                            <div className='payment-list-row-info'>
                                <div className='payment-list-name'>아메리카노</div>
                                <div className='payment-list-amount'>x1</div>
                                <div className='payment-list-price'>2,500 원</div>
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
                    <div className='payment-total'>결제 금액</div>
                    <div className='payment-total-container'>
                        <div className='payment-total-price'>2,000 원</div>
                        <button className='payment-division-button' onClick={() => openModal('division')}>분할 결제</button>
                    </div>
                    <div className='payment-method-container'>
                        <div className='payment-method-top'>
                            <button className='payment-method-discount' onClick={() => openModal('discount')}>할인/ 쿠폰</button>
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
            
            <Modal isOpen={modalIsOpen} onClose={closeModal}>
                {paymentType === 'card' && <Cardpay />}
                {paymentType === 'cash' && <Cashpay />}
                {paymentType === 'etc' && <Etcpay />}
                {paymentType === 'discount' && <Discount />}
                {paymentType === 'point' && <Point />}
                {paymentType === 'division' && <Division />}
            </Modal>
        </div>
    )
}

export default Payment;