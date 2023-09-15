import React, { useState } from 'react';

function HeaderAlarm() {

  const [isAlarm, setIsAlarm] = useState(true);

  return (
    <div className='header-alarm'>
      <span className="material-symbols-rounded">
        notifications
      </span>
      <div className={isAlarm ? 'alarm-dot' : ''}></div>
    </div>
  )
}

export default HeaderAlarm;