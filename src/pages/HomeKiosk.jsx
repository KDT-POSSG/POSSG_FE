import React from 'react';
import { Link } from 'react-router-dom';

function HomeKiosk() {
  return (
    <div className='home-kiosk-page'>
      <div className='kiosk-title'>
        {/* 안녕하세요<span className='tossface'>&nbsp;💁</span> */}
        안녕하세요!<span className='tossface'>&nbsp;🙋</span>
        <br />
        어떤 걸 도와드릴까요?
      </div>
      <div className='kiosk-container'>
        <Link to={"/product"}>
          <div className='kiosk-box'>
            <span className='tossface kiosk-icon'>📦</span>
            <span className='kiosk-menu-text'>상품 둘러보기</span>
          </div>
        </Link>

        <Link to={"/payment"}>
          <div className='kiosk-box'>
            <span className='tossface kiosk-icon'>💸</span>
            <span className='kiosk-menu-text'>결제하기</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default HomeKiosk;