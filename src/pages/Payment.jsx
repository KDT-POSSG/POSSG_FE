import '../styles/page/payment/payment.css'

function Payment() {
    return (
        <div className="payment-container">
            <div className="product-list">
                <h1 className='payment-title'>결제 목록</h1>
                <hr/>
                <h3 className='total-product'>총 ??개</h3>
            </div> 
            <div className="payment-method">
                <div className='payment-method-top'>
                    <h2 className='total-payment'>총 결제금액  ???원</h2>
                    <button className='division-payment-btn'>분할 결제</button>
                   
                </div>
                <div className='membership-btn-container'>
                     <button className='payment-btn discount-coupon-btn'>할인 / 쿠폰</button>
                     <button className='payment-btn point-btn'>포인트 / 회원</button>
                 </div>
                <div className='payment-method-btn-container'>
                      <button className='payment-btn card-payment-btn'>💳<br/>카드 결제</button>
                      <button className='payment-btn cash-payment-btn'>💵<br/>현금 결제</button>
                     <button className='payment-btn etc-payment-btn'> 🏧<br/>기타 결제</button>
                </div>
            </div>
        </div>
    )
}

export default Payment;