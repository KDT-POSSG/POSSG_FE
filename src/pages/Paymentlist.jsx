import axios from "axios";
import { useEffect, useState } from "react";
import Modal from '../components/Modal';
import ReceiptModal from '../components/paymentlist/ReceiptModal'
import RefundModal from "../components/paymentlist/RefundModal";
import { addComma } from "store/utils/function";
import { ACCESS_TOKEN } from "store/apis/base";

function Paymentlist()  {
  
    const [paymentlistdetail, setPaymentlistdetail] = useState([]);
    const [paymentlist, setPaymentlist] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [paymentlistType, setPaymentListType] = useState(null);


    const openModal = (type) => {
        setPaymentListType(type);
        setModalIsOpen(true);
    };

    const closeModal = () => {
    setModalIsOpen(false);
    };


    // 전체 결제내역을 불러오는 함수
    const getPaymentList = () => {
        axios.get('http://54.180.60.149:3000/paymentlist', { params: { convSeq: 1 }, 
        headers : { 
            accessToken: `Bearer ${ACCESS_TOKEN}`
        }})
        .then((response) => {
            setPaymentlist(response.data.list);
            console.log('결제내역 불러오기 성공');
        })
        .catch((error) => {
            console.log('결제내역 불러오기 실패:', error);
        });
    };

    // 단일 상세 결제내역 불러오는 함수
    const getPaymentListDetail = (receiptId) => {
        axios.get('http://54.180.60.149:3000/paymentOneList', { params: { receiptId : receiptId },
        headers : { 
            accessToken: `Bearer ${ACCESS_TOKEN}`
        }})
        .then((response) => {
            setPaymentlistdetail(response.data);
            console.log('결제내역 상세 불러오기 성공');
            
        })
        .catch((error) => {
            console.log('결제내역 상세 불러오기 실패:', error);
        });
    };

    useEffect(() => {
        getPaymentList();
    }, []);
  
  
    return (
        <div className="paymentlist">
            <div className="paymentlist-container">
                <div className="paymentlist-menu">
                    <div className="paymentlist-title page-title">
                        결제 내역
                    </div>
                    <div className="paymentlist-search">
                        <input className="paymentlist-search-input" type="text" placeholder="카드번호 앞 6자리"></input>
                        <button className="paymentlist-search-btn">조회</button>
                    </div>
                    <div className="paymentlist-content">
                        {paymentlist.map((payment, index) => (
                            <div key={index} className="paymentlist-content-row" onClick={() => getPaymentListDetail(payment.receiptId)}>
                                <div className="paymentlist-content-method">{payment.pg}</div>
                                <div className="paymentlist-content-price">{addComma(payment.price)} 원</div>
                                <div className="paymentlist-content-date">{payment.purchasedAt.split(" ")[1].substring(0,5)}</div>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="paymentlist-information">
                    {paymentlistdetail.param ? (
                        <>
                        <div className="paymentlist-information-header">
                            <div className="title">
                            <div className={`paymentlist-information-header-del ${paymentlistdetail.param.del === '결제완료' ? 'color-complete' : paymentlistdetail.param.del === '결제취소' ? 'color-cancel' : ''}`}>
                                {paymentlistdetail.param.del}
                            </div>

                                <div className="paymentlist-information-header-date">{paymentlistdetail.param.purchasedAt}</div>
                            </div>
                            <div className="body"> 
                                <div className="paymentlist-information-header-price">총 결제 금액</div>
                                <div className="paymentlist-information-header-price2">{addComma(paymentlistdetail.param.price)} 원</div>
                            </div>
                            <hr/>
                            <div className="paymentlist-information-body">
                                <button className="paymentlist-information-body-btn" onClick={() => openModal('refund')}>환불</button>
                                <button className="paymentlist-information-body-btn" onClick={() => openModal('receipt')}>영수증 보기</button>
                            </div>
                        </div>

                        <div className="body2">
                            <div className="paymentlist-information-body-method">결제 수단</div>
                            <div className="paymentlist-information-body-method2">{paymentlistdetail.param.method}</div>
                        </div>
                        
                        <div className="paymentlist-list">
                            <div className="paymentlist-list-title">결제 내역</div>
                            {paymentlistdetail.list?.map((item, idx) => (
                                <div key={idx} className="paymentlist-list-row">
                                    <div className="paymentlist-list-row-name">{item.itemName} x{item.qty}</div>
                                    <div className="paymentlist-list-row-price">{addComma((item.price)*(item.qty))} 원</div>
                                </div>         
                            ))}
                        </div>
                        </>
                    ) : ( // 결제 내역을 선택하지 않았을때 렌더링
                        <div className="paymentlist-information-empty">
                            <div className="paymentlist-information-header">
                                <div className="title">
                                    <div className="paymentlist-information-header-del">결제완료</div>
                                    <div className="paymentlist-information-header-date">결제 시간</div>
                                </div>
                                <div className="body"> 
                                    <div className="paymentlist-information-header-price">총 결제 금액</div>
                                    <div className="paymentlist-information-header-price2">0 원</div>
                                </div>
                                <hr/>
                                <div className="paymentlist-information-body">
                                    <button className="paymentlist-information-body-btn" >환불</button>
                                    <button className="paymentlist-information-body-btn" >영수증 보기</button>
                                </div>
                            </div>

                            <div className="body2">
                                <div className="paymentlist-information-body-method">결제 수단</div>
                                <div className="paymentlist-information-body-method2">카드</div>
                            </div>

                            <div className="paymentlist-list">
                                <div className="paymentlist-list-title">결제 내역</div>
                                <div className="paymentlist-list-row">
                                    <div className="paymentlist-list-row-name"></div>
                                    <div className="paymentlist-list-row-price">0 원</div>
                                </div>     
                            </div>
                        </div>
                    )}
                </div>


                
                
            </div>
        
        <Modal isOpen={modalIsOpen} onClose={closeModal} style={{ content:{width:'40%' } }}>
                {paymentlistType === 'refund' &&
                <RefundModal 
                    paymentlistdetail={paymentlistdetail}
                />}
                {paymentlistType === 'receipt' && <ReceiptModal />}
        </Modal>
        </div>
    )
}

export default Paymentlist;