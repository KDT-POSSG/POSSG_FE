import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Modal from "components/ui/Modal";
import ChangePw from "./ChangePw";

function UpdateMyPage(){

    const navi = useNavigate();

    const accesstokenStorage = localStorage.getItem("accesstoken");

    const [accesstoken, setAccesstoken] = useState("");
    const [userData, setUserData] = useState({
        representativeName: "", 
        phoneNumber: "",  
    });
    const [isPhoneNum, setIsPhoneNum] = useState(false); // 폰번호

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
        const numRegExp = /^([0-9]{11})$/;
        // /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
        if (!numRegExp.test(currentPNum)) {
            toast.error("숫자만 입력해주세요");
            setIsPhoneNum(false);
        }
        else {          
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
            // 로컬스토리지에서 토큰가져오기
            setAccesstoken(accesstokenStorage);
            getUserData(accesstokenStorage);
        }
    }, []);

    const getUserData = (accesstoken) => {
        //console.log("b");
        axios.get("http://54.180.60.149:3000/myPage", {
            headers: {
                accessToken: `Bearer ${accesstoken}`,
                Authorization: `Bearer ${accesstoken}`
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
        alert("클릭");
        e.preventDefault();
        axios.post("http://54.180.60.149:3000/updateMypage", {
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
                            <input type="text" className="input-text readonly-input" id="id" name="id" value={userData && userData.userId}  
                            />
                            <label className="label-helper" htmlFor="id"><span>아이디</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="password" className="input-text readonly-input" id="pw" name="pw" value="********" />
                            <label className="label-helper" htmlFor="pw"><span>비밀번호</span></label>
                            <button className="input-button" type="button" onClick={() => openModal('changePw')}>비밀번호 변경</button>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text readonly-input" id="branchName" name="branchName" value={userData && userData.branchName} />
                            <label className="label-helper" htmlFor="branchName"><span>지점명</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="repreName" name="repreName" value={userData.representativeName} onChange={onChangeRepreName} />
                            <label className="label-helper" htmlFor="repreName"><span>대표자명</span></label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="phoneNum" name="phoneNum" value={userData.phoneNumber} onChange={onChangePhoneNum} />
                            <label className="label-helper" htmlFor="phoneNum"><span>휴대폰번호</span></label>
                        </div>
                    </div>

                    
                        <div className="btn-container">
                            <button className="mypage-btn" type="submit" >수정완료</button>
                            {/* disabled={!formIsValid} */}
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