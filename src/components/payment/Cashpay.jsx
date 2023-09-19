import NumberPad from "components/NumberPad";
import CashpayReceipt from "./CashpayReceipt";
import { useState } from "react";
import { addComma } from '../../store/utils/function';
import axios from 'axios';
import { Bootpay } from '@bootpay/client-js';


function Cashpay({onPaymentComplete}) {
  const [inputValue, setInputValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputValueChange = (value) => {
    setInputValue(value);
  };

  const handlePaymentButtonClick = () => {
    
    if (onPaymentComplete) {
        onPaymentComplete();
    }
  };

  const openModal = (type) => {
    setModalIsOpen(true);
   };
   const closeModal = () => {
   setModalIsOpen(false);
   };

   const paymentData = {
    receiptId: new Date().toISOString().slice(0, 19).replace('T', ' '),
    userSeq: 1,
    convSeq: 1,
    pg: "현금",
    method: "현금 결제",
    discountInfo: '',
    price: "9000",
    purchasedAt: new Date().toISOString().slice(0, 19).replace('T', ' '), // new Date().toISOString().slice(0, 19).replace('T', ' '), // 현재 시간 설정
    receiptUrl: "",
    cardNum: '', // card_data가 존재하면 card_approve_no를 사용, 아니면 null
    cardCompany: ''
  };

  const cashpayment = () => {
   axios.post("http://10.10.10.11:3000/addpayment", paymentData)
    .then((response) => {
      console.log("결제 정보 전송 완료", response.data);

      if(response.data === "YES") {
        const items = [
          { 
            "receiptId": paymentData.receiptId,
            "itemId": 1001,
            "itemName": "아메리카노",
            "qty": 1,
            "price": 2000
          },
           { 
            "receiptId": paymentData.receiptId,
            "itemId": 1001,
            "itemName": "바닐라 라떼",
            "qty": 4,
            "price": 3500
          },
          { 
            "receiptId": paymentData.receiptId,
            "itemId": 1001,
            "itemName": "프로틴 쉐이크",
            "qty": 2,
            "price": 4000
          }
        ];

        axios.post('http://10.10.10.196:3000/addItems', items)
          .then((response) => {
                  console.log("결제 상품 목록 전송 완료", response.data);
                })
                .catch((error) => {
                  console.error('결제 상품 목록 에러', error);
                });
            }
          })
          .catch((error) => {
            console.error('결제 정보 에러', error);
          });
        }

        function combinedFunction() {
          handlePaymentButtonClick();
          cashpayment();
      }
      
  return (
    <div className="cashpaymodal">
      <div className="cashpaymodal-header">
        <div className="cashpaymodal-header-title">현금 결제</div>
      </div>

      <div className="cashpaymodal-body">
        <div className="cashpaymodal-info">
          <div className="cashpaymodal-info-top">
              <span className="tossface cashpaymodal-img">💸</span>
              <div className="cashpaymodal-info-title">현금 결제</div>
              <div className="cashpaymodal-info-text">현금으로 받은 금액을 입력해 주세요.</div>

              <div className="cashpaymodal-info-price">
                <div className="cashpaymodal-price">결제 금액</div>
                <div className="cashpaymodal-price2">5,900 원</div>
              </div>
              <div className="cashpaymodal-input-price">받은 금액</div>
              <input className="cashpaymodal-input-price2" value={addComma(inputValue)} readOnly placeholder="5,900 원"/>
          </div>
          <div className="cashpaymodal-info-bottom">
              <div className="cashpaymodal-info-price">
                <div className="cashpaymodal-change">거스름 돈</div>
                <div className="cashpaymodal-change2">0 원</div>
              </div>
          </div>

          <button className="cashpaymodal-btn" onClick={combinedFunction}>결제 완료</button>
        </div>

        <div className="cashpaymodal-numpad">
          <NumberPad onInputValueChange={handleInputValueChange} selectedInputValue={inputValue}/>
        </div>
      </div>
      {modalIsOpen && <CashpayReceipt onClose={closeModal} />}
    </div>
  );
}

export default Cashpay;
