import React from 'react';
import NumberPad from '../ui/NumberPad';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Modal from 'components/ui/Modal';
import RegisterPoint from './RegisterPoint';


function Point({ usepoint, setUsePoint }) {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pointType, setPointType] = useState(null);
  const accesstoken = localStorage.getItem("accesstoken");
  const [activeInput, setActiveInput] = useState('phoneNumber');
  const [response, setResponse] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pwd, setPwd] = useState('');
  const [remainingPoint, setRemainingPoint] = useState('');
  


  //전화번호 포맷
  const formatDate = (phoneString) => {
    if (phoneString.length === 11) {
      return `${phoneString.substring(0, 3)}-${phoneString.substring(3, 7)}-${phoneString.substring(7, 11)}`;
    }
    return phoneString;
  };


  const checkRegist = () => {
    //전화번호 유효성 검사
    if (phoneNumber.length !== 11) {
      toast.error("올바른 전화번호를 입력해주세요.");
      return;
    }
    // 전화번호로 등록되어있는지 확인
    axios.post('http://54.180.60.149:3000/checkPoint', null,{params : {phoneNumber : formatDate(phoneNumber)}, 
    headers:{ accessToken: `Bearer ${accesstoken}`}})
      .then(response => {
        setPhoneNumber(formatDate(phoneNumber));
        if (response.data === 'YES'){
          console.log("신규 고객이니 가입해라");
          openModal('registerpoint');
        }
        else {
          toast.success("기존 고객입니다.");
          setResponse('ALREADY REGISTER');

          axios.get('http://54.180.60.149:3000/checkNumPoint', {params : {phoneNumber : formatDate(phoneNumber)}, 
          headers:{ accessToken: `Bearer ${accesstoken}`}})
            .then(response => {
              console.log(response.data);
              setRemainingPoint(response.data.toString());
            })
            .catch(error => {
              console.log('실패', error);
            });
        }
      })
      .catch(error => {
        console.log('실패', error);
      });
  };

  //포인트 사용
  const usePoint = () => {

    const usePointData ={
      phoneNumber : formatDate(phoneNumber),
      pwd,
      point : parseInt(usepoint)
    }

    console.log(usePointData);
    axios.post('http://54.180.60.149:3000/usePoint', usePointData, {headers:{ accessToken: `Bearer ${accesstoken}`}})
    .then(response => {
      if (response.data === 'NO REGISTER'){
        console.log("가입되지 않은 고객입니다.");
      }
      else if (response.data === 'INVALID PASSWORD'){
        console.log("비밀번호가 일치하지 않습니다.");
      }
      else if (response.data === 'INSUFFICIENT POINT'){
        console.log("포인트가 부족합니다.");
      }
      else {
        console.log("포인트 사용 성공");
        console.log('남은 포인트', response.data);
        toast.success("포인트 사용 완료");
        closeModal();
      }
    })
    .catch(error => {
      console.log('실패', error);
      console.log(response.data);
    });
  }

  //모달창 열고 닫기
  const openModal = (type) => {
    setPointType(type);
    setModalIsOpen(true);
   };
  const closeModal = () => {
      setModalIsOpen(false);
      // if(pointType === 'cashpayreceipt' || pointType === 'paymentreceipt' || pointType === 'cashpayreceiptinfomodal') {
      //     handlePaymentSuccess();
      // }
  };

  
  const handleInputValueChange = (value) => {
    switch (activeInput) {
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'pwd':
        setPwd(value);
        break;
      case 'usePoint':
        setUsePoint(value);
        break;
      default:
        break;
    }
  };

  const getModalStyle = () => {
    if (pointType === 'registerpoint') {
        return {
            content: {
              width : '45%',
              height : '50%',
            },
        };
    }
    return {
          content: {
          },
      };
  };

  return (
    <div className="point">
      <div className="point-header">
        <div className="point-header-title">포인트</div>
      </div>

      <div className="point-body">
        <div className="point-info">
        <div className="point-info-top">
          <input className="point-top-input" 
            placeholder="전화번호 11자리 입력" 
            value={phoneNumber} 
            onClick={() => setActiveInput('phoneNumber')} />
          <button className="point-top-button" onClick={ checkRegist }>조회</button>
        </div>

        <div className="point-info-bottom">
          {response === 'ALREADY REGISTER' ? (
          <div className="already-customer">
          <div className='remaining-point-text'>{remainingPoint}</div>
            <div className='point-container'>
              <div className='point-text'>사용할 포인트</div>
              <input className="point-input" 
                placeholder="0P"
                value={usepoint}
                onClick={() => setActiveInput('usePoint')}/>
            </div>
            <div className='pwd-container'>
              <div className='pwd-text'>비밀번호</div>
              <input className="pwd-input" 
                placeholder="비밀번호" 
                value={pwd} 
                onClick={() => setActiveInput('pwd')}/>
            </div>
            <div className='point-button-container'>
              <button className="point-button" onClick={usePoint}>사용하기</button>
            </div>
          </div>
          ) : (
          <div className='not-customer'>
            <div className="tossface point-bottom-img">👤</div>
            <div className="point-bottom-text1">전화번호 전체를 입력하면<br/>신규 고객 등록과 적립이 가능합니다.</div>
          </div>
          )}
        </div>

      </div>

      <div className="point-numpad">
        <NumberPad 
          onInputValueChange={handleInputValueChange} 
          selectedInputValue={
            activeInput === 'phoneNumber' 
            ? phoneNumber 
            : (activeInput === 'pwd' ? pwd : usepoint) 
        } />
      </div>
      </div>

    <Modal isOpen={modalIsOpen} close={closeModal} style={getModalStyle()}>
    {pointType === 'registerpoint' && 
      <RegisterPoint
        openModal={openModal}
        closeModal={closeModal}
        phoneNumber={phoneNumber}
        setResponse={setResponse}
        />
    }
    </Modal>


    </div>
  );
}
  
  export default Point;