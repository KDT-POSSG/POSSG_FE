import React, { useState, useRef } from "react";
import axios from "axios";
import Modal from "../components/ui/Modal";
import Cashpay from "../components/payment/Cashpay";
import Point from "../components/payment/Point";
import CashpayReceipt from "../components/payment/CashpayReceipt";
import PaymentReceipt from "components/payment/PaymentReceipt";
import { handlePayment } from "store/utils/easypay.js";
import { addComma } from "store/utils/function.js";
import CashpayReceiptInfoModal from "components/payment/CashPayReceiptInfoModal";
import RegisterPoint from "components/payment/RegisterPoint";
import { toast } from "react-hot-toast";
import { useRecoilValue } from 'recoil';
import { PosState } from 'store/atom/posState';

function Payment() {
  const accesstoken = localStorage.getItem("accesstoken");
  const convSeq = localStorage.getItem("convSeq");
  const isPos = useRecoilValue(PosState);
  const barcodeInputRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [paymentType, setPaymentType] = useState(null);
  const [pointType, setPointType] = useState(null);
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [barcodeInput, setBarcodeInput] = useState("");
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [changeAmount, setChangeAmount] = useState(0);
  const [paymentData, setPaymentData] = useState(null);
  const [usepoint, setUsePoint] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pwd, setPwd] = useState("");
  const [remainingPoint, setRemainingPoint] = useState("");
  const [pwdChecked, setPwdChecked] = useState(false);
  const [response, setResponse] = useState("");

  // input에 바코드가 제대로 입력됐는지 확인하고 상품 불러오기
  const handleBarcode = () => {
    const barcodeInput = barcodeInputRef.current.value;
    if (!barcodeInput) {
      toast.error("바코드 스캔를 스캔해주세요");
      return;
    }
    axios
      .get("http://54.180.60.149:3000/findProductBarcode", {params: { Barcode: barcodeInput, convSeq: convSeq },
        headers: { accessToken: `Bearer ${accesstoken}` }})
      .then((res) => {
        const productData = res.data;
        const existingProduct = products.find(
          (p) => p.productSeq === productData.productSeq
        );
        if(res.data === ""){
          toast.error("유통기한이 만료되었습니다");
          return;
        }
        //현재 상품의 시퀀스와 들어오는 상품의 시퀀스가 같으면 상품의 수량을 1개씩 더해줌
        else if (existingProduct) {
          setProducts((prevProducts) => {
            return prevProducts.map((p) => {
              if (p.productSeq === productData.productSeq) {
                console.log(p.amount);
                return { ...p, amount: p.amount + 1 };
              }
              return p;
            });
          });
        } else {
          productData.amount = 1;
          setProducts((prevProducts) => [...prevProducts, productData]); //그렇지 않으면 상품 1개로
        }
        // console.log(productData);
      })
      .catch((err) => {
        console.log(err);
        toast.error("바코드 스캔 실패");
      });
    setBarcodeInput("");
  };

  // 총 할인된 결제 금액 계산
  const getTotalDiscountPrice = () => {
    return products.reduce((total, product) => {
      return total + product.priceDiscount * product.amount;
    }, 0);
  };
  // 총 원가 결제 금액 계산
  const getTotalOriginalPrice = () => {
    return products.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0);
  };
  // 얼만큼 할인됐는지 금액 계산
  const getTotalDiscountAmount = () => {
    return products.reduce((total, product) => {
      const discountAmountForProduct = (product.price - product.priceDiscount) * product.amount;
      return total + discountAmountForProduct; 
    }, 0);
  };

  //결제 함수 시작
  const startPayment = async (pgType) => {
    try {
      const totalOriginalPrice = getTotalOriginalPrice();
      const totalDiscountPrice = getTotalDiscountPrice();

      await handlePayment(
        pgType,
        totalOriginalPrice,
        totalDiscountPrice,
        products,
        usepoint,
        phoneNumber,
        pwd,
        setPaymentResponse,
        openModal
      );
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  //걸제 완료 후 초기화 시킬 것들
  const handlePaymentSuccess = () => {
    setProducts([]);
    setInputValue("");
    setChangeAmount(0);
    setUsePoint(0);
    setPwd("");
    setPhoneNumber("");
  };

  //모달창 열고 닫기
  const openModal = (type) => {
    setPaymentType(type);
    setModalIsOpen(true);
    if (type === "point") {
      resetPointInfo();
    }
  };
  const closeModal = (type) => {
    setPaymentType(type);
    setModalIsOpen(false);
    if (
      paymentType === "cashpayreceipt" ||
      paymentType === "paymentreceipt" ||
      paymentType === "cashpayreceiptinfomodal"
    ) {
      handlePaymentSuccess();
    }
    if ( paymentType === "cash" ){
      setInputValue("");
      setChangeAmount(0);
    }
    
  };

  //상품 목록에서 상품 삭제
  const handleDeleteProduct = (productSeq) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.productSeq !== productSeq)
    );
  };

  //paymentType에 따라 모달창의 크기를 다르게 설정, 결제 영수증 모달의 넓이 조절을 위해 추가함
  const getModalStyle = () => {
    if (paymentType === "cashpayreceipt" || paymentType === "paymentreceipt") {
      return {
        content: { padding: "1.5rem", width: "500px" },
      };
    } else if (paymentType === "cashpayreceiptinfomodal") {
      return {
        content: {
          width: "40%",
          height: "auto",
          backgroundColor: "#fff",
          maxHeight: "40rem",
        },
      };
    } else if (paymentType === "point") {
      return {
        content: { height: "70%" },
      };
    } else if (paymentType === "registerpoint") {
      return {
        content: { width: "25%", height: "64%" },
      };
    }
    return {
      content: { padding: "1.5rem" },
    };
  };

  //포인트 정보를 초기화
  const resetPointInfo = () => {
    setUsePoint(0);
    setPhoneNumber("");
    setPwd("");
    setResponse("");
  }

  return (
    // payment-container를 클릭하면 바코드 입력창에 포커스가 가도록 함 (사용자가 다른 곳을 클릭했을 때 input창에 포커스가 해제되는 것 방지용)
    <div
      className="payment-container"
      onClick={() => barcodeInputRef.current.focus()}
    >
      <div className="payment-header">
        <div className="page-title">결제</div>
        <input
          ref={barcodeInputRef}
          className="input-barcode"
          placeholder="여기에 바코드를 입력"
          value={barcodeInput}
          onChange={(e) => setBarcodeInput(e.target.value)}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleBarcode();
            }
          }}
        />
      </div>

      <div className="payment-body">
        <div className="payment-list">
          <div className="payment-list-list">
            {products.length === 0 ? (
              <div className="payment-list-empty-container">
                {/* <span className="material-symbols-rounded">barcode_scanner</span> */}
                <span className="material-symbols-rounded">barcode_reader</span>
                {/* <span className="material-symbols-rounded">barcode</span> */}
                <div className="payment-list-empty">바코드를 스캔해주세요</div>
              </div>
            ) : (
              products.map((product) => (
                <div className="payment-list-row" key={product.productSeq}>
                  <div className="payment-list-delete-container">
                    <button
                      className="payment-list-delete tossface"
                      onClick={() => handleDeleteProduct(product.productSeq)}
                    >
                      <span className="material-symbols-rounded">close</span>
                    </button>
                  </div>
                  <div className="container">
                    <div className="payment-list-row-info">
                      <div className="payment-list-name">
                        {product.productName}
                      </div>
                      <div className="payment-list-amount">
                        x {product.amount}
                      </div>
                      <div className="payment-list-price">
                        {addComma(product.price * product.amount)} 원
                      </div>
                      {/* <div className='payment-list-priceDiscount'>{addComma(product.priceDiscount * product.amount)} 원</div> */}
                    </div>

                    {/* 할인율이 0이 아닐 때만 할인 정보를 보여줌 */}
                    {product.discountRate !== 0.0 && (
                      <div className="payment-list-discount-info">
                        <div></div>
                        <div className="payment-list-discount">행사 할인</div>

                        <div className="payment-list-discount2">
                          -
                          {addComma(
                            (product.price - product.priceDiscount) *
                              product.amount
                          )}{" "}
                          원
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="payment-list-result">
            
            <div className="payment-list-discount-container">
              <div className="payment-list-discount1">할인 금액</div>
              <div className="payment-list-discount2">{getTotalDiscountAmount() !== 0 && ('-')}{addComma(getTotalDiscountAmount())} 원</div>
            </div>
            <div className="payment-list-total-container">
              <div className="payment-list-total">총액</div>
              <div className="payment-list-total2">
                {addComma(getTotalDiscountPrice())} 원
              </div>
            </div>
          </div>

        </div>

        <div className="payment-method-container">
          <div className="container">
            <div className="payment-total">결제 금액</div>
            <div className="payment-total-container">
              <div className="payment-total-price">
                <div className="payment-total-price1">
                  {addComma(getTotalDiscountPrice() - usepoint)} 원
                </div>
                <div className="payment-total-price2">
                  포인트 사용 {addComma(usepoint)} P
                </div>
                <button
                className="set-usepoint-btn"
                onClick={() => {
                  resetPointInfo()
                }}
              >
                포인트 초기화
              </button>

              </div>
              {isPos && 
              <button
                className="payment-method-cash"
                onClick={() => {
                  if (products.length > 0) {
                    openModal("cash");
                  } else {
                    toast.error("결제할 상품이 없습니다");
                  }
                }}
              >
                <span className="material-symbols-rounded">payments</span>
                <div className="cash">현금</div>
              </button>
              }
            </div>


            <div className="payment-method-container2">
              {/* <div className='payment-method-top'>
                                <button className='payment-method-discount' onClick={() => openModal('discount')}>X</button>
                                <button className='payment-method-point' onClick={() => openModal('point')}>X</button>
                            </div> */}
              <div className="payment-method-bottom">
                <button
                  className="payment-method-tosspay"
                  onClick={() => {
                    if (products.length > 0) {
                      startPayment("토스");
                    } else {
                      toast.error("결제할 상품이 없습니다");
                    }
                  }}
                >
                  <span className="material-symbols-rounded">credit_card</span>
                  <div className="card">카드</div>
                </button>
                <button
                  className="payment-method-kakaopay"
                  onClick={() => {
                    if (products.length > 0) {
                      startPayment("카카오");
                    } else {
                      toast.error("결제할 상품이 없습니다");
                    }
                  }}
                >
                  <span className="material-symbols-rounded">qr_code_2</span>
                  <div className="kakao">카카오페이</div>
                </button>
                <button
                  className="payment-method-point"
                  onClick={() => {
                    if (products.length > 0) {
                      openModal("point");
                    } else {
                      toast.error("결제할 상품이 없습니다");
                    }
                  }}
                >
                  <span className="material-symbols-rounded">
                    local_parking
                  </span>
                  <div className="point">포인트</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        style={getModalStyle()}
        shouldCloseOnOverlayClick={false}
      >
        {paymentType === "cash" && (
          <Cashpay
            openModal={openModal}
            closeModal={closeModal}
            totalDiscountPrice={getTotalDiscountPrice()}
            totalOriginalPrice={getTotalOriginalPrice()}
            products={products}
            inputValue={inputValue}
            setInputValue={setInputValue}
            changeAmount={changeAmount}
            setChangeAmount={setChangeAmount}
            setPaymentData={setPaymentData}
            usepoint={usepoint}
            phoneNumber={phoneNumber}
          />
        )}
        {paymentType === "cashpayreceipt" && (
          <CashpayReceipt
            closeModal={closeModal}
            openModal={openModal}
            totalDiscountPrice={getTotalDiscountPrice()}
            inputValue={inputValue}
            changeAmount={changeAmount}
            handlePaymentSuccess={handlePaymentSuccess}
            paymentData={paymentData}
            usepoint={usepoint}
          />
        )}
        {paymentType === "paymentreceipt" && (
          <PaymentReceipt
            openModal={openModal}
            closeModal={closeModal}
            totalDiscountPrice={getTotalDiscountPrice()}
            handlePaymentSuccess={handlePaymentSuccess}
            paymentResponse={paymentResponse}
            usepoint={usepoint}
          />
        )}
        {paymentType === "cashpayreceiptinfomodal" && (
          <CashpayReceiptInfoModal
            handlePaymentSuccess={handlePaymentSuccess}
            closeModal={closeModal}
            paymentData={paymentData}
          />
        )}
        {paymentType === "point" && (
          <Point
            openModal={openModal}
            closeModal={closeModal}
            usepoint={usepoint}
            setUsePoint={setUsePoint}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            pwd={pwd}
            setPwd={setPwd}
            remainingPoint={remainingPoint}
            setRemainingPoint={setRemainingPoint}
            pointType={pointType}
            setPointType={setPointType}
            totalDiscountPrice={getTotalDiscountPrice()}
            setPwdChecked={setPwdChecked}
            pwdChecked={pwdChecked}
            setResponse={setResponse}
            response={response}
          />
        )}
        {paymentType === "registerpoint" && (
          <RegisterPoint
            openModal={openModal}
            phoneNumber={phoneNumber}
            setResponse={setResponse}
            closeModal={closeModal}
            setRemainingPoint={setRemainingPoint}
          />
        )}
      </Modal>
    </div>
  );
}

export default Payment;
