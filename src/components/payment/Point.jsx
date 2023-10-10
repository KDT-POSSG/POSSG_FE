import React from 'react';
import NumberPad from '../ui/NumberPad';
import { useState } from 'react';

function Point() {
  const [inputValue, setInputValue] = useState("");


    return (
      <div className="point">
        <div className="point-header">
          <div className="point-header-title">포인트</div>
        </div>

        <div className="point-body">
          <div className="point-info">
          <div className="point-info-top">
            <input className="point-top-input" placeholder="010-0000-0000"/>
            <button className="point-top-button">조회</button>
          </div>

          <div className="point-info-bottom">
            <div className="tossface point-bottom-img">👤</div>
            <div className="point-bottom-text1">전화번호 전체를 입력하면<br/>신규 고객 등록과 적립이 가능합니다.</div>
          </div>
        </div>

        <div className="point-numpad">
          <NumberPad />
        </div>
        </div>



      </div>
    );
  }
  
  export default Point;