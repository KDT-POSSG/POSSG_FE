import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function MyPage(){

    const navi = useNavigate();
    const [accesstoken, setAccesstoken] = useState("");
    const [userData, setUserData] = useState({});

    const accesstokenStorage = localStorage.getItem("accesstoken");
    //console.log("accesstokenStorage >>> " , accesstokenStorage); // 토큰

    // const handleInputChange = (e) => {
    //     setInputValue(e.target.value);
    //   };

    useEffect(() => {
        if(accesstokenStorage){
            // // 로컬스토리지에서 토큰가져오기
            setAccesstoken(accesstokenStorage);
            getUserData(accesstokenStorage);
        }
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

    const getUserData = (accesstoken) => {
        //console.log("b");
        axios.get("http://10.10.10.220:3000/myPage", {
            headers: {
                accessToken: `Bearer ${accesstoken}`,
            },
        })
        .then( (res)=>{
            //console.log("res >>> " , res);
            setUserData(res.data);
        })
        .catch( (err)=>{
            console.log(err);
        })
    }

    return(
        <div className="mypage-content-wrap">
            <div className="mypage-title">회원 정보</div>
        
            
            <div className="mypage-content">
            <form id="regiForm" method="post" autoComplete="off" >
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="id" name="id" value={userData && userData.userId} />
                            <label className="label-helper" htmlFor="id"><span>아이디</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="password" className="input-text" id="pw" name="pw" value="********"  />
                            <label className="label-helper" htmlFor="pw"><span>비밀번호</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="branchName" name="branchName" value={userData && userData.branchName}  />
                            <label className="label-helper" htmlFor="branchName"><span>지점명</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="repreName" name="repreName" value={userData && userData.representativeName}  />
                            <label className="label-helper" htmlFor="repreName"><span>대표자명</span></label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="phoneNum" name="phoneNum" value={userData && userData.phoneNumber}  />
                            <label className="label-helper" htmlFor="phoneNum"><span>휴대폰번호</span></label>
                        </div>
                    </div>

                    
                        <div className="btn-container">
                            <Link to="/updateMypage"><button className="mypage-btn" type="button">회원정보수정</button></Link>
                        </div>
                    </form>
            </div>
        </div>
    )
}
export default MyPage;