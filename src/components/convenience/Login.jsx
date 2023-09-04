import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login(){
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

    // 상태관리 초기값 세팅
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    // 오류 메세지 전달 상태값 세팅
    const [idMsg, setIdMsg] = useState("");
    const [pwMsg, setPwMsg] = useState("");

    // 유효성 검사
    const [isId, setIsId] = useState(false);
    const [isPw, setIsPw] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);

    const checkFormValidity = () => {
        //어떤 입력 필드가 변경될 때마다 폼의 유효성을 확인하는 함수를 생성
        const idIsValid = id.trim() !== "";
        const pwIsValid = pw.trim() !== "";
    
        setFormIsValid(
            idIsValid &&
            pwIsValid 
        );
    };


    // 아이디 유효성 체크
    const onChangeId = (e) => {
        const currentId = e.target.value;
        setId(currentId);  
        checkFormValidity();
        const idReg1 = /^[a-z][a-z\d]{6,16}$/;
        const idReg2 =  /[0-9]/;
        if(idReg1.test(currentId)){
            if(idReg2.test(currentId)){
                //console.log("A");
                setIdMsg("");
                setIsId(true);
            }
        }else{
            //console.log("C");
            setIdMsg("아이디는 6~16자의 소문자, 숫자만 입력해야합니다");
            setIsId(false);
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

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("http://10.10.10.92:3000/login", {
            "userId": id,
            "pwd": pw,
        })
        .then((res)=>{
            console.log(res.data);
            // if(res.data==="YES"){
            //     alert("로그인성공");
            //     // 토큰저장
            //     localStorage.setItem("id", res.data.id);
            //     localStorage.setItem("pw", res.data.pw);
            // }else if(res.data==="NO"){
            //     alert("로그인실패");
            // }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    //https://velog.io/@plutoin/react-cookie 리액트 쿠키

    return(
        <div className="login-content-wrap">
            <div className="login-title">로그인</div>

            <div className="login-content">
                <form id="loginForm" method="post" autoComplete="off" onSubmit={onSubmit}>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="id" name="id" value={id} onChange={onChangeId} placeholder="아이디 (소문자/숫자 6~16자)" />
                            <label className="label-helper" htmlFor="input">아이디 (소문자/숫자 6~16자)</label>
                            <span className="span-text">{idMsg}</span>
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
                        <div className="check-container">
                            {/* <div><label><input type="checkbox" id="saveId" name="saveId" />아이디저장</label></div> */}
                            <div><label><input type="checkbox" id="saveLogin" name="saveLogin" />로그인유지</label></div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="btn-container">
                            <input className="login-btn" type="submit" value="로그인" disabled={!formIsValid} />
                        </div>
                    </div>
                </form>
            </div>
            <div className="login-link">
                    <Link to="">아이디찾기 | </Link> 
                    <Link to=""> 비밀번호찾기 | </Link>
                    <Link to="/register">회원가입</Link>
            </div>
            
        </div>
    )
}
export default Login;