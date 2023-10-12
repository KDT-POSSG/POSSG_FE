
import { Bootpay } from '@bootpay/client-js';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ACCESS_TOKEN } from 'store/apis/base';

  export const handlePayment = async (pgType, totalAmount, products, setPaymentResponse, openModal) => {
    const convSeq = localStorage.getItem("convSeq");

    try {

      const items = products.map(product => ({
        id: product.productSeq, // 현금 결제의 itemId에 해당
        name: product.productName, // 현금 결제의 itemName에 해당
        qty: product.amount, // 현금 결제의 qty에 해당
        price: product.priceDiscount.toString() // 현금 결제의 price에 해당
      }));


      const response = await Bootpay.requestPayment({
        application_id: "64f673d8e57a7e001bbb128a", //가맹점ID
        price: totalAmount.toString(), // 총액 = items의 가격 합 
        order_name: products.map(p => p.productName).join(", "), // 상품명 
        comapny_name: "Emart24 신세계센텀시티점",
        order_id: "미구현", // 고유 주문번호
        pg: pgType, // 카카오, 토스 2개 회사는 확인
        //method: "간편", // 카카오 - 간편, 토스 - 카드, 
        tax_free: 0,
        user: {
          id: "Jeong Jae Won",
          username: "정재원",
          phone: "01012345678",
          email: "qwer@naver.com"
        },
        // 아이템이 JSON으로 담기면 됨. id는 product_id 써야할듯, qty price 맞아야함 
        items: items,
        extra: {
          open_type: "iframe",
          card_quota: "0,2,3",
          escrow: false
        }
      });
      //console.log(items);
      console.log(response);
      

      // 결제 응답을 백엔드로 보냅니다.
      if (response.event === "done") {
        setPaymentResponse(response);
        
        // 결제 정보 폼 생성
        const paymentData = {
          receiptId: response.data.receipt_id,
          userSeq: 1,
          convSeq: convSeq,
          pg: response.data.pg,
          method: response.data.method,
          discountInfo: products.length > 0 ? products[0].promotionInfo : '',
          price: response.data.price,
          purchasedAt: response.data.purchased_at.slice(0, 19).replace('T', ' '), // new Date().toISOString().slice(0, 19).replace('T', ' '), // 현재 시간 설정
          receiptUrl: response.data.receipt_url,
          cardNum: response.data.card_data ? response.data.card_data.card_no : null, // card_data가 존재하면 card_approve_no를 사용, 아니면 null
          cardCompany: response.data.card_data ? response.data.card_data.card_company : null
        };

        // 결제 폼 전송
        await axios.post('http://54.180.60.149:3000/addpayment', paymentData, {
          headers : { 
            accessToken : `Bearer ${ACCESS_TOKEN}`
          }
        })
          .then((response) => {
            console.log("결제 정보 전송 완료", response.data);
            
            // 결제가 완료되면 다시 axios
            if(response.data === "YES") {
              const items = products.map(product => ({
                receiptId: paymentData.receiptId,
                itemId: product.productSeq,
                itemName: product.productName,
                qty: product.amount,
                price: product.priceDiscount.toString()
              }));
      
              // 결제 된 상품 목록 전송
              axios.post('http://54.180.60.149:3000/addItems', items, {
                headers : { 
                  accessToken : `Bearer ${ACCESS_TOKEN}`
                }
              })
                .then((response) => {
                  console.log("결제 상품 목록 전송 완료", response.data);
                  openModal('paymentreceipt');
                })
                .catch((error) => {
                  console.error('결제 상품 목록 에러', error);
                });
            }
          })
          .catch((error) => {
            console.error('결제 정보 에러', error);
            toast.error('결제에 실패했습니다. 다시 시도해주세요.');
          });

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
