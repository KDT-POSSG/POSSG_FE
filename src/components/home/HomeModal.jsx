import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import HomeModalList from './HomeModalList';

function HomeModal({ modalClose, homeMenu, isChange, setIsChange }) {

  const accessToken = localStorage.getItem("accesstoken");
  const convSeq = localStorage.getItem("convSeq");

  const [enabledItems, setEnabledItems] = useState([]);
  const [disabledItems, setDisabledItems] = useState([]);

  useEffect(() => {

    const enabled = homeMenu.filter(item => item.favoriteEnable === 'enable');
    const disabled = homeMenu.filter(item => item.favoriteEnable === 'disable');
    setEnabledItems(enabled);
    setDisabledItems(disabled);

  }, []);

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

    for (let i = 0; i < enabledItems.length; i++) {
      menuSeq.push(enabledItems[i].seq);
    }

    axios
      .post(`http://54.180.60.149:3000/addFavoritePage`, {
        convSeq: convSeq,
        seqList: menuSeq
      }, {
        headers: {
          accessToken: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        console.log(response.data);

        if(response.data === "RESET YES ADD YES") {
          modalClose();
          toast.success("즐겨찾기 메뉴 수정이 완료되었습니다");
          setIsChange(!isChange);
        }
        else {
          toast.error("즐겨찾기 메뉴 수정에 실패했습니다");
        }

      })
      .catch((error) => {
        console.error(error);
        toast.error("즐겨찾기 메뉴 수정에 실패했습니다");
      })
  }

  return (
    <div className='home-modal-container'>

      <div className='home-modal'>

        <div className='home-modal-left'>
          <div className='home-modal-title'>즐겨찾기 항목 추가</div>
          <HomeModalList type="disable" list={disabledItems} handleMoveToLeft={handleMoveToLeft} />
        </div>

        <div className='home-modal-right'>
          <div className='home-modal-title'>현재 즐겨찾기 항목</div>
          <HomeModalList type="enable" list={enabledItems} handleMoveToRight={handleMoveToRight}/>
        </div>

      </div>

      <div className='home-modal-confirm'>
        <button onClick={handleSubmit}>확인</button>
      </div>

    </div>
  )
}

export default HomeModal;