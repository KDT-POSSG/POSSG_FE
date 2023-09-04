import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(){
    // label JS
    document.addEventListener('DOMContentLoaded', () => {
        const input = document.getElementById('input');
        input.addEventListener('input', () => {
            if (input.value !== '') {
                input.classList.add('input-filled');
            } else {
                input.classList.remove('input-filled');
            }
        });
    });

    {/* 
            회원가입 유효성 참고 사이트
            https://velog.io/@dev__note/react-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%ED%8F%BC-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EA%B8%B0%EB%B3%B8-%EA%B5%AC%EC%A1%B0%EC%99%80-%EC%9C%A0%ED%9A%A8%EC%84%B1-%EA%B2%80%EC%82%AC-%EC%84%B8%ED%8C%85
            
            아이디 중복 버튼 없이 아이디 체크
            https://keeper.tistory.com/17

            https://velog.io/@leemember/%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EC%9C%A0%ED%9A%A8%EC%84%B1-%EA%B2%80%EC%82%AC
            */}

    const navi = useNavigate();

    // 상태관리 초기값 세팅
    const [account, setAccount] = useState({
        id: "",
        accountNum: "",
        pw: "",
        branchName: "",
        repreName: "",
        phoneNum: "",
    });
    const [id, setId] = useState("");
    const [accountNum, setAccountNum] = useState("");
    const [pw, setPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");
    const [branchName, setBranchName] = useState("");
    const [repreName, setRepreName] = useState("");
    const [phoneNum, setphoneNum] = useState("");
    const [num, setNum] = useState("");

    // 오류 메세지 전달 상태값 세팅
    const [idMsg, setIdMsg] = useState("");
    const [accountNumMsg, setAccountNumMsg] = useState("");
    const [pwMsg, setPwMsg] = useState("");
    const [pwCheckMsg, setPwCheckMsg] = useState("");
    const [branchNameMsg, setBranchNameMsg] = useState("");
    const [phoneNumMsg, setphoneNumMsg] = useState("");
    const [numMsg, setNumMsg] = useState("");

    // 유효성 검사
    const [isId, setIsId] = useState(false);
    const [isAccount, setIsAccount] = useState(false);
    const [isPw, setIsPw] = useState(false);
    const [isPwCheck, setIsPwCheck] = useState(false); 
    const [isBranchName, setIsBranchName] = useState(false);
    const [isPhoneNum, setIsPhoneNum] = useState(false);
    const [isNum, setIsNum] = useState(false);
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
            branchNameIsValid &&
            repreNameIsValid &&
            phoneNumIsValid
        );
    };

    // 아이디 입력 & 아이디 중복체크
    const onChangeId = (e) => {
        //console.log("e.target.value >> ", e.target.value);
        const currentId = e.target.value;
        setId(currentId);
        checkFormValidity();
        const idReg1 = /^[a-z][a-z\d]{6,16}$/;
        const idReg2 =  /[0-9]/;
        //console.log("currentId >> ", currentId) // 
        if(idReg1.test(currentId)){
            if(idReg2.test(currentId)){
                //console.log("A");
                setIdMsg("");
                //setIsId(true);
            }
        }else{
            //console.log("C");
            setIdMsg("아이디는 6~16자의 소문자, 숫자만 입력해야합니다");
            setIsId(false);
        }
    }
    
    const checkDuplicateId = async (e) => {
        const currentId = id;
        //console.log("currentId >> ", currentId);
        try {
            const res = await axios.post(`http://10.10.10.92:3000/idcheck?userId=${currentId}`);
            //console.log(res);
            if (res.data==="YES") {
                console.log(res.data);
                setIdMsg("");
                setIsId(true);
            } else if(res.data==="NO") {
                console.log(res.data);
                setIdMsg(currentId + "는 이미 사용중인 아이디입니다");
                setIsId(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // 본사 지급 번호 유효성
    const onChangeAccountNum = (e) => {
        ///^[0-9]$
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
        //alert("클릭")
        const currentNum = accountNum;
        //console.log(currentNum);
        try{
            const res = await axios.post(`http://10.10.10.92:3000/keycheck?convKey=${currentNum}`);
            //console.log("res >>> " + res.data);
            if(res.data==="YES"){
                alert("OK");
                setIsAccount(true);
            }else if(res.data==="NO"){
                alert("지급번호를 확인해주세요");
                setIsAccount(false);
            }
        }catch(err){
            console.log(err);
        }
    }

    // 비밀번호 유효성
    const onChangePw = (e) => {
        const currentPw = e.target.value;
        setPw(currentPw);
        checkFormValidity();
        const pwRegExp =
          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
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
    
    const onSendPhoneNum = async(e) => {
        // 인증번호 보내기
        //alert("클릭")
        const currentNum = phoneNum; // 휴대폰번호 가져오기
        //console.log(currentNum);
        try{//to - 번호 / content - 아디
            const res = await axios.post(`http://10.10.10.92:3000/regisend`, { to: currentNum });
            //console.log("res >>> " + res.data);
            if(res.data.statusCode === "202" && res.data.statusName === "success"){
                alert("인증번호가 발송되었습니다");
                setIsPhoneNum(true);
                setNumVisible(true); // 인증번호 입력 필드를 보이도록 설정
            }else{
                alert("휴대폰번호를 확인해주세요");
                setIsPhoneNum(false);
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
    const onCheckNum = async (e) => { // 인증번호 폼데이터로 받아서 파람x
        // 인증번호 확인
        const currentNum = num;
        console.log(currentNum);
        try{
            // 폼 데이터 생성
            const formData = new FormData();
            formData.append("CodeNumber", currentNum);

            // 요청을 보낼 때 Content-Type을 설정하고 폼 데이터를 전달
            // const res = await axios.post("http://10.10.10.92:3000/Authentication", formData, {
            //     headers: {
            //         "Content-Type": "application/x-www-form-urlencoded",
            //     },
            // });
            
            const res = await axios.post("http://10.10.10.92:3000/Authentication", null, {
                params: {
                    CodeNumber: currentNum
                },
            });

            // const res = await axios.post(`http://10.10.10.92:3000/Authentication`, {CodeNumber : currentNum});
            if(res.data==="YES"){
                alert("성공");
                setVerificationCode(true);
            }else if(res.data==="NO"){
                // 인증 실패 처리
                alert("실패");
                setVerificationCode(false);
            }
        }catch(err){
            console.log(err);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("http://10.10.10.92:3000/adduser", {
            //userId,pwd,representativeName,branchName,phoneNumber,convKey
            "userId": id,
            "pwd": pw,
            "representativeName": repreName,
            "branchName": branchName,
            "phoneNumber": phoneNum,
            "convKey": accountNum,
        })
        .then((res)=>{
            console.log(res.data);
            if(res.data==="YES"){
                alert("회원가입성공");
                // 로그인으로
                navi("/login");
                
            }else if(res.data==="NO"){
                alert("회원가입실패");
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <div className="regi-content-wrap">
            <div className="regi-title">회원가입</div>
        
            <div className="regi-content">
                <form id="regiForm" method="post" autoComplete="off" onSubmit={onSubmit}>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="id" name="id" value={id} onChange={onChangeId} onBlur={checkDuplicateId} placeholder="아이디 (소문자/숫자 6~16자)" />
                            <label className="label-helper" htmlFor="input">아이디 (소문자/숫자 6~16자)</label>
                            <span className="span-text">{idMsg}</span>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="accountNum" name="accountNum" onChange={onChangeAccountNum} placeholder="본사 지급 번호 (16자)"/>
                            <label className="label-helper" htmlFor="accountNum">본사 지급 번호 (숫자 16자)</label>
                            <input className="input-button" onClick={onClickAccountNum} type="button" value="인증번호확인" />
                            <span className="span-text">{accountNumMsg}</span>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="password" className="input-text" id="pw" name="pw" value={pw} onChange={onChangePw} placeholder="비밀번호 (대소문자/숫자/특수문자 8자~16자)" />
                            <label className="label-helper" htmlFor="input">비밀번호 (대소문자/숫자/특수문자 8자~16자)</label>
                            <span className="span-text">{pwMsg}</span>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="password" className="input-text" id="pwCheck" name="pwCheck" value={pwCheck} onChange={onChangePwCheck} placeholder="비밀번호 확인 (대소문자/숫자/특수문자 8자~16자)" />
                            <label className="label-helper" htmlFor="input">비밀번호 확인 (대소문자/숫자/특수문자 8자~16자)</label>
                            <span className="span-text">{pwCheckMsg}</span>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="branchName" name="branchName" placeholder="지점명" />
                            <label className="label-helper" htmlFor="input">지점명</label>
                            <span className="span-text">{branchNameMsg}</span>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="repreName" name="repreName" placeholder="대표자명" />
                            <label className="label-helper" htmlFor="input">대표자명</label>
                            <span className="span-text"></span>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="phoneNum" name="phoneNum" value={phoneNum} onChange={onChangePhoneNum} placeholder="휴대폰번호 (숫자만 입력해주세요)" />
                            <label className="label-helper" htmlFor="input">휴대폰번호 (숫자만 입력해주세요)</label>
                            <input className="input-button" onClick={onSendPhoneNum} type="button" value="인증번호받기" />
                            <span className="span-text">{phoneNumMsg}</span>
                        </div>
                    </div>

                    {numVisible && (
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="num" name="num" value={num} onChange={onChangeNum} placeholder="인증번호 (숫자 6자)" />
                            <label className="label-helper" htmlFor="input">인증번호 (숫자 6자)</label>
                            <input className="input-button" onClick={onCheckNum} type="button" value="인증번호확인" />
                            <span className="span-text">{numMsg}</span>
                        </div>
                    </div>
                    )}



                    {/* 약관동의 : 내용, 기능 좀 더 수정해야됨. 약관 필요할까? */}
                    {/* 
                    https://white-salt.tistory.com/28
                    https://hyeoky.tistory.com/24
                    https://velog.io/@94lfnv/React-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0 << 모달로 추천
                    */}
                    {/* <div className="check-wrap">
                        <div className="all-check">
                            <label>
                                <input type="checkbox" id="allCheck" name="allCheck" />전체동의
                            </label>
                        </div>
                        <div>
                            <div>
                                <label><input type="checkbox" />이용약관 (필수)</label>
                            </div>
                            <div>
                                <label><input type="checkbox" />개인정보 수집 및 이용 안내 (필수)</label>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label><input type="checkbox" />마케팅 수신동의 (선택) </label>
                                <label> ( </label>
                                <label><input type="checkbox" /> 이메일 </label>
                                <label><input type="checkbox" /> SMS </label>
                                <label><input type="checkbox" /> 카카오톡 </label>
                                <label> ) </label>
                            </div>
                        </div>
                    </div> */}
                    <div className="form-row">
                        <div className="btn-container">
                            <input className="regi-btn" type="submit" value="회원가입" disabled={!formIsValid} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;