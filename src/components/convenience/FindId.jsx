import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Modal from "components/ui/Modal";
import FindIdInfo from "./FindIdInfo";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { baseURL } from "store/apis/base";

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
        axios.post(`${baseURL}/NoSecurityZoneController/findId`, {
            "representativeName": repreName,
            "phoneNumber": phoneNum,
        })
        .then((res)=>{
            // console.log("res.data.user_id >>> ", res.data.user_id);
            const findId = res.data.user_id;
            console.log("findId >>> ", findId)
            if(findId){
                //setFindId(findId);
                openModal(findId);
            }else{
                toast.error("입력된 정보로 가입된 아이디가 없습니다");
            }
        })
        .catch((err)=>{
            toast.error("입력된 정보로 가입된 아이디가 없습니다");
            console.error("catch err", err);
        })
    }

    return(
        <div className="findId-wrap">
        <div className="findId-content-wrap">
            <div className="findId-title page-title">아이디 찾기</div>
            <div className="findId-content">
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
                    <Modal isOpen={modalIsOpen} onClose={closeModal}
                        style={{ content: { width: '30rem', height: 'auto' } }}>
                            <FindIdInfo findId={findId} />
                    </Modal>
                    <div className="link-container">
                        <Link to="/findPw">비밀번호찾기</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="/login">로그인</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="/register">회원가입</Link>
                    </div>
            </div>
        </div>
        </div>
    )
}
export default FindId;