import React from 'react';
import HeaderMenu from '../ui/HeaderMenu';
import HeaderToggle from '../ui/HeaderToggle';
import HeaderAlarm from '../ui/HeaderAlarm';

function Header() {
  return (
    <div className='possg-header'>

      <div>
        <HeaderMenu />
      </div>

      <div>
        <HeaderToggle />
      </div>

      <div>
        <HeaderAlarm />
      </div>

    </div>
  )
}

export default Header;