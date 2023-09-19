import axios from "axios";
import NumberPad from "components/NumberPad";
import { useState } from "react";

function CustomerRegister(){
    const accesstoken = localStorage.getItem("accesstoken");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [pinNumber, setPinNumber] = useState("");
    // 휴대폰번호 입력 필드에 대한 selectedInputIndex
    const [selectedInputIndexPhone, setSelectedInputIndexPhone] = useState(null);
    // 결제비밀번호 입력 필드에 대한 selectedInputIndex
    const [selectedInputIndexPin, setSelectedInputIndexPin] = useState(null);

    const handleInputFocus = (index) => {
        // 휴대폰번호 입력 필드 선택 시
        if (index === 0) {
            setSelectedInputIndexPhone(index);
            setSelectedInputIndexPin(null);
        }
        // 결제비밀번호 입력 필드 선택 시
        else if (index === 1) {
            setSelectedInputIndexPhone(null);
            setSelectedInputIndexPin(index);
        }
      };
    
    const handleNumberPadInput = (value) => {
        // 휴대폰번호 입력 필드에 값을 추가
        if (selectedInputIndexPhone !== null) {
            const parsedValue = parseInt(phoneNumber + value, 10);
            if (!isNaN(parsedValue)) {
                setPhoneNumber(parsedValue.toString());
            }
        }
        // 결제비밀번호 입력 필드에 값을 추가
        else if (selectedInputIndexPin !== null) {
            const parsedValue = parseInt(pinNumber + value, 10);
            if (!isNaN(parsedValue)) {
                setPinNumber(parsedValue.toString());
            }
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // phoneNumber와 pinNumber를 사용하여 가입 요청
        axios.post("http://10.10.10.109:3000/addcustomer", {
            phoneNumber: phoneNumber,
            pinNumber: pinNumber,
        }, {
            headers: {
            accessToken: `Bearer ${accesstoken}`,
            },
        })
        .then((res) => {
            console.log(res.data);
            console.log('가입 성공');
        })
        .catch((err) => {
            console.log(err);
            console.log('가입 실패');
        });
    }

    return(
        <div className="customerRegi-content-wrap">
            <div className="customerRegi-title">간편 가입</div>
            <div className="customerRegi-content">
                <div className="customerRegi-info">
                    {/* 정보입력칸 */}
                    <div className="info-container">

                        <input type="text" className="input-text" id="phoneNumber" name="phoneNumber" value={phoneNumber} onFocus={() => handleInputFocus(0)} required />
                        <label className="label-helper" htmlFor="phoneNumber"><span>휴대폰번호</span></label>
                    </div>
                    <div className="info-container">
                        <input type="password" className="input-text" id="pinNumber" name="pinNumber" value={pinNumber} onFocus={() => handleInputFocus(1)} required />
                        <label className="label-helper" htmlFor="pinNumber"><span>결제비밀번호(숫자4자리)</span></label>
                    </div>
                </div>
                <div className="customerRegi-keypad">
                    {/* 숫자패드 */}
                    <NumberPad onInputValueChange={handleNumberPadInput} 
                    selectedInputValue={selectedInputIndexPhone !== null ? phoneNumber : pinNumber}/>
                </div>
            </div>
            <div>
                <button type="submit">가입하기</button>
            </div>
        </div>
    )
}
export default CustomerRegister;