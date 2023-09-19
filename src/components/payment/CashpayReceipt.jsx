
function CashpayReceipt({ onClose }){
    const handleCompleteClick = () => {
        console.log(onClose);
        if (onClose) {
            onClose();
        }
      }

    return(
        <div className="cashpayreceipt">
            <div className="cashpayreceipt-header">
                <div className="cashpayreceipt-header-title">결제 완료</div>
            </div>

            <div className="cashpayreceipt-body">
                <div className="cashpayreceipt-body-top">
                    <span className="tossface cashpayreceipt-body-top-img">✅</span>
                    <div className="cashpayreceipt-body-top-title">결제 완료</div>
                    <div className="cashpayreceipt-body-top-text">현금 결제가 완료되었습니다.</div>
                </div>
                <div className="cashpayreceipt-body-middle">
                    <div className="cashpayreceipt-body-middle-price">결제 금액</div>
                    <div className="cashpayreceipt-body-middle-price2">5,900 원</div>
                </div>
                <div className="cashpayreceipt-body-bottom">
                    <div className="cashpayreceipt-input-price">
                        <div className="cashpayreceipt-body-input-price">받은 금액</div>
                        <div className="cashpayreceipt-body-input-price2">10,000 원</div>
                    </div>
                    <div className="cashpayreceipt-change">
                        <div className="cashpayreceipt-body-change">거스름 돈</div>
                        <div className="cashpayreceipt-body-change2">4,100 원</div>
                    </div>
                </div>
            </div>

            <div className="cashpayreceipt-buttons">
                <button className="cashpayreceipt-btn">영수증 출력</button>
                <button className="cashpayreceipt-complete-btn" onClick={handleCompleteClick} >확인</button>
            </div>
        </div>
    );
    
}

export default CashpayReceipt;  