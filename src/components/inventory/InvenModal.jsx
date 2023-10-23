import React, { useState } from "react";
import NumberPad from "../ui/NumberPad";
import axios from "axios";
import { toast } from "react-hot-toast";

function InvenModal({ updateLastTime, onLoad }) {
  const [selectedInputIndex, setSelectedInputIndex] = useState(null);
  const [inputValues, setInputValues] = useState(Array(8).fill(""));
  const [memo, setMemo] = useState("");
  const currentDateTime = new Date().toISOString();
  const accesstoken = localStorage.getItem("accesstoken");
  const prices = [50000, 10000, 5000, 1000, 500, 100, 50, 10];
  const convSeq = localStorage.getItem("convSeq");

  //입력 받은 시제 데이터를 서버로 보내기
  const sendData = () => {
    const totalCash = calculateTotal();
    const data = {
      convSeq: convSeq,
      rdate: currentDateTime,
      cash: totalCash,
      memo: memo,
    };

    axios
      .post("http://54.180.60.149:3000/addsettlement", data, {
        headers: { accessToken: `Bearer ${accesstoken}` },
      })
      .then((res) => {
        console.log(res.data);
        console.log("보내기 성공");
        updateLastTime(new Date(currentDateTime));
        onLoad();
        toast.success("시재가 입력되었습니다");
      })
      .catch((err) => {
        console.log(err);
        console.log("보내기 실패");
        toast.error("시재 입력에 실패했습니다");
      });
  };

  //어느 금액에 포커스 되었는지
  const handleInputFocus = (index) => {
    setSelectedInputIndex(index);
  };

  //숫자패드 입력
  const handleNumberPadInput = (value) => {
    const newInputValues = [...inputValues];
    newInputValues[selectedInputIndex] = value;
    setInputValues(newInputValues);
  };

  //총 금액 계산
  const calculateTotal = () => {
    return inputValues.reduce((acc, curr, index) => {
      return acc + parseInt(curr || "0", 10) * prices[index];
    }, 0);
  };

  //
  const selectedInputValue =
    selectedInputIndex !== null ? inputValues[selectedInputIndex] : "";

  //메모 입력
  const handleMemoChange = (e) => {
    setMemo(e.target.value);
  };

  return (
    <div className="inventorymodal">
      <div className="page-title">시재 입력</div>
      <div className="modal-layout">
        <div className="price-input-container">
          <input value="50,000 원" readOnly />
          <input value="10,000 원" readOnly />
          <input value="5,000 원" readOnly />
          <input value="1,000 원" readOnly />
          <input value="50 원" readOnly />
          <input value="100 원" readOnly />
          <input value="50 원" readOnly />
          <input value="10 원" readOnly />
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
      <input
        className="memo"
        value={memo}
        onChange={handleMemoChange}
        placeholder="메모를 입력해주세요."
      />
      <div className="total-input-container">
        <p className="total-input">
          총 금액&nbsp; {calculateTotal().toLocaleString()} 원
        </p>
        <button className="modal-button" onClick={sendData}>
          저장
        </button>
      </div>
    </div>
  );
}

export default InvenModal;
