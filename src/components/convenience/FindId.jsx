import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Modal from "components/ui/Modal";
import FindIdInfo from "./FindIdInfo";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function FindId(){
    // 상태관리 초기값 세팅
    const [repreName, setRepreName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [findId, setFindId] = useState(null);

    // 모달
    const openModal = (type) => {
        setFindId(type);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const onClick = () => {
        // 서버에서 폼데이터로 보냄 -> 폼데이터에 담아서 보내야함
        const formData = new FormData();
        formData.append("representativeName", repreName);
        formData.append("phoneNumber", phoneNum);

        axios.post("http://54.180.60.149:3000/NoSecurityZoneController/findId", formData)
        .then((res)=>{
            //console.log("res.data.user_id >>> ", res.data.user_id);
            const findId = res.data.user_id;
            if(findId){
                //setFindId(findId);
                openModal(findId);
            }else{
                toast.error("입력된 정보로 가입된 아이디가 없습니다");
            }
        })
        .catch((err)=>{
            console.log(err);
        })
      
    }

    return(
        <div className="find-content-wrap">
            <div className="find-title">아이디 찾기</div>

            <div className="find-content">
                <form id="findForm" method="post" autoComplete="off" >
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="repreName" name="repreName" value={repreName} onChange={(e) => setRepreName(e.target.value)} required />
                            <label className="label-helper" htmlFor="currentPw"><span>대표자명</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="phoneNum" name="phoneNum" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} required />
                            <label className="label-helper" htmlFor="changePw"><span>휴대폰번호</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="btn-container">
                            <button type="button" onClick={onClick}>찾기</button>
                        </div>
                    </div>
                </form>
                    <Modal isOpen={modalIsOpen} onClose={closeModal}
                        style={{ content: { width: '30rem', height: 'auto' } }}>
                            <FindIdInfo findId={findId} />
                    </Modal>
                    <div className="link-container">
                        <Link to="/findPw">비밀번호찾기</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <Link to="/login">로그인</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <Link to="/register">회원가입</Link>
                    </div>
            </div>
        </div>
    )
}
export default FindId;