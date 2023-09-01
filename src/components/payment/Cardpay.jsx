
function Cardpay() {
  return (
    <div className='Cardpay'>
        <div className='modal-container'>
            <h1 className='cardpay-top page-title'>카드결제</h1>
            <div className='payment-amount-container'>
                <h1 className="payment-amount">결제금액</h1>
                <h1 className="payment-amount-value">???원</h1>
            </div>
            
            <button className='cancel-btn'>취소</button>
        
      </div>
    </div>
  );
}

export default Cardpay;