import axios from "axios";
import NumberPad from "components/ui/NumberPad";
import { useState } from "react";
import toast from "react-hot-toast";

function RegisterCustomer(){
    const accesstoken = localStorage.getItem("accesstoken");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [pinNumber, setPinNumber] = useState("");
    const [selectedInputIndexPhone, setSelectedInputIndexPhone] = useState(null);
    const [selectedInputIndexPin, setSelectedInputIndexPin] = useState(null);

    const handleInputFocus = (index) => {
        if (index === 0) {
            setSelectedInputIndexPhone(index);
            setSelectedInputIndexPin(null);
        }
        else if (index === 1) {
            setSelectedInputIndexPhone(null);
            setSelectedInputIndexPin(index);
        }
    };
    
    const handleNumberPadInput = (value) => {
        if (selectedInputIndexPhone !== null) {
            if (value === '0' || /^\d{0,11}$/.test(value)) {
                setPhoneNumber(value);
            }
        }
        else if (selectedInputIndexPin !== null) {
            if (value === '0' || /^\d{0,4}$/.test(value)) {
                setPinNumber(value);
            }
        }
    };

    const onClick = (e) => {
        console.log("클릭")
        e.preventDefault();
        axios.post("http://154.180.60.149:3000/addCustomer", {
            phoneNumber: phoneNumber,
            pinNumber: pinNumber,
        }, {
            headers: {
            accessToken: `Bearer ${accesstoken}`,
            Authorization: `Bearer ${accesstoken}`,
            },
        })
        .then((res) => {
            console.log(res.data);
            if(res.data==="YES"){
                toast.success("회원가입 성공했습니다")
            }else{
                toast.error("회원가입 실패했습니다")
            }
        })
        .catch((err) => {
            console.log(err);
            console.log('catch 에러');
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
                        <input type="text" className="input-text" id="pinNumber" name="pinNumber" value={pinNumber} onFocus={() => handleInputFocus(1)} required />
                        <label className="label-helper" htmlFor="pinNumber"><span>결제비밀번호(숫자4자리)</span></label>
                    </div>
                    <div className="info-container">
                        <button className="info-button" type="button" onClick={onClick}>가입하기</button>
                    </div>
                </div>
                <div className="customerRegi-keypad">
                    {/* 숫자패드 */}
                    <NumberPad onInputValueChange={handleNumberPadInput} 
                    selectedInputValue={selectedInputIndexPhone !== null ? phoneNumber : pinNumber}/>
                </div>
            </div>
        </div>
    )
}
export default RegisterCustomer;