import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Register(){
    // label JS
    // document.addEventListener('DOMContentLoaded', () => {
    //     const input = document.getElementById('input');
    //     input.addEventListener('input', () => {
    //         if (input.value !== '') {
    //             input.classList.add('input-filled');
    //         } else {
    //             input.classList.remove('input-filled');
    //         }
    //     });
    // });

    // const input = document.getElementById("password-input");

    // input.addEventListener("focus", () => {
    // input.parentElement.querySelector("label span").style.top = "-5px";
    // });

    // input.addEventListener("blur", () => {
    // if (input.value === "") {
    //     input.parentElement.querySelector("label span").style.top = "18px";
    // }
    // });

    // input.addEventListener("input", () => {
    // if (input.value === "") {
    //     input.parentElement.querySelector("label span").style.top = "18px";
    // }
    // });

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
                //console.log(res.data);
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
                toast.success("지급번호가 확인되었습니다");
                setIsAccount(true);
            }else if(res.data==="NO"){
                toast.error("지급번호를 확인해주세요");
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
                toast.success("인증번호가 발송되었습니다");
                //setIsPhoneNum(true);
                setNumVisible(true); // 인증번호 입력 필드를 보이도록 설정
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
    const onCheckNum = async (e) => {
        // 인증번호 확인
        const currentNum = num;
        //console.log(currentNum);
        try{
            const res = await axios.post(`http://10.10.10.92:3000/Authentication?CodeNumber=${currentNum}`);
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
                toast.success("회원가입에 성공하였습니다");
                // 로그인으로
                navi("/login");
                
            }else if(res.data==="NO"){
                toast.error("회원가입에 실패하였습니다");
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
                            <input type="text" className="input-text" id="id" name="id" value={id} onChange={onChangeId} onBlur={checkDuplicateId} required />
                            <label className="label-helper" htmlFor="id"><span>아이디 (소문자/숫자 6~16자)</span></label>
                            <p className="p-text">{idMsg}</p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="accountNum" name="accountNum" onChange={onChangeAccountNum} required />
                            <label className="label-helper" htmlFor="accountNum"><span>본사 지급 번호 (숫자 16자)</span></label>
                            <button className="input-button" onClick={onClickAccountNum} type="button">번호 확인</button>
                            {/* <input className="input-button" onClick={onClickAccountNum} type="button" value="지급번호확인" /> */}
                            <p className="p-text">{accountNumMsg}</p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="password" className="input-text" id="pw" name="pw" value={pw} onChange={onChangePw} required />
                            <label className="label-helper" htmlFor="pw"><span>비밀번호 (대소문자/숫자/특수문자 8자~16자)</span></label>
                            <p className="p-text">{pwMsg}</p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="password" className="input-text" id="pwCheck" name="pwCheck" value={pwCheck} onChange={onChangePwCheck} required />
                            <label className="label-helper" htmlFor="pwCheck"><span>비밀번호 확인 (대소문자/숫자/특수문자 8자~16자)</span></label>
                            <p className="p-text">{pwCheckMsg}</p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="branchName" name="branchName" required />
                            <label className="label-helper" htmlFor="branchName"><span>지점명</span></label>
                            <p className="p-text">{branchNameMsg}</p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="repreName" name="repreName" required />
                            <label className="label-helper" htmlFor="repreName"><span>대표자명</span></label>
                            <p className="p-text"></p>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="phoneNum" name="phoneNum" value={phoneNum} onChange={onChangePhoneNum} required />
                            <label className="label-helper" htmlFor="phoneNum"><span>휴대폰번호 (숫자만 입력해주세요)</span></label>
                            <button className="input-button" onClick={onSendPhoneNum} type="button">인증 받기</button>
                            {/* <input className="input-button" onClick={onSendPhoneNum} type="button" value="인증번호받기" /> */}
                            <p className="p-text">{phoneNumMsg}</p>
                        </div>
                    </div>

                    {/* {numVisible && ( */}
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="num" name="num" value={num} onChange={onChangeNum} required />
                            <label className="label-helper" htmlFor="num"><span>인증번호 (숫자 6자)</span></label>
                            <button className="input-button" onClick={onCheckNum} type="button">인증 확인</button>
                            {/* <input className="input-button" onClick={onCheckNum} type="button" value="인증번호확인" /> */}
                            <p className="p-text">{numMsg}</p>
                        </div>
                    </div>
                    {/* )} */}

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
                        <div className="btn-container">
                            <button className="regi-btn" type="submit" disabled={!formIsValid} >회원가입</button>
                            {/* <input className="regi-btn" type="submit" value="회원가입" disabled={!formIsValid} /> */}
                        </div>
                </form>
            </div>
        </div>
    )
}

export default Register;