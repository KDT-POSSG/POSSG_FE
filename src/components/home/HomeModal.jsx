import React, { useEffect, useState } from 'react';
import homeMenuDatas from '../../assets/datas/homeMenuDatas'

function HomeModal() {

  const [homeMenu, setHomeMenu] = useState([]);
  const [enabledItems, setEnabledItems] = useState([]);
  const [disabledItems, setDisabledItems] = useState([]);

  useEffect(() => {
    setHomeMenu(homeMenuDatas);
  }, []);
  
  useEffect(() => {
    const enabled = homeMenu.filter(item => item.favoriteEnable === 'enable');
    const disabled = homeMenu.filter(item => item.favoriteEnable === 'disable');
    setEnabledItems(enabled);
    setDisabledItems(disabled);
    
    console.log("enabled >> ", enabled);
    console.log("disabled >> ", disabled);
  }, [homeMenu]);

  const handleMoveToRight = (item) => {
    setEnabledItems(prevItems => [...prevItems, item]);
    setDisabledItems(prevItems => prevItems.filter(disabledItem => disabledItem !== item));
  };

  const handleMoveToLeft = (item) => {
    setDisabledItems(prevItems => [...prevItems, item]);
    setEnabledItems(prevItems => prevItems.filter(enabledItem => enabledItem !== item));
  };

  return (
    <div className='home-modal-container'>

      <div className='home-modal'>

        <div className='home-modal-left'>
          <div className='home-modal-title'>현재 즐겨찾기 항목</div>

          <div className='modal-item-container'>
            {
              enabledItems && enabledItems.map((item) => (
                <React.Fragment key={item.seq}>
                  <div className='home-modal-item enable'>
                    <div className='enable-circle' onClick={() => handleMoveToLeft(item)}>
                      <span className="material-symbols-rounded">remove</span>
                    </div>
                    <div>{item.pageName}</div>
                  </div>
                  <hr />
                </React.Fragment>
              ))
            }
          </div>
        </div>

        <div className='home-modal-right'>
          <div className='home-modal-title'>즐겨찾기 항목 추가</div>

          <div className='modal-item-container'>
            {
              disabledItems && disabledItems.map((item) => (
                <React.Fragment key={item.seq}>
                  <div className='home-modal-item disable'>
                    <div className='disable-circle' onClick={() => handleMoveToRight(item)}>
                      <span className="material-symbols-rounded">add</span>
                    </div>
                    <div>{item.pageName}</div>
                  </div>
                  <hr />
                </React.Fragment>
              ))
            }
          </div>
        </div>

      </div>

      <div className='home-modal-confirm'>
        <button>확인</button>
      </div>

    </div>
  )
}

export default HomeModal;