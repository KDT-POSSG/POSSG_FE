import React from 'react';
import Menu from '../ui/HeaderMenu';
import HeaderToggle from '../ui/HeaderToggle';
import Alarm from '../ui/HeaderAlarm';

function Header() {
  return (
    <div className='possg-header'>

      <div>
        <Menu />
      </div>

      <div>
        <HeaderToggle />
      </div>

      <div>
        <Alarm />
      </div>

    </div>
  )
}

export default Header;