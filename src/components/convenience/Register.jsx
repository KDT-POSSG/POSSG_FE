import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


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
    const [phoneNum, setrphoneNum] = useState("");
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

    // 아이디 입력 & 아이디 중복체크
    const onChangeId = (e) => {
        const currentId = e.target.value;
        setId(currentId);
    }
    
    const checkDuplicateId = async (e) => {
        try {
            const res = await axios.post(`http://10.10.10.134:3000/idcheck?id=${id}`);
            if (res.data==="YES") {
                console.log(res.data)
                setIdMsg("");
                setIsId(true);
            } else if(res.data==="NO") {
                console.log(res.data)
                setIdMsg(id +"는 이미 사용중인 아이디입니다.");
                setIsId(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // 아이디 값이 변경될 때마다 중복 여부를 체크
        if (/^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,16}$/.test(id)) {
            setIdMsg("");
            checkDuplicateId();
        } else {
            //setIdMsg("올바른 형식이 아닙니다.");
            setIsId(false);
        }
    }, [id]);
  

    // 본사 지급 번호 유효성
    const onChangeAccountNum = (e) => {
        ///^[0-9]$
        const currentNum = e.target.value;
        setNum(currentNum);
        const numRegExp = /^[0-9]{16}$/
        if (!numRegExp.test(currentNum)) {
            setAccountNumMsg("숫자 16자만 입력해주세요");
            accountNum(false);
        }
        else {          
            setAccountNumMsg("");
            accountNum(true);
        }
    }

    // 비밀번호 유효성
    const onChangePw=(e)=>{
        const currentPw = e.target.value;
        setPw(currentPw);
        const pwRegExp =
          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        if (!pwRegExp.test(currentPw)) {
          setPwMsg("비밀번호 양식을 확인해주세요");
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
        setrphoneNum(currentPNum);
        const numRegExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
        if (!numRegExp.test(currentPNum)) {
            setphoneNumMsg("숫자, '-'만 입력해주세요");
            setIsPhoneNum(false);
        }
        else {          
            setphoneNumMsg("");
            setIsPhoneNum(true);
        }
      };
    
    // 휴대폰 인증번호 유효성
    const onChangeNum = (e) => {
        ///^[0-9]$
        const currentNum = e.target.value;
        setNum(currentNum);
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

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("http://10.10.10.134:3000/adduser", {
            "userId": id,
            "pwd": pw,
            "representativeName": repreName,
            "branchName": branchName,
            "phoneNumber": phoneNum,
            "accountNum": accountNum,
        })
        .then((res)=>{
            console.log(res);
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
                        <input type="text" className="input-text" id="id" name="id" value={id} onChange={onChangeId} placeholder="아이디 (소문자/숫자 6~16자)" />
                        <label className="label-helper" htmlFor="input">아이디 (소문자/숫자 6~16자)</label>
                        <span className="span-text">{idMsg}</span>
                    </div>
                </div>
                <div className="form-row">
                    <div className="input-container">
                        <input type="text" className="input-text" id="accountNum" name="accountNum" placeholder="본사지급번호 (숫자 16자)"/>
                        <label className="label-helper" htmlFor="accountNum">본사지급번호 (숫자 16자)</label>
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
                        <input type="text" className="input-text" id="phoneNum" name="phoneNum" value={phoneNum} onChange={onChangePhoneNum} placeholder="휴대폰번호 (숫자, '-' 만 입력해주세요)" />
                        <label className="label-helper" htmlFor="input">휴대폰번호 (숫자, '-' 만 입력해주세요)</label>
                        <input className="input-button" type="button" value="인증번호받기" />
                        <span className="span-text">{phoneNumMsg}</span>
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-container">
                        <input type="text" className="input-text" id="num" name="num" value={num} onChange={onChangeNum} placeholder="인증번호 (숫자 6자)" />
                        <label className="label-helper" htmlFor="input">인증번호 (숫자 6자)</label>
                        <input className="input-button" type="button" value="인증번호확인" />
                        <span className="span-text">{numMsg}</span>
                    </div>
                </div>



                {/* 약관동의 : 내용, 기능 좀 더 수정해야됨. 약관 필요할까? */}
                {/* 
                https://white-salt.tistory.com/28
                https://hyeoky.tistory.com/24
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
                    <input className="regi-btn" type="submit" value="회원가입" />
                </div>
            </form>
        </div>
    </div>
    )
}

export default Register;