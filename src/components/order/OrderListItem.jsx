import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { addComma } from 'store/utils/function';

function OrderListItem({ type, item, handleCheck, selectedItems, idx }) {

  const [addStock, setAddStock] = useState(item.amount);

  const changeAmount = (amountTemp) => {

    console.log("addStock >> ", addStock);
    console.log("amountTemp >> ", amountTemp);

    axios.post("http://54.180.60.149:3000/updateCallProductConv", {
        convSeq: 1,
        productName: item.productName,
        amount: amountTemp,
        priceDiscount: item.price,
        callRef: item.callRef
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const handleAddStock = (e) => {

    let amountTemp;

    if(e.target.value === "plus") {
      amountTemp = addStock + 1;
    }
    else if(e.target.value === "minus") {
      if(addStock <= 1) {
        toast.error("수량은 1 미만이 될 수 없습니다");
        return;
      }
      amountTemp = addStock - 1;
    }
    else {
      if(e.target.value < 0) {
        toast.error("수량은 1 미만이 될 수 없습니다");
        return;
      }
      amountTemp = e.target.value;
    }

    setAddStock(amountTemp);
    changeAmount(amountTemp);
  }

  return (
    <div className='ordercart-grid ordercart-grid-item'>

      <div>
        {
          type === "before" ?
          <input type="checkbox" className='ordercart-check' value={item.productName} onChange={handleCheck} checked={selectedItems.includes(item.productName)} />
          :
          <div>{addComma(idx + 1)}</div>
        }
      </div>

      <div className='ordercart-image'>
        <img src={item.imgUrl} alt={item.productName} />
      </div>

      <div className='ordercart-product-name'>
        <div className='ordercart-product-title'>
          <div className='top'>{item.productName}</div>
          <div className='bottom'>개당 가격 : {addComma(item.price / item.amount)} 원</div>
        </div>
      </div>

      {
        type === "before" ?
        <div>
          <div className='ordercart-process'>
            <button value="minus" onClick={handleAddStock} className='minus'>
              <span className="material-symbols-rounded stock-calc">remove</span>
            </button>

            <input type="text" placeholder='수량' value={addStock} onChange={handleAddStock} /><br/>
            
            <button value="plus" onClick={handleAddStock} className='plus'>
              <span className="material-symbols-rounded stock-calc">add</span>
            </button>
          </div>
        </div>
        :
        <div>{addComma(item.amount)}</div>
      }
      
      <div>{addComma((item.price / item.amount) * addStock)} 원</div>

    </div>
  )
}

export default OrderListItem;