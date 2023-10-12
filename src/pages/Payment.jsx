import React, { useState, useRef} from 'react';
import axios from 'axios';
import Modal from '../components/ui/Modal';
import Cashpay from '../components/payment/Cashpay'
import Etcpay from '../components/payment/Etcpay'
import Discount from '../components/payment/Discount'
import Point from '../components/payment/Point'
import CashpayReceipt from '../components/payment/CashpayReceipt';
import PaymentReceipt from 'components/payment/PaymentReceipt';
import { handlePayment } from 'store/utils/easypay.js';
import { addComma } from 'store/utils/function.js';
import { toast } from 'react-hot-toast';



function Payment() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [paymentType, setPaymentType] = useState(null);
    const [paymentResponse, setPaymentResponse] = useState(null);
    const [barcodeInput, setBarcodeInput] = useState("");
    const [products, setProducts] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [changeAmount, setChangeAmount] = useState(0);
    const barcodeInputRef = useRef(null);
    const accesstoken = localStorage.getItem("accesstoken");

    
    // input에 바코드가 제대로 입력됐는지 확인
    const handleBarcode = () => {
        const barcodeInput = barcodeInputRef.current.value;
        if(!barcodeInput) {
            toast.error("바코드 인식 에러");
            return;
        }
        axios.get('http://54.180.60.149:3000/findProductBarcode', {params: {Barcode: barcodeInput, convSeq: 1}, headers:{ accessToken: `Bearer ${accesstoken}`}})
        .then((res) => {
            const productData = res.data;
            const existingProduct = products.find(p => p.productSeq === productData.productSeq); 
            //현재 상품의 시퀀스와 들어오는 상품의 시퀀스가 같으면 상품의 수량을 1개씩 더해줌
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
                setProducts(prevProducts => [...prevProducts, productData]); //그렇지 않으면 상품 1개로 
            }
        })
        .catch((err) => {
            console.log(err);
            toast.error('상품을 찾을 수 없습니다.');
        })
        setBarcodeInput("");
    }

    //결제 완료 후, 결제 상품 목록 초기화
    
    // 총 결제 금액 계산
    const getTotalAmount = () => {
        return products.reduce((total, product) => {
            return total + (product.priceDiscount) * product.amount;
        }, 0);
    };
    

     //결제 함수 시작
     const startPayment = async (pgType) => {
        try {
            const totalAmount = getTotalAmount();
            await handlePayment(pgType, totalAmount, products, setPaymentResponse, openModal);
        } catch (error) {
            console.error("Payment failed:", error);
        }
    };
    
    const handlePaymentSuccess = () => {
        setProducts([]);
        setInputValue("");
        setChangeAmount(0);
    };
    

    //모달창 열고 닫기
    const openModal = (type) => {
        setPaymentType(type);
        setModalIsOpen(true);
       };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    //paymentType에 따라 모달창의 크기를 다르게 설정, 결제 영수증 모달의 넓이 조절을 위해 추가함
    const getModalStyle = () => {
        if (paymentType === 'cashpayreceipt' || paymentType === 'paymentreceipt') {
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
    
   

    return (
        // payment-container를 클릭하면 바코드 입력창에 포커스가 가도록 함 (사용자가 다른 곳을 클릭했을 때 input창에 포커스가 해제되는 것 방지용)
        <div className="payment-container" onClick={() => barcodeInputRef.current.focus()}>
            <div className='payment-header'>
                <div className='page-title'>결제</div>
                <input ref={barcodeInputRef} className='input-barcode' placeholder='여기에 바코드를 입력' value={barcodeInput} 
                    onChange={(e) => setBarcodeInput(e.target.value)} autoFocus onKeyDown={(e) => { if (e.key === 'Enter') {handleBarcode();}}}/>


            </div>
            
            <div className='payment-body'>
                <div className='payment-list'>
                    <div className='payment-list-list'>
                    {products.length === 0 ? (
                        <div className='payment-list-empty-container'>
                            <span class="material-symbols-rounded">barcode</span>
                            <div className='payment-list-empty'>바코드를 스캔해주세요.</div>
                        </div>
                        ) : (
                            products.map(product => (
                                <div className='payment-list-row' key={product.productSeq}>
                                    <div className='payment-list-row-info'>
                                        <div className='payment-list-name'>{product.productName}</div>
                                        <div className='payment-list-amount'>x {product.amount}</div>
                                        <div className='payment-list-price'>{addComma(product.price * product.amount)} 원</div>
                                    </div>

                                    {/* 할인율이 0이 아닐 때만 할인 정보를 보여줌 */}
                                    {product.discountRate !== 0.0 && (
                                    <div className='payment-list-discount-info'>
                                        <div className='payment-list-discount'>할인</div>
                                        <div className='payment-list-discount2'>-{addComma((product.price - product.priceDiscount) * product.amount)} 원</div>
                                    </div>
                                    )}
                                </div>
                            ))
                        )}
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
                            <button className='payment-method-cash' onClick={() => openModal('cash')}>현금 결제</button>
                        </div>
                        <div className='payment-method-container2'>
                            <div className='payment-method-top'>
                                <button className='payment-method-discount' onClick={() => openModal('discount')}>X</button>
                                <button className='payment-method-point' onClick={() => openModal('point')}>포인트</button>
                            </div>
                            <div className='payment-method-bottom'>
                                <button className='payment-method-tosspay' onClick={() => startPayment("토스")}>토스페이 결제</button>
                                <button className='payment-method-kakaopay' onClick={() => startPayment("카카오")}>카카오 결제</button>
                                <button className='payment-method-etcpay'>X</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

            <Modal isOpen={modalIsOpen} onClose={closeModal} style={getModalStyle()}>
            {paymentType === 'cash' && 
                <Cashpay 
                    openModal={openModal} 
                    closeModal={closeModal} 
                    totalAmount={getTotalAmount()} 
                    products={products}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    changeAmount={changeAmount}
                    setChangeAmount={setChangeAmount}
                />}
            {paymentType === 'cashpayreceipt' && 
                <CashpayReceipt 
                    closeModal={closeModal} 
                    totalAmount={getTotalAmount()} 
                    inputValue={inputValue}
                    changeAmount={changeAmount}
                    handlePaymentSuccess={handlePaymentSuccess}
                />} 
            {paymentType === 'paymentreceipt' && 
                    <PaymentReceipt
                    openModal={openModal}
                    closeModal={closeModal}
                    totalAmount={getTotalAmount()}
                    handlePaymentSuccess={handlePaymentSuccess}
                    paymentResponse={paymentResponse}
                />}
            {paymentType === 'etc' && <Etcpay />}
            {paymentType === 'discount' && <Discount />}
            {paymentType === 'point' && <Point />}
        </Modal>

        </div>
    )
}

export default Payment;