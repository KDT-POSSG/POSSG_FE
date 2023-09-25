import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import Cashpay from '../components/payment/Cashpay'
import Etcpay from '../components/payment/Etcpay'
import Discount from '../components/payment/Discount'
import Point from '../components/payment/Point'
import CashpayReceipt from '../components/payment/CashpayReceipt';
import { handlePayment } from 'store/utils/cardpay.js';
import { addComma } from 'store/utils/function.js';
import { toast } from 'react-hot-toast';



function Payment() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [paymentType, setPaymentType] = useState(null);
    const [paymentResponse, setPaymentResponse] = useState(null);
    const [barcodeInput, setBarcodeInput] = useState("");
    const [products, setProducts] = useState([]);

    

    const handleBarcode = () => {
        const barcodeInput = document.querySelector('.input-barcode').value;
        if(!barcodeInput) {
            toast.error("바코드 인식 에러");
            return;
        }
    
        axios.get('http://10.10.10.140:3000/findProductBarcode', {params: {Barcode: barcodeInput, convSeq: 1}})
        .then((res) => {
            const productData = res.data;
            const existingProduct = products.find(p => p.productSeq === productData.productSeq);
    
            if (existingProduct) {
                setProducts(prevProducts => {
                    return prevProducts.map(p => {
                        if (p.productSeq === productData.productSeq) {
                            return { ...p, amount: p.amount + 1 };
                        }
                        return p;
                    });
                });
            } else {
                productData.amount = 1;
                setProducts(prevProducts => [...prevProducts, productData]);
            }
    
        })
        .catch((err) => {
            console.log(err);
            toast.error('상품을 찾을 수 없습니다.');
        })
        setBarcodeInput("");
    }

    const getTotalAmount = () => {
        return products.reduce((total, product) => {
            return total + (product.priceDiscount) * product.amount;
        }, 0);
    };
    


    const startPayment = async () => {
        await handlePayment(setPaymentResponse);
    };

    const openModal = (type) => {
        setPaymentType(type);
        setModalIsOpen(true);
       };
   
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const getModalStyle = () => {
        if (paymentType === 'receipt') {
            return {
                content: {
                    padding: '1.5rem',
                    width: '500px',  // CashpayReceipt 모달의 넓이를 설정
                },
            };
        }
        return {
            content: {
                padding: '1.5rem',
            },
        };
    };
    

    /* 사용자가 어느부분을 클릭해도 INPUT에 포커스 되도록 하는 함수 구현 해야 함 */
   

    return (
        <div className="payment-container">
            <div className='payment-header'>
                <div className='page-title'>결제</div>
                <input className='input-barcode' placeholder='여기에 바코드를 입력' value={barcodeInput} onChange={(e) => setBarcodeInput(e.target.value)} 
                    autoFocus onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleBarcode();
                        } }}/>


            </div>
            
            <div className='payment-body'>
                <div className='payment-list'>
                    <div className='payment-list-list'>
                       
                        {products.map(product => (
                            <div className='payment-list-row' key={product.productSeq}>
                                <div className='payment-list-row-info'>
                                    <div className='payment-list-name'>{product.productName}</div>
                                    {/*  <div className='payment-list-amount'>x {product.amount}</div>  amount 사용하면 안됨 수정*/}
                                    <div className='payment-list-price'>{addComma(product.price * product.amount)} 원</div>
                                </div>
                                <div className='payment-list-discount-info'>
                                    <div className='payment-list-discount'>할인</div>
                                    <div className='payment-list-discount2'>-{addComma((product.price - product.priceDiscount) * product.amount)} 원</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    
                    <div className='payment-list-result'>
                        <div className='payment-list-total'>총액</div>
                        <div className='payment-list-total2'>{addComma(getTotalAmount())} 원</div>
                    </div> 
                </div>

                <div className='payment-method-container'>
                    <div className='container'>
                        <div className='payment-total'>결제 금액</div>
                        <div className='payment-total-container'>
                            <div className='payment-total-price'>{addComma(getTotalAmount())} 원</div>
                            <button className='payment-division-button' onClick={() => openModal('cash')}>현금 결제</button>
                        </div>
                        <div className='payment-method-container2'>
                            <div className='payment-method-top'>
                                <button className='payment-method-discount' onClick={() => openModal('discount')}>할인 / 쿠폰</button>
                                <button className='payment-method-point' onClick={() => openModal('point')}>포인트</button>
                            </div>
                            <div className='payment-method-bottom'>
                                <button className='payment-method-cardpay' onClick={startPayment}>토스페이 결제</button>
                                <button className='payment-method-cashpay' onClick={() => openModal('cash')}></button>
                                <button className='payment-method-etcpay'>테스트</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

            <Modal isOpen={modalIsOpen} onClose={closeModal} style={getModalStyle()}>
                {paymentType === 'cash' && <Cashpay openModal={openModal} closeModal={closeModal} totalAmount={getTotalAmount()}/>}
                {paymentType === 'receipt' && <CashpayReceipt closeModal={closeModal}/>} 
                {paymentType === 'etc' && <Etcpay />}
                {paymentType === 'discount' && <Discount />}
                {paymentType === 'point' && <Point />}
            </Modal>

        </div>
    )
}

export default Payment;