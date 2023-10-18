import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "components/ui/Modal";
import FindPwInfo from "./FindPwInfo";
import { baseURL } from "store/apis/base";

function FindPw(){
    // 상태관리 초기값 세팅
    const [id, setId] = useState("");
    const [phoneNum, setphoneNum] = useState("");
    const [num, setNum] = useState("");

    // 오류 메세지 전달 상태값 세팅
    const [idMsg, setIdMsg] = useState(""); // 아이디
    const [phoneNumMsg, setphoneNumMsg] = useState(""); //폰번호
    const [numMsg, setNumMsg] = useState(""); //인증번호

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [findPw, setFindPw] = useState(null);

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

    // 모달
    const openModal = () => {
        if(!id || !phoneNum || !num){
            toast.error("정보를 입력해주세요")
            setModalIsOpen(false);
        }else{
            if(verificationCode===true){
                console.log("verificationCode >>>", verificationCode)
                setModalIsOpen(true)
            }else{
                toast.error("휴대폰 인증을 확인해주세요")
                setModalIsOpen(false);
            }
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
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

    // 휴대폰 번호 유효성
    const onChangePhoneNum = (e) => {
        const currentPNum = e.target.value;
        setphoneNum(currentPNum);
        checkFormValidity();
        const numRegExp = /^([0-9]{11})$/;
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
        const currentId = id;  
        const currentNum = phoneNum; 
        if(!phoneNum){
            toast.error("휴대폰 번호를 입력해주세요")
        }else{
            try{//to - 번호 / content - 아디
                const res = await axios.post(`${baseURL}/NoSecurityZoneController/send`, { to: currentNum, content : currentId });
                console.log("res >>> " + res);
                console.log("res.data >>> " + res.data);
                if(res.data.statusCode === "202" && res.data.statusName === "success"){
                    toast.success("인증번호 발송완료");
                }else{
                    toast.error("인증번호 발송실패");
                }
            }catch(err){
                toast.error("휴대폰 번호 확인해주세요");
                console.error("catch err ", err);
            }
        }
    }

    // 휴대폰 인증번호 유효성
    const onChangeNum = (e) => {
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
        if(!num){
            toast.error("인증번호를 입력해주세요")
        }else{
            try{
                const res = await axios.post(`${baseURL}/NoSecurityZoneController/Authentication?CodeNumber=${currentNum}`);
                console.log("res >>> ", res)
                if(res.data==="YES"){
                    toast.success("휴대폰 인증성공")
                    setVerificationCode(true);
                }else if(res.data==="NO"){
                    // 인증 실패 처리
                    toast.error("인증번호 확인요망");
                    setVerificationCode(false);
                }
            }catch(err){
                toast.error("인증번호 실패");
                console.error("catch err ", err);
            }
        }
    }

    return(
        <div className="findPw-wrap">
            <div className="findPw-content-wrap">
                <div className="findPw-title  page-title">비밀번호 찾기</div>
                <div className="findPw-content">
                    <div className="form-row">
                            <div className="input-container">
                                <input type="text" className="input-text" id="id" name="id" value={id} onChange={onChangeId} required />
                                <label className="label-helper" htmlFor="id"><span>아이디</span></label>
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
                                <button type="button" onClick={() => openModal()}>찾기</button>
                            </div>
                        </div>
                        <div className="link-container">
                            <Link to="/findId">아이디찾기</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to="/login">로그인</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to="/register">회원가입</Link>
                        </div>
                        <Modal isOpen={modalIsOpen} onClose={closeModal}
                            style={{ content: { width: '30rem', height: 'auto' } }}>
                            <FindPwInfo id={id} setModalIsOpen={setModalIsOpen} />
                        </Modal>
                </div>
            </div>
        </div>
    )
}
export default FindPw;