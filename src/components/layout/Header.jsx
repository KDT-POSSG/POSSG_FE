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
          <div>
            <Link to={"/kiosk"}>
              홈
            </Link>
          </div>
          <div>
            <HeaderToggle />
          </div>
          <div>
            <Link to={"/kiosk"}>
              {pathname}
            </Link>
          </div>
        </>
      }
    </div>
  )
}

export default Header;