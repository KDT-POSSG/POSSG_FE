
function ReceiptModal({ paymentlistdetail }) {
      
  console.log(paymentlistdetail.param.receipt_url);

  return (
    <div className="cashpayreceipt">
      <iframe className="cashpayreceipt-iframe"
        src={paymentlistdetail.param.receiptUrl
}
        width="100%"
        height="600px">
      </iframe>
    </div>
  )
}

export default ReceiptModal;