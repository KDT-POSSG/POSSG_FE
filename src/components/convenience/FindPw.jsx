import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function FindPw(){
    // 상태관리 초기값 세팅
    const [id, setId] = useState("");
    const [phoneNum, setphoneNum] = useState("");
    const [num, setNum] = useState("");

    // 오류 메세지 전달 상태값 세팅
    const [phoneNumMsg, setphoneNumMsg] = useState(""); //폰번호
    const [numMsg, setNumMsg] = useState(""); //인증번호

    // 유효성 검사
    const [isId, setIsId] = useState(false); // 아이디
    const [isPhoneNum, setIsPhoneNum] = useState(false); // 폰번호
    const [isNum, setIsNum] = useState(false); // 인증번호
    const [verificationCode, setVerificationCode] = useState(""); // 인증번호 상태
    const [formIsValid, setFormIsValid] = useState(false);

    const checkFormValidity = () => {
        const idIsValid = id.trim() !== "";
        const phoneNumIsValid = phoneNum.trim() !== "";
        const numIsValid = num.trim() !== ""
        setFormIsValid(idIsValid && phoneNumIsValid && numIsValid);
    };

    // 아이디 입력
    const onChangeId = (e) => {
        const currentId = e.target.value;
        setId(currentId);
        checkFormValidity();
        const idReg1 = /^[a-z][a-z\d]{6,16}$/;
        const idReg2 =  /[0-9]/;
        //console.log("currentId >> ", currentId) // 
        if(idReg1.test(currentId)){
            if(idReg2.test(currentId)){
                // setIdMsg("");
                setIsId(true);
            }
        }else{
            // setIdMsg("아이디는 6~16자의 소문자, 숫자만 입력해야합니다");
            setIsId(false);
        }
    }

    // 휴대폰 번호 유효성
    const onChangePhoneNum = (e) => {
        const currentPNum = e.target.value;
        setphoneNum(currentPNum);
        checkFormValidity();
        const numRegExp = /^([0-9]{11})$/;
        // /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
        if (!numRegExp.test(currentPNum)) {
            setphoneNumMsg("숫자만 입력해주세요");
            setIsPhoneNum(false);
        }
        else {          
            setphoneNumMsg("");
            setIsPhoneNum(true);
        }
    };

    // 인증번호 보내기
    const onSendPhoneNum = async(e) => {
        //alert("클릭")
        const currentId = id;   // 아이디 가져오기
        const currentNum = phoneNum; // 휴대폰번호 가져오기
        console.log(currentId);
        console.log(currentNum);
        try{//to - 번호 / content - 아디
            const res = await axios.post(`http://10.10.10.109:3000/send`, { to: currentNum, content : currentId });
            console.log("res >>> " + res.data);
            if(res.data.statusCode === "202" && res.data.statusName === "success"){
                toast.success("인증번호가 발송되었습니다");
            }else{
                toast.error("휴대폰번호를 확인해주세요");
                //setIsPhoneNum(false);
            }
        }catch(err){
            console.log(err);
        }
    }

    // 휴대폰 인증번호 유효성
    const onChangeNum = (e) => {
        // 인증번호 입력
        //^[0-9]$
        const currentNum = e.target.value;
        setNum(currentNum);
        checkFormValidity();
        const numRegExp = /^[0-9]{6}$/
        if (!numRegExp.test(currentNum)) {
            setNumMsg("숫자 6자만 입력해주세요");
            setIsNum(false);
        }
        else {          
            setNumMsg("");
            setIsNum(true);
        }
    }

    // 인증번호 확인
    const onCheckNum = async (e) => {
        const currentNum = num;
        //console.log(currentNum);
        try{
            const res = await axios.post(`http://10.10.10.109:3000/Authentication?CodeNumber=${currentNum}`);
            //console.log("a");
            //console.log(res.data);
            if(res.data==="YES"){
                //alert("성공");
                toast.success("휴대폰 인증에 성공하였습니다")
                setVerificationCode(true);
            }else if(res.data==="NO"){
                // 인증 실패 처리
                toast.error("인증번호를 확인해주세요");
                setVerificationCode(false);
            }
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="find-content-wrap">
            <div className="find-title">비밀번호 찾기</div>

            <div className="find-content">
                <form id="findForm" method="post" autoComplete="off" >
                <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="id" name="id" value={id} onChange={onChangeId} required />
                            <label className="label-helper" htmlFor="id"><span>아이디 (소문자+숫자 6~16자)</span></label>
                            {/* <p className="p-text">{idMsg}</p> */}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="phoneNum" name="phoneNum" value={phoneNum} onChange={onChangePhoneNum} required />
                            <label className="label-helper" htmlFor="phoneNum"><span>휴대폰번호 (숫자만 입력해주세요)</span></label>
                            <button className="input-button" onClick={onSendPhoneNum} type="button">인증 받기</button>
                            <p className="p-text">{phoneNumMsg}</p>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="num" name="num" value={num} onChange={onChangeNum} required />
                            <label className="label-helper" htmlFor="num"><span>인증번호 (숫자 6자)</span></label>
                            <button className="input-button" onClick={onCheckNum} type="button">인증 확인</button>
                            <p className="p-text">{numMsg}</p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="btn-container">
                            <button type="submit" disabled={!formIsValid}>찾기</button>
                        </div>
                    </div>
                </form>
                    <div className="link-container">
                        <Link to="/findId">아이디찾기</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <Link to="/login">로그인</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <Link to="/register">회원가입</Link>
                    </div>
            </div>
        </div>
    )
}
export default FindPw;