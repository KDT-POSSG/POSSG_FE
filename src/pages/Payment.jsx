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
            <div className="product-list">
                <h1 className='page-title'>결제 목록</h1>
                <h3 className='total-product'>총 ??개</h3>
            </div> 
            <div className="payment-method">
                <div className='payment-method-top'>
                    <h2 className='total-payment'>총 결제금액  ???원</h2>
                    <button className='division-payment-btn' onClick={() => openModal('division')}>분할 결제</button>
                </div>
                <div className='membership-btn-container'>
                     <button className='payment-btn discount-coupon-btn' onClick={() => openModal('discount')}>할인 / 쿠폰</button>
                     <button className='payment-btn point-btn' onClick={() => openModal('point')}>포인트 / 회원</button>
                 </div>
                <div className='payment-method-btn-container'>
                      <button className='payment-btn card-payment-btn' onClick={() => openModal('card')}>💳<br/>카드 결제</button>
                      <button className='payment-btn cash-payment-btn' onClick={() => openModal('cash')}>💵<br/>현금 결제</button>
                      <button className='payment-btn etc-payment-btn' onClick={() => openModal('etc')}>🏧<br/>기타 결제</button>
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