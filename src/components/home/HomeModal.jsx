import React, { useEffect, useState } from 'react';
import homeMenuDatas from '../../assets/datas/homeMenuDatas'
import axios from 'axios';
import toast from 'react-hot-toast';

function HomeModal({ modalClose }) {

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

  const handleMoveToLeft = (item) => {

    const updatedDisabledItems = disabledItems.filter(disabledItem => disabledItem !== item);
    setDisabledItems(updatedDisabledItems);
    
    const updatedEnabledItems = [...enabledItems, item];
    setEnabledItems(updatedEnabledItems);
  }
  
  const handleMoveToRight = (item) => {
    
    const updatedEnabledItems = enabledItems.filter(enabledItem => enabledItem !== item);
    setEnabledItems(updatedEnabledItems);
    
    const updatedDisabledItems = [...disabledItems, item];
    setDisabledItems(updatedDisabledItems);
  }

  const handleSubmit = () => {

    const menuSeq = [];

    for(let i = 0; i < enabledItems.length; i++) {
      menuSeq.push(enabledItems[i].seq);
    }
    console.log("menuSeq >> ", menuSeq);
    modalClose();
    toast.success("즐겨찾기 메뉴가 수정되었습니다");

    // axios.post('http://10.10.10.81:3000/addFavoritePage', {
    //     convSeq: "1",
    //     seqList: menuSeq
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     modalClose();
    //     toast.success("즐겨찾기 메뉴가 수정되었습니다");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     toast.error("즐겨찾기 메뉴 수정에 실패했습니다");
    //   })
  }

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
                    <div className='enable-circle' onClick={() => handleMoveToRight(item)}>
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
                    <div className='disable-circle' onClick={() => handleMoveToLeft(item)}>
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
        <button onClick={handleSubmit}>확인</button>
      </div>

    </div>
  )
}

export default HomeModal;