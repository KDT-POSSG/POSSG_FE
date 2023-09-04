import React from 'react';

function Stock() {
  return (
    <div className='stock-page'>
      
      <div className='stock-top'>
        <div className='page-title'>재고 관리</div>

        <div className='stock-top-search'>
          <div>
            <input type="text" placeholder='검색할 상품을 입력해주세요' />
            <button>검색</button>
          </div>

          <div>
            <select name="" id="">
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
            </select>
          </div>
        </div>
      </div>

      <div className='stock-list'>
        <table>

          <thead>
            <tr>
              <td>번호</td>
              <td>상품명</td>
              <td>재고 수량</td>
              <td>발주 추가</td>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>1</td>
              <td>피죤</td>
              <td>5</td>
              <td>
                <button>발주 추가</button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>피죤</td>
              <td>5</td>
              <td>
                <button>발주 추가</button>
              </td>
            </tr>

          </tbody>
          
        </table>
      </div>

    </div>
  )
}

export default Stock;