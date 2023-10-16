import React from 'react';
import HeaderMenu from '../ui/HeaderMenu';
import HeaderToggle from '../ui/HeaderToggle';
import HeaderAlarm from '../ui/HeaderAlarm';
import { useRecoilValue } from 'recoil';
import { PosState } from 'store/atom/posState';
import { Link, useLocation } from 'react-router-dom';

function Header() {

  const isPos = useRecoilValue(PosState);
  const { pathname } = useLocation();

  return (
    <div className='possg-header'>
      {
        isPos ? 
        <>
          <div>
            <HeaderMenu />
          </div>

          <div>
            <HeaderToggle />
          </div>

          <div>
            <HeaderAlarm />
          </div>
        </>
        :
        <>
          {
            pathname === "/kiosk" ?
            <div></div>
            :
            <div className='kiosk-header kiosk-header-left'>
              <Link to={"/kiosk"}>
                <div className='kiosk-header-item'>
                  <span class="material-symbols-rounded kiosk-home-icon">home</span>
                  홈
                </div>
              </Link>
            </div>
          }

          <div>
            <HeaderToggle />
          </div>

          {
            pathname === "/kiosk" ?
            <div></div>
            :
            <div className='kiosk-header kiosk-header-right'>
              <Link to={ pathname === "/payment" ? "/product" : "/payment" }>
                <div className='kiosk-header-item'>
                  <span class="material-symbols-rounded kiosk-home-icon">touch_app</span>
                  { pathname === "/payment" ? "상품 둘러보기" : "결제하기" }
                </div>
              </Link>
            </div>
          }
        </>
      }
    </div>
  )
}

export default Header;