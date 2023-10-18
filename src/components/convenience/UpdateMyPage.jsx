import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Modal from "components/ui/Modal";
import ChangePw from "./ChangePw";
import { baseURL } from "store/apis/base";

function UpdateMyPage(){

    const navi = useNavigate();

    const accesstokenStorage = localStorage.getItem("accesstoken");

    const [accesstoken, setAccesstoken] = useState("");
    const [userData, setUserData] = useState({
        representativeName: "", 
        phoneNumber: "",  
    });
    const [isPhoneNum, setIsPhoneNum] = useState(false);
    const [phoneNumMsg, setphoneNumMsg] = useState("");

    const onChangeRepreName = (e) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            representativeName: e.target.value
        }));
    };

    const onChangePhoneNum = (e) => {
        const currentPNum = setUserData((prevUserData) => ({
            ...prevUserData,
            phoneNumber: e.target.value
        }));
        console.log("currentPNum >>> ", currentPNum)
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
            setAccesstoken(accesstokenStorage);
            getUserData(accesstokenStorage);
        }
    }, []);

    const getUserData = (accesstoken) => {
        axios.get(`${baseURL}/myPage`, {
            headers: {
                accessToken: `Bearer ${accesstoken}`,
                // Authorization: `Bearer ${accesstoken}`
            },
        })
        .then( (res)=>{
            console.log("res >>> ", res);
            setUserData(res.data);
        })
        .catch( (err)=>{
            console.log(err);
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`${baseURL}/updateMypage`, {
            "representativeName": userData.representativeName,
            "phoneNumber": userData.phoneNumber,
        },{
            headers: {
                accessToken: `Bearer ${accesstokenStorage}`,
            },
        })
        .then((res)=>{
            // console.log("res >>> ", res);
            if(res.data==="YES"){
                toast.success("회원정보 수정완료");
                navi("/");
            }else{
                toast.error("회원정보 수정실패");
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <div className="update-content-wrap">
            <div className="update-title page-title">내 정보 관리</div>
            <div className="update-content">
            <form id="regiForm" method="post" autoComplete="off" onSubmit={onSubmit}>
                    <div className="form-row">
                        <div className="update-container">
                            <input type="text" className="input-text readonly-input" id="id" name="id" value={userData && userData.userId}  
                            />
                            <label className="label-helper" htmlFor="id"><span>아이디</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="update-container">
                            <input type="password" className="input-text readonly-input" id="pw" name="pw" value="********" />
                            <label className="label-helper" htmlFor="pw"><span>비밀번호</span></label>
                            <button className="input-button" type="button" onClick={() => openModal('changePw')}>비밀번호 변경</button>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="update-container">
                            <input type="text" className="update-text readonly-input" id="branchName" name="branchName" value={userData && userData.branchName} />
                            <label className="label-helper" htmlFor="branchName"><span>지점명</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="update-container">
                            <input type="text" className="update-text" id="repreName" name="repreName" value={userData.representativeName} onChange={onChangeRepreName} />
                            <label className="label-helper" htmlFor="repreName"><span>대표자명</span></label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="update-container">
                            <input type="text" className="update-text" id="phoneNum" name="phoneNum" value={userData.phoneNumber} onChange={onChangePhoneNum} />
                            <label className="label-helper" htmlFor="phoneNum"><span>휴대폰번호</span></label>
                            <p className="p-text">{phoneNumMsg}</p>
                        </div>
                    </div>                   
                        <div className="btn-container">
                            <button className="mypage-btn" type="submit" >저장하기</button>
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