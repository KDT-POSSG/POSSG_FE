import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseURL } from "store/apis/base";

function FindPwInfo({id, setModalIsOpen}){
    const navi = useNavigate();

    // 상태관리 초기값 세팅
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
        const changePwIsValid = changePw.trim() !== "";
        const pwCheckIsValid = pwCheck.trim() !== "";
        setFormIsValid(changePwIsValid && pwCheckIsValid);
    };
    
    // 비밀번호 유효성
    const onChangePw = (e) => {
        const currentPw = e.target.value;
        setChangePw(currentPw);
        checkFormValidity();
        const pwRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
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

    const onChangeFindPw = () => {
        if(!changePw || !pwCheck ){
            toast.error("비밀번호 입력 요망");
        }else if(changePw !== pwCheck){
            toast.error("새 비밀번호와 확인 비밀번호가 일치하지 않음");
        }else if(isPw===false){
            toast.error("비밀번호 양식 확인 요망")
        }else{
            axios.post(`${baseURL}/NoSecurityZoneController/findPassword`,{
                "userId" : id,
                "newPwd" : changePw
            })
            .then((res)=>{
                console.log("info res >>> ", res);
                console.log("info res.data >>> ", res.data);
                if(res.data==="YES"){
                    toast.success("비밀번호를 변경했습니다");
                    setModalIsOpen(false);
                    navi("/login");
                }else{
                    toast.error("비밀번호를 다시 확인해주세요");
                }
            })
            .catch((err)=>{
                toast.error("catch 비밀번호 변경 실패");
                    console.error("catch 에러 ", err);
            })
        }
    }

    return(
        <div className="pw-content-wrap">
            <div className="pw-title page-title">비밀번호 변경</div>
            <div className="pw-content">
                <input type="hidden" value={id} />
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
                        <button type="button" onClick={onChangeFindPw}>비밀번호 변경</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FindPwInfo;