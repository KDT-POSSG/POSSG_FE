import NumberPad from "components/NumberPad";
import { useState } from "react";
import { addComma } from '../../store/utils/function';
import axios from 'axios';
import Modal from "../Modal";
import { toast } from "react-hot-toast";



function Cashpay({ openModal, closeModal, inputValue, setInputValue, changeAmount, setChangeAmount, totalAmount, products }) {
 
  
  //넘버패드로 받은 금액 입력
  const handleInputValueChange = (value) => {
      setInputValue(value); 
      const receivedAmount = parseInt(value, 10); 
      const change = receivedAmount - totalAmount; 
      if (change >= 0) {
          setChangeAmount(change); 
      }
  };

  //현재시간을 이용해 영수증 id 생성(ms까지 사용)
  const generateReceiptId = () => {
      const now = new Date();
      const datePart = now.toISOString().slice(0, 19).replace(/[-T:]/g, '');
      const millisPart = now.getMilliseconds().toString().padStart(3, '0');
      const combinedPart = `${datePart}${millisPart}`;

      return shuffleString(combinedPart);
  };

  //생선된 영수증 id를 랜덤으로 섞기
  const shuffleString = (str) => {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  }

  //전송될 현금 결제 정보 
  const paymentData = {
    receiptId: generateReceiptId(),
    userSeq: 1,
    convSeq: 1,
    pg: "현금",
    method: "현금 결제",
    discountInfo: products.length > 0 ? products[0].promotionInfo : '',
    price: totalAmount.toString(),
    purchasedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    receiptUrl: "",
    cardNum: '',
    cardCompany: ''
  };

  //전송될 현금 결제 상품 매핑
  const items = products.map(product => ({
    receiptId: paymentData.receiptId,
    itemId: product.productSeq,
    itemName: product.productName,
    qty: product.amount,
    price: product.price.toString()
  }));


  //수행되는 결제 함수, 완료 후 영수증 모달창 열고, payment 컴포넌트에게 받은 금액, 거스름 돈 전달
  const handlePayment = async () => {
    try {
      if(paymentData.price === "0") {
        toast.error("결제할 상품이 없습니다.");
        return;
      }    
        const response = await axios.post("http://54.180.60.149:3000/addpayment", paymentData);
        console.log("결제 정보 전송 완료", response.data);
        
        if(response.data === "YES") {
            const itemResponse = await axios.post('http://54.180.60.149:3000/addItems', items);
            console.log("결제 상품 목록 전송 완료", itemResponse.data);
            setInputValue(inputValue);
            setChangeAmount(changeAmount);
            closeModal();
            openModal('cashpayreceipt');
            
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
