
import { Bootpay } from '@bootpay/client-js';
import React, { useState } from 'react'; // React 라이브러리 import 추가
import axios from 'axios';

function Paymenttest() {
  const [paymentResponse, setPaymentResponse] = useState(null);

  const handlePayment = async () => {
    try {
      const response = await Bootpay.requestPayment({
        application_id: "64f673d8e57a7e001bbb128a",
        price: 500, // 총액 = items의 가격 합 
        order_name: "결제 상품 명", // 상품명 
        comapny_name: "Emart24 신세계센텀시티점",
        order_id: "TEST_ORDER_ID", // 고유 주문번호
        pg: "toss", // 카카오, 토스 2개 회사는 확인
        //method: "간편", // 카카오 - 간편, 토스 - 카드, 
        tax_free: 0,
        user: {
          id: "abc123",
          username: "최민규",
          phone: "01012345678",
          email: "qwer@naver.com"
        },
        items: [ // 아이템이 JSON으로 담기면 됨. id는 product_id 써야할듯, qty price 맞아야함 
          { 
            id: "item_id",
            name: "먹태깡",
            qty: 1,
            price: 100
          },
          {
            id: "item_id2",
            name: "테스트아이템2",
            qty: 2,
            price: 200
          }
        ],
        extra: {
          open_type: "iframe",
          card_quota: "0,2,3",
          escrow: false
        }
      });

      console.log(response);


      // 결제 응답을 백엔드로 보냅니다.
      if (response.event === "done") {
        setPaymentResponse(response);

        // 결제 정보 폼 생성
        const paymentData = {
          receiptId: response.data.receipt_id,
          userSeq: 1, 
          productSeq: 1, 
          convSeq: 1,
          pg: response.data.pg,
          method: response.data.method,
          discountInfo: '',
          price: response.data.price,
          purchasedAt: response.data.purchased_at.slice(0, 19).replace('T', ' '), // new Date().toISOString().slice(0, 19).replace('T', ' '), // 현재 시간 설정
          receiptUrl: response.data.receipt_url,
          ref: 1, // 예시로 1로 설정, 실제 로직에 맞게 수정
          cardNum: response.data.card_data ? response.data.card_data.card_no : null, // card_data가 존재하면 card_approve_no를 사용, 아니면 null
          cardCompany: response.data.card_data ? response.data.card_data.card_company : null
        };

        
        axios.post('http://10.10.10.124:3000/addpayment', paymentData)
          .then((response) => {
            console.log("결제 정보 전송 완료", response);
          })
          .catch((error) => {
            console.error('Error sending payment data to the server:', error);
          });
        

        console.log('Payment response sent to the server:', response);
      }
      

      else if (response.event === "cancel") {
        // 결제 취소 로직 안에 넣기
      }
      
      else {
        console.error('Payment failed:', response);
        // 실패한 경우의 처리
      }
    } 

    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>결제테스트</h1>
      <button onClick={handlePayment}>결제하기</button>
      {paymentResponse && <div>{JSON.stringify(paymentResponse)}</div>}
    </div>
  );
}

export default Paymenttest;