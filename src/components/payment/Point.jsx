import React from 'react';
import NumberPad from '../ui/NumberPad';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Modal from 'components/ui/Modal';
import RegisterPoint from './RegisterPoint';
import { addComma } from 'store/utils/function';


function Point({ totalDiscountPrice, pointType, setPointType, usepoint, setUsePoint, phoneNumber, setPhoneNumber, pwd, setPwd, remainingPoint, setRemainingPoint, closeModal }) {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const accesstoken = localStorage.getItem("accesstoken");
  const [activeInput, setActiveInput] = useState('phoneNumber');
  const [response, setResponse] = useState('');
  

  //전화번호 포맷
  const formatPhoneNumber = (phoneString) => {
    let cleaned = ('' + phoneString).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{3})(\d{0,4})(\d{0,4})$/);
    if (match) {
      return `${match[1]}-${match[2]}${match[3].length ? '-' : ''}${match[3]}`;
    }
    return phoneString;
  };


  const checkRegist = () => {
    //전화번호 유효성 검사
    if (phoneNumber.length !== 13) {
      toast.error("올바른 전화번호를 입력해주세요");
      return;
    }
    // 전화번호로 등록되어있는지 확인
    axios.post('http://54.180.60.149:3000/checkPoint', null,{params : {phoneNumber : phoneNumber}, 
    headers:{ accessToken: `Bearer ${accesstoken}`}})
      .then(response => {
        if (response.data === 'YES'){
          console.log("신규 고객이니 가입해라");
          setPhoneNumber(phoneNumber);
          openModal('registerpoint');
        }
        else {
          toast.success("등록된 고객입니다");
          setResponse('ALREADY REGISTER');
          axios.get('http://54.180.60.149:3000/checkNumPoint', {params : {phoneNumber : phoneNumber}, 
          headers:{ accessToken: `Bearer ${accesstoken}`}})
            .then(response => {
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

  // //포인트 사용
  // const usePoint = () => {

    // const usePointData ={
    //   phoneNumber : phoneNumber,
    //   pwd,
    //   point : parseInt(usepoint)
    // }

  //   console.log(usePointData);
  //   axios.post('http://54.180.60.149:3000/usePoint', usePointData, {headers:{ accessToken: `Bearer ${accesstoken}`}})
  //   .then(response => {
  //     if (response.data === 'NO REGISTER'){
  //       console.log("가입되지 않은 고객입니다.");
  //     }
  //     else if (response.data === 'INVALID PASSWORD'){
  //       console.log("비밀번호 오류");
  //       toast.error("비밀번호를 확인해주세요");
  //     }
  //     else if (response.data === 'INSUFFICIENT POINT'){
  //       console.log("포인트 부족");
  //       toast.error("포인트가 부족합니다");
  //     }
  //     else {
  //       console.log("포인트 사용 성공");
  //       console.log('남은 포인트', response.data);
  //       toast.success("포인트 사용 완료");
  //       setUsePoint(usePointData.point);
  //       setPwd(pwd);
  //       closeModal('point');
  //     }
  //   })
  //   .catch(error => {
  //     console.log('실패', error);
  //     console.log(response.data);
  //   });
  // }


  //결제 전, 비밀번호 확인
  const checkPwd = () => {
    const checkPwdData ={
      phoneNumber,
      pwd,
      point : parseInt(usepoint)
    }
    console.log(usepoint)
    if (totalDiscountPrice < parseInt(usepoint)){
      toast.error("결제금액보다 포인트가 많을 수 없습니다")
      // setPhoneNumber('');
      setUsePoint(0);
      setPwd('');
    }
    // else if(parseInt(remainingPoint) < parseInt(usepoint)){
    //   toast.error("포인트가 부족합니다");
    //   // setPhoneNumber('');
    //   setUsePoint(0);
    //   setPwd('');
    // }
    else if(usepoint == 0){
      toast.error("포인트를 입력해주세요");
      // setPhoneNumber('');
      setUsePoint(0);
      setPwd('');
    }
    else{
        axios.post('http://54.180.60.149:3000/searchPoint', checkPwdData, {headers:{ accessToken: `Bearer ${accesstoken}`}})
        .then(response => {
          console.log(response.data);
          if (response.data === -2){
            toast.error("비밀번호를 확인해주세요");
            setUsePoint(0);
            setPwd('');
            return;
          }
          else if(response.data === -3){
            toast.error("포인트가 부족합니다");
            // setPhoneNumber('');
            setUsePoint(0);
            setPwd('');
          }
          else {
              toast.success("결제를 완료하면 포인트가 차감됩니다");
              closeModal('point');
          }
        })
        .catch(error => {
          console.log('실패', error);
        });
      }
    }


  //모달창 열고 닫기
  const openModal = (type) => {
    setPointType(type);
    setModalIsOpen(true);
  };

  
  const handleInputValueChange = (value) => {
    
    switch (activeInput) {
      case 'phoneNumber':
        if (value.length > 13) return;
        const formattedNumber = formatPhoneNumber(value);
        setPhoneNumber(formattedNumber);
        break;
      case 'pwd':
        if (value.length > 4) return;
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
            content: { width : '45%', height : '50%' },
        };}
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
              onClick={() => setActiveInput('phoneNumber')}
              style={{ borderColor: activeInput === 'phoneNumber' ? '#f9bb00' : '#ebebeb' }} 
              />
            <button className="point-top-button" onClick={ checkRegist }>조회</button>
          </div>

          <div className="point-info-bottom">
            {response === 'ALREADY REGISTER' ? (
            <div className="already-customer">
              <div className='remaining-point-container'>
                <div className='remaining-point-text1'>잔여 포인트</div>
                <div className='remaining-point-text2'>{addComma(remainingPoint)} P</div>
              </div>
              <div className='point-container'>
                <div className='point-text'>사용 포인트</div>
                <input className="point-input" 
                  placeholder="0P"
                  value={addComma(usepoint)}
                  onClick={() => setActiveInput('usePoint')}
                  style={{ borderColor: activeInput === 'usePoint' ? '#f9bb00' : '#ebebeb' }} />
              </div>
              <div className='pwd-container'>
                <div className='pwd-text'>비밀번호</div>
                <input className="pwd-input" 
                  type='password' 
                  placeholder="비밀번호" 
                  value={pwd} 
                  onClick={() => setActiveInput('pwd')}
                  style={{ borderColor: activeInput === 'pwd' ? '#f9bb00' : '#ebebeb' }}/>
              </div>
              <div className='point-button-container'>
                <button className="point-button" onClick={checkPwd}>사용하기</button>
              </div>
            </div>
            ) : (
            <div className='not-customer'>
              <div className="tossface point-bottom-img">👤</div>
              <div className="point-bottom-text1">전화번호 전체를 입력하면<br/>신규 고객 등록과 포인트 조회가 가능합니다.</div>
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
        phoneNumber={phoneNumber}
        setResponse={setResponse}
        closeModal={closeModal}
        setRemainingPoint={setRemainingPoint}
        />
    }
    </Modal>


    </div>
  );
}
  
  export default Point;