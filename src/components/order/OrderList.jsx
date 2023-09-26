import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { addComma } from 'store/utils/function';

function OrderList({ type, orderList }) {

  const [addStock, setAddStock] = useState(1);

  const handleAddStock = (e) => {

    if(e.target.value === "plus") {
      setAddStock(addStock + 1);
    }
    else if(e.target.value === "minus") {
      if(addStock <= 1) {
        toast.error("수량은 1 미만이 될 수 없습니다");
        return;
      }
      setAddStock(addStock - 1);
    }
    else {
      if(e.target.value < 0) {
        toast.error("수량은 1 미만이 될 수 없습니다");
        return;
      }
      setAddStock(e.target.value);
    }
  }

  return (
    <>
      <div className='ordercart-grid-container'>

        <div className='ordercart-grid ordercart-grid-head'>
          <div>
            {
              type === "before" ?
              <input type="checkbox" className='ordercart-check' value="all" />
              :
              <p>번호</p>
            }
          </div>
          <div>상품 이미지</div>
          <div>상품명</div>
          <div>발주 수량</div>
          <div>총 금액</div>
        </div>

        {
          orderList && orderList.length === 0 ? 
          (
            <div className='ordercart-empty'>
              <span className='tossface ordercart-icon'>📦</span>
              <br /><br />아직 상품이 없습니다
            </div>
          )
          :
          (<></>)
        }

        {
          orderList && orderList.map((item) => (
            <div className='ordercart-grid ordercart-grid-item'>

              <div>
                {
                  type === "before" ?
                  <input type="checkbox" className='ordercart-check' value={1} />
                  :
                  <div>1</div>
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

                    <input type="text" placeholder='수량' value={item.amount} onChange={handleAddStock} /><br/>
                    
                    <button value="plus" onClick={handleAddStock} className='plus'>
                      <span className="material-symbols-rounded stock-calc">add</span>
                    </button>
                  </div>
                </div>
                :
                <div>1</div>
              }
              
              <div>{addComma(item.price)} 원</div>

            </div>
          ))
        }

        {/* <div className='ordercart-grid ordercart-grid-item'>

          <div>
            {
              type === "before" ?
              <input type="checkbox" className='ordercart-check' value={1} />
              :
              <div>1</div>
            }
          </div>

          <div className='ordercart-image'>
            <img src="https://www.emart24.co.kr/image/NDU3ODU=" alt="" />
          </div>

          <div className='ordercart-product-name'>
            <div className='ordercart-product-title'>
              <div className='top'>뉴트로지나데일리바디로션250ml</div>
              <div className='bottom'>개당 가격 : {addComma(11900)} 원</div>
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
            <div>1</div>
          }
          
          <div>{addComma(11900 * 1)} 원</div>

        </div> */}

      </div>

      <div className='order-detail-bottom'>
        <div className='bottom-left'>
          <div className='bottom-text'>총 상품 수량</div>
          <div className='bottom-number'>{addComma(1800)} 개</div>
        </div>
        <div className='bottom-right'>
          <div className='bottom-text'>총 금액</div>
          <div className='bottom-number'>{addComma(12030000)} 원</div>
        </div>
      </div>
    </>
  )
}

export default OrderList;