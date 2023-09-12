import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Modal from "components/Modal";
import ChangePw from "./ChangePw";

function UpdateMyPage(){

    const navi = useNavigate();

    const accesstokenStorage = localStorage.getItem("accesstoken");

    const [accesstoken, setAccesstoken] = useState("");
    const [userData, setUserData] = useState({
        repreName: "", // 초기값을 빈 문자열로 설정
        phoneNum: "",  // 초기값을 빈 문자열로 설정
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const checkFormValidity = () => {
        const repreNameIsValid = userData.repreName.trim() !== "";
        const phoneNumIsValid = userData.phoneNum.trim() !== "";

        setFormIsValid(repreNameIsValid && phoneNumIsValid );
    };

    // 대표자명 입력 필드의 값이 변경될 때 호출되는 함수
    const onChangeRepreName = (e) => {
        setUserData({ ...userData, repreName: e.target.value });
        checkFormValidity();
    };

    // 휴대폰번호 입력 필드의 값이 변경될 때 호출되는 함수
    const onChangePhoneNum = (e) => {
        setUserData({ ...userData, phoneNum: e.target.value });
        checkFormValidity();
    };
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [changePw, setChangePw] = useState(null);

    // 모달
    const openModal = (type) => {
        setChangePw(type);
        setModalIsOpen(true);
       };
   
       const closeModal = () => {
       setModalIsOpen(false);
       };

    useEffect(() => {
        if(accesstokenStorage){
            // // 로컬스토리지에서 토큰가져오기
            setAccesstoken(accesstokenStorage);
            getUserData(accesstokenStorage);
        }
    }, []);

    const getUserData = (accesstoken) => {
        //console.log("b");
        axios.get("http://10.10.10.220:3000/myPage", {
            headers: {
                accessToken: `Bearer ${accesstoken}`,
            },
        })
        .then( (res)=>{
            setUserData(res.data);
        })
        .catch( (err)=>{
            console.log(err);
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("http://10.10.10.220:3000/updateMypage", {
            "representativeName": userData.repreName,
            "phoneNumber": userData.phoneNum,
        },{
            headers: {
                accessToken: `Bearer ${accesstokenStorage}`,
            },
        })
        .then((res)=>{
            // console.log("res >>> ", res);
            if(res.data==="YES"){
                toast.success("회원정보를 수정하였습니다");
                navi("/");
            }else{
                toast.error("회원정보수정을 실패하였습니다");
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <div className="mypage-content-wrap">
            <div className="mypage-title">회원 정보 수정</div>
        
            
            <div className="mypage-content">
            <form id="regiForm" method="post" autoComplete="off" onSubmit={onSubmit}>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="id" name="id" value={userData && userData.userId}  />
                            <label className="label-helper" htmlFor="id"><span>아이디</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="password" className="input-text" id="pw" name="pw" value="********" />
                            <label className="label-helper" htmlFor="pw"><span>비밀번호</span></label>
                            <button className="input-button" type="button" onClick={() => openModal('changePw')}>비밀번호 변경</button>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="branchName" name="branchName" value={userData && userData.branchName} />
                            <label className="label-helper" htmlFor="branchName"><span>지점명</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="repreName" name="repreName" value={userData.repreName} onChange={onChangeRepreName} />
                            <label className="label-helper" htmlFor="repreName"><span>대표자명</span></label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="phoneNum" name="phoneNum" value={userData.phoneNum} onChange={onChangePhoneNum} />
                            <label className="label-helper" htmlFor="phoneNum"><span>휴대폰번호</span></label>
                        </div>
                    </div>

                    
                        <div className="btn-container">
                            <button className="mypage-btn" type="submit" disabled={!formIsValid}>수정완료</button>
                        </div>
                    </form>

                    <Modal isOpen={modalIsOpen} onClose={closeModal}
                        style={{ content: { width: '30rem', height: 'auto' } }}>
                        {changePw === 'changePw' && <ChangePw userId={userData.userId} setModalIsOpen={setModalIsOpen} />}
                    </Modal>
            </div>
        </div>
    )
}
export default UpdateMyPage;