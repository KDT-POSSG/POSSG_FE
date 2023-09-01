import React, { useState } from 'react';

function HeaderToggle() {

  const [isPos, setIsPos] = useState(true);

  const handleToggle = () => {
    setIsPos(!isPos);
  }

  return (
    <>
      <div className='toggle-base' onClick={handleToggle}>
        {
          isPos ? 
          <>
            <div className="toggle-both toggle-pos">
              <div className="toggle-circle toggle-circle-pos"></div>
            </div>
            <div className='pos-text'>
              <span className="material-symbols-rounded toggle-lock-non">lock</span>
              POS
            </div>
            <div className="toggle-text kiosk-text">KIOSK</div>
          </>
          :
          <>
            <div className="toggle-both toggle-kiosk">
              <div className="toggle-circle toggle-circle-kiosk"></div>
            </div>
            <div className="toggle-text pos-text">
              <span className="material-symbols-rounded toggle-lock">lock</span>
              POS
            </div>
            <div className='kiosk-text'>KIOSK</div>
          </>
        }
      </div>
    </>
  )
}

export default HeaderToggle;