import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Modal from './Modal';
import { useRecoilState } from 'recoil';
import { PosState } from 'store/atom/posState';
import { useNavigate } from 'react-router-dom';

function HeaderToggle() {

  const navi = useNavigate();

  const [checkNumber, setCheckNumber] = useState("");
  // const [isPos, setIsPos] = useState(true);
  const [isPos, setIsPos] = useRecoilState(PosState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpen = () => {
    setIsModalOpen(true);
  }

  const modalClose = () => {
    setIsModalOpen(false);
  }

  const handleCheck = () => {
    modalOpen();
  }

  const handleCheckInput = (e) => {
    setCheckNumber(e.target.value);
  }

  const handleCheckConfirm = () => {

    if(checkNumber == 1234) {
      modalClose();
      setCheckNumber("");
      handleToggle();
    }
    else {
      toast.error("관리자 인증 실패");
    }
  }

  const handleToggle = () => {

    if(isPos) {
      toast.success("KIOSK 모드로 변경");
      navi("/kiosk")
    }
    else {
      toast.success("POS 모드로 변경");
      navi("/");
    }
    setIsPos(!isPos);
  }

  return (
    <>
      <div className='toggle-base'>
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
            <div className="toggle-text kiosk-text" onClick={handleCheck}>KIOSK</div>
          </>
          :
          <>
            <div className="toggle-both toggle-kiosk">
              <div className="toggle-circle toggle-circle-kiosk"></div>
            </div>
            <div className="toggle-text pos-text" onClick={handleCheck}>
              <span className="material-symbols-rounded toggle-lock">lock</span>
              POS
            </div>
            <div className='kiosk-text'>KIOSK</div>
          </>
        }
      </div>

      <Modal isOpen={isModalOpen} onClose={modalClose} style={{ content:{ width:'25rem', height: '15rem' } }}>
        <div className='header-toggle-modal'>
          <div className='toggle-text'>관리자 번호를 입력해주세요</div>
          <div>
            <input type="text" placeholder='관리자 번호' className='toggle-modal-input' value={checkNumber} onChange={handleCheckInput} />
          </div>
          <div className='toggle-btn-container'>
            {/* <button className='toggle-modal-btn toggle-cancel'>취소</button> */}
            <button className='toggle-modal-btn toggle-confirm' onClick={handleCheckConfirm}>확인</button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default HeaderToggle;