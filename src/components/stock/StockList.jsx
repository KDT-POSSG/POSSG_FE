import React, { useState } from 'react';

function StockList() {

  const [isSubOpen, setIsSubOpen] = useState(false);

  const handleSubOpen = () => {
    setIsSubOpen(!isSubOpen);
  }

  return (
    <div className='stock-grid-container'>

      <div className='stock-grid stock-grid-head'>
        <div>번호</div>
        <div>상품명</div>
        <div>재고 수량</div>
        <div>발주 추가</div>
      </div>

      <>
        <div className='stock-grid stock-grid-item'>
          <div>1</div>
          <div className='stock-grid-name'>
            <div>피죤</div>
            <div>
              <span className="material-symbols-rounded sub-btn" onClick={handleSubOpen}>
                expand_more
              </span>
            </div>
          </div>
          <div>5</div>
          <div>발주 추가</div>
        </div>

        <div className={`stock-grid ${isSubOpen ? 'stock-grid-sub' : 'stock-grid-sub-none'}`}>
          <div></div>
          <div className='content'>
            <div>피죤</div>
            <div>2023-08-17</div>
          </div>
          <div></div>
          <div></div>
        </div>
        <div className={`stock-grid ${isSubOpen ? 'stock-grid-sub' : 'stock-grid-sub-none'}`}>
          <div></div>
          <div className='content'>
            <div>피죤</div>
            <div>2023-08-17</div>
          </div>
          <div></div>
          <div></div>
        </div>

        {/* ===== */}

        <div className='stock-grid stock-grid-item'>
          <div>1</div>
          <div className='stock-grid-name'>
            <div>피죤</div>
            <div>
              <span className="material-symbols-rounded sub-btn" onClick={handleSubOpen}>
                expand_more
              </span>
            </div>
          </div>
          <div>5</div>
          <div>발주 추가</div>
        </div>

        <div className={`stock-grid ${isSubOpen ? 'stock-grid-sub' : 'stock-grid-sub-none'}`}>
          <div></div>
          <div className='content'>
            <div>피죤</div>
            <div>2023-08-17</div>
          </div>
          <div></div>
          <div></div>
        </div>

        {/* ===== */}

        <div className='stock-grid stock-grid-item'>
          <div>1</div>
          <div className='stock-grid-name'>
            <div>피죤</div>
            <div>
              <span className="material-symbols-rounded sub-btn" onClick={handleSubOpen}>
                expand_more
              </span>
            </div>
          </div>
          <div>5</div>
          <div>발주 추가</div>
        </div>

        <div className={`stock-grid ${isSubOpen ? 'stock-grid-sub' : 'stock-grid-sub-none'}`}>
          <div></div>
          <div className='content'>
            <div>피죤</div>
            <div>2023-08-17</div>
          </div>
          <div></div>
          <div></div>
        </div>
        <div className={`stock-grid ${isSubOpen ? 'stock-grid-sub' : 'stock-grid-sub-none'}`}>
          <div></div>
          <div className='content'>
            <div>피죤</div>
            <div>2023-08-17</div>
          </div>
          <div></div>
          <div></div>
        </div>
        <div className={`stock-grid ${isSubOpen ? 'stock-grid-sub' : 'stock-grid-sub-none'}`}>
          <div></div>
          <div className='content'>
            <div>피죤</div>
            <div>2023-08-17</div>
          </div>
          <div></div>
          <div></div>
        </div>
        
      </>

    </div>
  )
}

export default StockList;