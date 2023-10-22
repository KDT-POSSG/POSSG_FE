import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { baseURL } from "store/apis/base";

function Register(){

    const navi = useNavigate();

    // 상태관리 초기값 세팅
    const [id, setId] = useState("");
    const [accountNum, setAccountNum] = useState("");
    const [pw, setPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");
    const [branchName, setBranchName] = useState("");
    const [repreName, setRepreName] = useState("");
    const [phoneNum, setphoneNum] = useState("");
    const [num, setNum] = useState("");

    // 오류 메세지 전달 상태값 세팅
    const [idMsg, setIdMsg] = useState(""); // 아이디
    const [accountNumMsg, setAccountNumMsg] = useState(""); // 본사지급번호
    const [pwMsg, setPwMsg] = useState(""); // 비번
    const [pwCheckMsg, setPwCheckMsg] = useState(""); // 비번확인
    const [branchNameMsg, setBranchNameMsg] = useState(""); // 지점명
    const [phoneNumMsg, setphoneNumMsg] = useState(""); //폰번호
    const [numMsg, setNumMsg] = useState(""); //인증번호

    // 유효성 검사
    const [isId, setIsId] = useState(false); // 아이디
    const [isAccount, setIsAccount] = useState(false); // 계정
    const [isPw, setIsPw] = useState(false); // 비번
    const [isPwCheck, setIsPwCheck] = useState(false); // 비번확인
    const [isBranchName, setIsBranchName] = useState(false); // 지점명
    const [isPhoneNum, setIsPhoneNum] = useState(false); // 폰번호
    const [isNum, setIsNum] = useState(false); // 인증번호
    const [numVisible, setNumVisible] = useState(false); // 인증번호 입력칸 보이게
    const [verificationCode, setVerificationCode] = useState(""); // 인증번호 상태

    const [formIsValid, setFormIsValid] = useState(false);

    const checkFormValidity = () => {
        //어떤 입력 필드가 변경될 때마다 폼의 유효성을 확인하는 함수를 생성
        const idIsValid = id.trim() !== "";
        const accountNumIsValid = accountNum.trim() !== "";
        const pwIsValid = pw.trim() !== "";
        const pwCheckIsValid = pwCheck.trim() !== "";
        const branchNameIsValid = branchName.trim() !== ""; 
        const repreNameIsValid = repreName.trim() !== "";
        const phoneNumIsValid = phoneNum.trim() !== "";
        setFormIsValid(
            idIsValid &&
            accountNumIsValid &&
            pwIsValid &&
            pwCheckIsValid &&
            phoneNumIsValid 
        );
    };

    // console.log(isId+"/"+isAccount+"/"+isPw+"/"+isPwCheck+"/"+isPhoneNum+"/"+isNum+"/");

    // 아이디 입력 & 아이디 중복체크
    const onChangeId = (e) => {
        const currentId = e.target.value;
        setId(currentId);
        checkFormValidity();
        const idReg1 = /^[a-z][a-z\d]{6,16}$/;
        const idReg2 =  /[0-9]/;
        if(idReg1.test(currentId)){
            if(idReg2.test(currentId)){
                setIdMsg("");
                setIsId(true);
            }else{
                setIdMsg("아이디는 6~16자의 소문자, 숫자만 입력해야합니다");
                setIsId(false);
            }
        }else{
            setIdMsg("아이디는 6~16자의 소문자, 숫자만 입력해야합니다");
            setIsId(false);
        }
    }   

    const checkDuplicateId = async (e) => {
        const currentId = id;
        setId(currentId);
        const idReg = /^[a-z][a-z0-9]{6,16}$/
        //console.log("currentId >> ", currentId);
        try {
            const res = await axios.post(`${baseURL}/NoSecurityZoneController/idcheck?userId=${currentId}`);
            console.log("res >>> ", res);
            if (res.data==="YES") {
                console.log("res.data >>> ", res.data);
                setIsId(true);
            } else if(res.data==="NO") {
                setIdMsg(currentId + "는 이미 사용중인 아이디입니다");
                setIsId(false);
            }
        } catch (err) {
            console.error("catch err ", err);
        }
    }

    // 본사 지급 번호 유효성
    const onChangeAccountNum = (e) => {
        const currentNum = e.target.value;
        setAccountNum(currentNum);
        checkFormValidity();
        const numRegExp = /^[a-zA-Z0-9]{16}$/;
        if (!numRegExp.test(currentNum)) {
            setAccountNumMsg("지급 번호 형식을 확인해주세요");
            setIsAccount(false);
        }
        else {          
            setAccountNumMsg("");
            setIsAccount(true);
        }
    }

    const onClickAccountNum = async(e) => {
        const currentNum = accountNum;
        //console.log(currentNum);
        try{
            const res = await axios.post(`${baseURL}/NoSecurityZoneController/keyCheck?convKey=${currentNum}`);
            //console.log("res >>> " + res.data);
            if(res.data==="YES"){
                toast.success("지급번호 확인 완료");
                setIsAccount(true);
            }else if(res.data==="NO"){
                toast.error("지급번호 확인 실패");
                setIsAccount(false);
            }
        }catch(err){
            console.error("catch err ", err);
        }
    }

    // 비밀번호 유효성
    const onChangePw = (e) => {
        const currentPw = e.target.value;
        setPw(currentPw);
        checkFormValidity();
        const pwRegExp =
            /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,16}$/;
        if (!pwRegExp.test(currentPw)) {
            setPwMsg("비밀번호 형식을 확인해주세요");
            setIsPw(false);
        } else {
            setPwMsg("");
            setIsPw(true);
        }
    };

    // 비밀번호 확인 유효성
    const onChangePwCheck=(e)=>{
        const currentPwCheck = e.target.value;
        setPwCheck(currentPwCheck);
        checkFormValidity();
        if (pw !== currentPwCheck) {
            setPwCheckMsg("비밀번호가 일치하지 않습니다");
            setIsPwCheck(false);
        } else {
            setPwCheckMsg("");
            setIsPwCheck(true);
        }
    };

    const branchNameBlur = (e) => {
        if(!branchName.endsWith("점")){
            setBranchName(branchName+"점");
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
        const currentNum = phoneNum; // 휴대폰번호 가져오기
        //console.log(currentNum);
        try{//to - 번호 / content - 아디
            const res = await axios.post(`${baseURL}/NoSecurityZoneController/regiSend`, { to: currentNum });
            //console.log("res >>> " + res.data);
            if(res.data.statusCode === "202" && res.data.statusName === "success"){
                toast.success("인증번호 발송완료");
                setNumVisible(true); 
            }else{
                toast.error("인증번호 발송실패");
            }
        }catch(err){
            console.error("catch err ", err);
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
            const res = await axios.post(`${baseURL}/NoSecurityZoneController/Authentication?CodeNumber=${currentNum}`);
            //console.log(res.data);
            if(res.data==="YES"){
                //alert("성공");
                toast.success("휴대폰 인증성공")
                setVerificationCode(true);
            }else if(res.data==="NO"){
                // 인증 실패
                toast.error("휴대폰 인증실패");
                setVerificationCode(false);
            }
        }catch(err){
            console.error("catch err ", err);
        }
    }

    const register = () => {
        if(!isId || !isAccount || !isPw || !isPwCheck || !isPhoneNum || !isNum){
            toast.error("회원가입 실패")
        }else{
            axios.post(`${baseURL}/NoSecurityZoneController/addUser`, {
                //userId,pwd,representativeName,branchName,phoneNumber,convKey
                "userId": id,
                "pwd": pw,
                "representativeName": repreName,
                "branchName": branchName,
                "phoneNumber": phoneNum,
                "convKey": accountNum,
            })
            .then((res)=>{
                console.log("onSubmit res.data >>> ",res.data);
                if(res.data==="YES"){
                    toast.success("회원가입 성공");
                    navi("/login");
                }else{
                    // toast.error("회원가입 실패");
                }
            })
            .catch((err)=>{
                toast.error("회원가입 실패");
                console.error("catch 에러 ", err);
            })
        }
    }

    return(
        <div className="regi-content-wrap">
            <div className="regi-title page-title">회원가입</div>
        
            <div className="regi-content">
                <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="id" name="id" value={id} onChange={onChangeId} onBlur={checkDuplicateId} required />
                            <label className="label-helper" htmlFor="id"><span>아이디 (소문자 + 숫자 6~16자)</span></label>
                            <p className="p-text">{idMsg}</p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="accountNum" name="accountNum" onChange={onChangeAccountNum} required />
                            <label className="label-helper" htmlFor="accountNum"><span>본사 지급 번호 (숫자 16자)</span></label>
                            <button className="input-button" onClick={onClickAccountNum} type="button">번호 확인</button>
                            <p className="p-text">{accountNumMsg}</p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="password" className="input-text" id="pw" name="pw" value={pw} onChange={onChangePw} required />
                            <label className="label-helper" htmlFor="pw"><span>비밀번호 (대소문자 + 숫자 + 특수문자(!, @, #, $, %, ^, &, *) 8자~16자)</span></label>
                            <p className="p-text">{pwMsg}</p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="password" className="input-text" id="pwCheck" name="pwCheck" value={pwCheck} onChange={onChangePwCheck} required />
                            {/* <label className="label-helper" htmlFor="pwCheck"><span>비밀번호 확인 (대소문자 + 숫자 + 특수문자(!, @, #, $, %, ^, &, *) 8자~16자)</span></label> */}
                            <label className="label-helper" htmlFor="pwCheck"><span>비밀번호 확인</span></label>
                            <p className="p-text">{pwCheckMsg}</p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="branchName" name="branchName" value={branchName} onChange={(e)=>{setBranchName(e.target.value)}} onBlur={branchNameBlur} required />
                            <label className="label-helper" htmlFor="branchName"><span>지점명</span></label>
                            <p className="p-text">{branchNameMsg}</p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="repreName" name="repreName" value={repreName} onChange={(e)=>{setRepreName(e.target.value)}} required />
                            <label className="label-helper" htmlFor="repreName"><span>대표자명</span></label>
                            <p className="p-text"></p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="phoneNum" name="phoneNum" value={phoneNum} onChange={onChangePhoneNum} required />
                            <label className="label-helper" htmlFor="phoneNum"><span>휴대폰번호 (숫자만 입력)</span></label>
                            <button className="input-button" onClick={onSendPhoneNum} type="button">인증 받기</button>
                            <p className="p-text">{phoneNumMsg}</p>
                        </div>
                    </div>
                    {numVisible && (
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="num" name="num" value={num} onChange={onChangeNum} required />
                            <label className="label-helper" htmlFor="num"><span>인증번호 (숫자 6자)</span></label>
                            <button className="input-button" onClick={onCheckNum} type="button">인증 확인</button>
                            <p className="p-text">{numMsg}</p>
                        </div>
                    </div>
                    )}
                        <div className="btn-container">
                            <button className="regi-btn" type="button" onClick={register}>회원가입</button>
                        </div>
            </div>
        </div>
    )
}
export default Register;