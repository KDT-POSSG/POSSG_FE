import React, { useState } from "react";
import NumberPad from '../NumberPad';
import axios from "axios";
import { toast } from "react-hot-toast";


function InvenModal (props) {
    const [selectedInputIndex, setSelectedInputIndex] = useState(null);
    const [inputValues, setInputValues] = useState(Array(8).fill(""));
    const [memo, setMemo] = useState("");
    const currentDateTime = new Date().toISOString();

    const prices = [50000, 10000, 5000, 1000, 500, 100, 50, 10];

    const handleInputFocus = (index) => {
      setSelectedInputIndex(index);
    };
    // NumberPad 컴포넌트에서 값이 변경될 경우 실행되는 함수
    const handleNumberPadInput = (value) => {
      const newInputValues = [...inputValues];
      newInputValues[selectedInputIndex] = value;
      setInputValues(newInputValues);
    };
    // 총 금액을 계산하는 함수
    const calculateTotal = () => {
      return inputValues.reduce((acc, curr, index) => {
        return acc + (parseInt(curr || "0", 10) * prices[index]);
      }, 0);
    };
    // 선택된 입력 필드의 값을 가져옴
    const selectedInputValue = selectedInputIndex !== null ? inputValues[selectedInputIndex] : "";

    const handleMemoChange = (e) => { // memo 입력 처리 함수
      setMemo(e.target.value);
    }

    const sendData = () => {
      const totalCash = calculateTotal();
      const data = {
        "convSeq": 1,
        "rdate": currentDateTime,
        "cash": totalCash,
        "memo": memo
      };
    
    axios.post('http://10.10.10.152:3000/addsettlement', data)
    .then((res) => {
      console.log(res.data);
      console.log('보내기 성공');
      props.updateLastTime(new Date(currentDateTime));
      props.closeModal(); 
      toast.success("시재 추가 완료");
    }).catch((err) => {
      console.log(err);
      console.log('보내기 실패');
    });
  };

    return(
        <>
        <h1 className="modal-title page-title">시재 입력</h1>
        <div className="modal-layout">
            <div className="price-input-container">
                <input value='50,000원' readOnly/>
                <input value='10,000원' readOnly/>
                <input value='5,000원' readOnly/>
                <input value='1,000원' readOnly/>
                <input value='500원' readOnly/>
                <input value='100원' readOnly/>
                <input value='50원' readOnly/>
                <input value='10원' readOnly/>
            </div>
            <div className="input-field-container">
            {Array.from({ length: 8 }).map((_, index) => (
            <input
                key={index}
                value={inputValues[index]}
                onFocus={() => handleInputFocus(index)}
                readOnly
                placeholder="0"
            />
            ))}
            </div>
            <div className="numberpad-container">
            <NumberPad
                onInputValueChange={handleNumberPadInput}
                selectedInputValue={selectedInputValue}
            />
            </div>
        </div>
            <input className="memo" value={ memo } onChange={ handleMemoChange }placeholder="메모를 입력해주세요."/>
        <div className="total-input-container">
            <p className="total-input">총 금액 : { calculateTotal().toLocaleString() }원</p> 
            <button className="modal-button" onClick={ sendData }>저장</button>
        </div>
        
            
        
        </>
    )
}

export default InvenModal;
