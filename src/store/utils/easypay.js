
import { Bootpay } from '@bootpay/client-js';
import axios from 'axios';
import toast from 'react-hot-toast';
// import { ACCESS_TOKEN } from 'store/apis/base';

  export const handlePayment = async (pgType, totalOriginalPrice, totalDiscountPrice, products, usepoint, phoneNumber, pwd, setPaymentResponse, openModal) => {

    const accesstoken = localStorage.getItem("accesstoken");
    const convSeq = localStorage.getItem("convSeq");

  //생선된 영수증 id를 랜덤으로 섞기
    const shuffleString = (str) => {
      const arr = str.split('');
      for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.join('');
    }

     //현재시간을 이용해 영수증 id 생성(ms까지 사용)
    const generateOrderId = () => {
      const now = new Date();
      const datePart = now.toISOString().slice(0, 19).replace(/[-T:]/g, '');
      const millisPart = now.getMilliseconds().toString().padStart(3, '0');
      const combinedPart = `${datePart}${millisPart}`;

      return shuffleString(combinedPart).toString();
    };


    try {
      const items = products.map(product => ({
        id: product.productSeq, 
        name: product.productName, 
        qty: product.amount,
        price: product.priceDiscount.toString()
      }));  

      const response = await Bootpay.requestPayment({
        application_id: "64f673d8e57a7e001bbb128a", //가맹점ID
        price: totalDiscountPrice.toString() - usepoint.toString(), // 총액 = items의 가격 합 
        order_name: products.map(p => p.productName).join(", "), // 상품명 
        comapny_name: "Emart24 신세계센텀시티점",
        order_id: generateOrderId(), // 고유 주문번호response.data.receipt_id
        pg: pgType, // 카카오, 토스 2개 회사는 확인
        //method: "간편", // 카카오 - 간편, 토스 - 카드, 
        tax_free: 0,
        user: {
          id: "Jeong Jae Won",
          username: "정재원",
          phone: "01056852833",
          email: "412896@naver.com"
        },
        // 아이템이 JSON으로 담기면 됨. id는 product_id 써야할듯, qty price 맞아야함 
        extra: {
          open_type: "iframe",
          card_quota: "0,2,3",
          escrow: false
        }
      });
      
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
          originalPrice: totalOriginalPrice.toString(),
          purchasedAt: response.data.purchased_at.slice(0, 19).replace('T', ' '), // new Date().toISOString().slice(0, 19).replace('T', ' '), // 현재 시간 설정
          receiptUrl: response.data.receipt_url,
          cardNum: response.data.card_data ? response.data.card_data.card_no : null, // card_data가 존재하면 card_approve_no를 사용, 아니면 null
          cardCompany: response.data.card_data ? response.data.card_data.card_company : null,
          ptPhoneNum : phoneNumber === "" ? "0" : phoneNumber,
          usePoint : usepoint,
          earnedPoint : parseInt(response.data.price * 0.01)
        };

        // 결제 폼 전송
        await axios.post('http://54.180.60.149:3000/addpayment', paymentData, {
          headers : { 
            accessToken : `Bearer ${accesstoken}`
          }
        })
          .then((response) => {
            console.log("결제 정보 전송 완료");
            
            // 결제가 완료되면 다시 axios
            if(response.data === "POINT YES" || response.data === "YES") {
              const items = products.map(product => ({
                receiptId: paymentData.receiptId,
                itemId: product.productSeq,
                itemName: product.productName,
                qty: product.amount,
                price: product.priceDiscount.toString()
              }));
              // 결제 된 상품 목록 전송
              axios.post('http://54.180.60.149:3000/addItems', items, {
                headers : { accessToken : `Bearer ${accesstoken}`}})
                .then((response) => {
                  console.log("결제 상품 목록 전송 완료");
                  openModal('paymentreceipt');
                })
                .catch((error) => {
                  console.error('결제 상품 목록 에러', error);
                });

              // const usePointData ={
              //   phoneNumber : phoneNumber,
              //   pwd,
              //   point : parseInt(usepoint)
              // }

              // console.log(usePointData);
        
              // axios.post('http://54.180.60.149:3000/usePoint', usePointData, {headers:{ accessToken: `Bearer ${accesstoken}`}})
              // .then(response => {
              //   if (response.data === 'NO REGISTER'){
              //     console.log("가입되지 않은 고객입니다.");
              //   }
              //   else if (response.data === 'INVALID PASSWORD'){
              //     console.log("비밀번호 오류");
              //   }
              //   else if (response.data === 'INSUFFICIENT POINT'){
              //     console.log("포인트 부족");
              //   }
              //   else {
              //     console.log("포인트 사용 성공");
              //     console.log('남은 포인트', response.data);
              //   }
              // })
              // .catch(error => {
              //   console.log('실패', error);
              //   console.log(response.data);
              // });



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
