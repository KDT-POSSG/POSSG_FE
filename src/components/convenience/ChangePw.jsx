import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function ChangePw({ userId, setModalIsOpen }){

    const accesstokenStorage = localStorage.getItem("accesstoken");

    const navi = useNavigate();

    // 상태관리 초기값 세팅
    const [currentPw, setCurrentPw] = useState("");
    const [changePw, setChangePw] = useState("");
    const [pwCheck, setPwCheck] = useState("");

    // 오류 메세지 전달 상태값 세팅
    const [pwMsg, setPwMsg] = useState(""); // 비번
    const [pwCheckMsg, setPwCheckMsg] = useState(""); // 비번확인

    // 유효성 검사
    const [isPw, setIsPw] = useState(false); // 비번
    const [isPwCheck, setIsPwCheck] = useState(false); // 비번확인
    const [formIsValid, setFormIsValid] = useState(false);

    const checkFormValidity = () => {
        const currentPwIsValid = currentPw.trim() !== "";
        const changePwIsValid = changePw.trim() !== "";
        const pwCheckIsValid = pwCheck.trim() !== "";

        setFormIsValid(currentPwIsValid && changePwIsValid && pwCheckIsValid);
    };

    // 비밀번호 유효성
    const onChangePw = (e) => {
        const currentPw = e.target.value;
        setChangePw(currentPw);
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
        if (changePw !== currentPwCheck) {
          setPwCheckMsg("비밀번호가 일치하지 않습니다");
          setIsPwCheck(false);
        } else {
          setPwCheckMsg("");
          setIsPwCheck(true);
        }
      };

    const cancleBtnClick = () => {
        setModalIsOpen(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("http://54.180.60.149:3000/changePassword",{
            "pwd" : currentPw,
            "newPwd" : changePw
        }, {
            headers: {
                accessToken: `Bearer ${accesstokenStorage}`,
            },
        })
        .then((res)=>{
            //console.log("res >>> ", res)
            if(res.data==="YES"){
                toast.success("비밀번호를 변경했습니다");
                setModalIsOpen(false);
            }else{
                toast.error("비밀번호를 다시 확인해주세요");
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    return(
        <div className="pw-content-wrap">
            <div className="pw-title">비밀번호 변경 </div>

            <div className="pw-content">
                <form id="pwForm" method="post" autoComplete="off" onSubmit={onSubmit}>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="password" className="input-text" id="currentPw" name="currentPw" required />
                            <label className="label-helper" htmlFor="currentPw"><span>현재비밀번호</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="password" className="input-text" id="changePw" name="changePw" value={changePw} onChange={onChangePw} required />
                            <label className="label-helper" htmlFor="changePw"><span>새비밀번호</span></label>
                            <p className="p-text">{pwMsg}</p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="password" className="input-text" id="pwCheck" name="pwCheck" value={pwCheck} onChange={onChangePwCheck} required />
                            <label className="label-helper" htmlFor="pwCheck"><span>새비밀번호 확인</span></label>
                            <p className="p-text">{pwCheckMsg}</p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="btn-container">
                            <button type="button" onClick={cancleBtnClick}>취소</button>
                            <button type="submit" disabled={!formIsValid}>변경</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePw;