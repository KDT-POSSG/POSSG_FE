import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import NumberPad from "components/ui/NumberPad";

function RegisterPoint({ openModal, closeModal, phoneNumber, setResponse}){
    const [pwd, setPwd] = useState('');
    const accesstoken = localStorage.getItem("accesstoken");
    const handleInputValueChange = (value) => {
        setPwd(value);
      };



    const handleRegiPoint = () => {
        if (pwd.length !== 4) {
            toast.error("올바른 비밀번호를 입력해주세요.");
            return;
          }

        const RegiData = {
        phoneNumber,
        pwd
        }

        axios.post('http://54.180.60.149:3000/newPoint', RegiData, {
            headers: { accessToken: `Bearer ${accesstoken}`,}})
        .then(response => {
            console.log(response.data);
            if (response.data === 'YES'){
                toast.success("가입 완료");
                setResponse('YES');
                closeModal();
                setResponse('ALREADY REGISTER');
            }
        })
        .catch(error => {
            console.log('데이터 전송 실패', error);
        });
    }

    return(
        <div className="registerpoint">
            <div className="registerpoint-title">
                고객 가입
            </div>
            <div>회원정보가 없습니다. 가입을 원하시면 비밀번호를 입력해주세요.</div>
             <input 
        className="registerpoint-input" 
        placeholder="비밀번호 4자리" 
        type='password' 
        value={pwd} 
        readOnly
      />
            <button className="registerpoint-button" onChange={(e) => setPwd(e.target.value)} onClick={handleRegiPoint}>가입하기</button>
            <div className="point-numpad">
            <NumberPad onInputValueChange={handleInputValueChange} selectedInputValue={pwd}/>
        </div>
        </div>
    );
}

export default RegisterPoint;