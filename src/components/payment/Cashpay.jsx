import NumberPad from "components/NumberPad";
import CashpayReceipt from "./CashpayReceipt";
import { useState } from "react";
import { addComma } from '../../store/utils/function';
import axios from 'axios';
import Modal from "../Modal";
import { toast } from "react-hot-toast";



function Cashpay({ openModal, closeModal, totalAmount }) {
  const [totalAmountState, setTotalAmountState] = useState(5900); 
  const [inputValue, setInputValue] = useState("");
  const [changeAmount, setChangeAmount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  

  const handleInputValueChange = (value) => {
      setInputValue(value); 
      const receivedAmount = parseInt(value, 10); 
      const change = receivedAmount - totalAmount; 
      if (change >= 0) {
          setChangeAmount(change); 
      }
  };

  const shuffleString = (str) => {
      const arr = str.split('');
      for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.join('');
  }

  const generateReceiptId = () => {
      const now = new Date();
      const datePart = now.toISOString().slice(0, 19).replace(/[-T:]/g, '');
      const millisPart = now.getMilliseconds().toString().padStart(3, '0');
      const combinedPart = `${datePart}${millisPart}`;

      return shuffleString(combinedPart);
  };




  const paymentData = {
    receiptId: generateReceiptId(),
    userSeq: 1,
    convSeq: 1,
    pg: "현금",
    method: "현금 결제",
    discountInfo: '',
    price: "26000",
    purchasedAt: new Date().toISOString().slice(0, 19).replace('T', ' '), // new Date().toISOString().slice(0, 19).replace('T', ' '), // 현재 시간 설정
    receiptUrl: "",
    cardNum: '', // card_data가 존재하면 card_approve_no를 사용, 아니면 null
    cardCompany: ''
  };

  const items = [
    { 
      "receiptId": paymentData.receiptId,
      "itemId": 1001,
      "itemName": "초코파이",
      "qty": 1,
      "price": 4000
    },
     { 
      "receiptId": paymentData.receiptId,
      "itemId": 1001,
      "itemName": "마시멜로",
      "qty": 2,
      "price": 1000
    },
    { 
      "receiptId": paymentData.receiptId,
      "itemId": 1001,
      "itemName": "김현민",
      "qty": 2,
      "price": 10000
    }
  ];



  const handlePayment = async () => {
    try {
        const response = await axios.post("http://10.10.10.65:3000/addpayment", paymentData);
        console.log("결제 정보 전송 완료", response.data);
        
        if(response.data === "YES") {
            setPaymentSuccess(true);
            const itemResponse = await axios.post('http://10.10.10.65:3000/addItems', items);
            console.log("결제 상품 목록 전송 완료", itemResponse.data);

            closeModal();
            openModal('receipt');
        }
    } catch (error) {
        console.error('결제 정보 에러', error);
        toast.error("결제 실패")
    }
};

  
      
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
                <div className="cashpaymodal-price2">{addComma(totalAmount)} 원</div>
              </div>
              <div className="cashpaymodal-input-price">받은 금액</div>
              <input className="cashpaymodal-input-price2" value={addComma(inputValue)} readOnly placeholder={`${addComma(totalAmount)} 원`}/>
          </div>
          <div className="cashpaymodal-info-bottom">
              <div className="cashpaymodal-info-price">
                <div className="cashpaymodal-change">거스름 돈</div>
                <div className="cashpaymodal-change2">{addComma(changeAmount)} 원</div>
              </div>
          </div>

          <button className="cashpaymodal-btn" onClick={handlePayment}>결제 완료</button>
        </div>

        <div className="cashpaymodal-numpad">
          <NumberPad onInputValueChange={handleInputValueChange} selectedInputValue={inputValue}/>
        </div>
      </div>
    </div>
  );
}

export default Cashpay;
