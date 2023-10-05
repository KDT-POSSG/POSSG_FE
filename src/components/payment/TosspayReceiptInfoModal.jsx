
function TosspayReceiptInfoModal({ receiptURL }) {

      console.log("영수증",receiptURL);
      
      return (
        <div className="cashpayreceipt">
          <iframe className="cashpayreceipt-iframe"
            src={receiptURL.data.receipt_url}
            width="100%"
            height="600px">
          </iframe>
        </div>
      )
    }
    
    export default TosspayReceiptInfoModal;