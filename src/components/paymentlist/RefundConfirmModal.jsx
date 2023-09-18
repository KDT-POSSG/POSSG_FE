
function RefundConfirmModal(){
    return(
        <div className="refund-confirm-modal">
            <div className="refund-confirm-title">환불</div>
            <div className="refund-confirm-msg">환불 하시겠습니까?</div>
            <div className="refund-confirm-button">
                <button className="refund-confirm-button1">취소</button>
                <button className="refund-confirm-button2">확인</button>
            </div>
        </div>
    );
}

export default RefundConfirmModal;