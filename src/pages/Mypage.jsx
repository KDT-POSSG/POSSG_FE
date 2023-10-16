import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { baseURL } from "store/apis/base";

function MyPage(){
    const navi = useNavigate();
    const [accesstoken, setAccesstoken] = useState("");
    const [userData, setUserData] = useState({});

    const accesstokenStorage = localStorage.getItem("accesstoken");

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
            },
            
        })
        .then( (res)=>{
            // console.log("res >>> " , res);
            // console.log("res.data >>> " , res.data);
            if(res.data){
                setUserData(res.data);
            }else{
                toast.error("내정보 불러오기 실패");
            }
        })
        .catch( (err)=>{
            toast.error("catch 에러");
            console.error("catch 에러 ", err )
        })
    }

    return(
        <div className="mypage-content-wrap">
            <div className="mypage-title page-title">내 정보 보기</div>      
            
            <div className="mypage-content">
                    <div className="form-row">
                        <div className="mypage-container">
                            <input type="text" className="input-text readonly-input" id="id" name="id" value={userData && userData.userId} />
                            <label className="label-helper" htmlFor="id"><span>아이디</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="mypage-container">
                            <input type="password" className="input-text readonly-input" id="pw" name="pw" value="********"  />
                            <label className="label-helper" htmlFor="pw"><span>비밀번호</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="mypage-container">
                            <input type="text" className="input-text readonly-input" id="branchName" name="branchName" value={userData && userData.branchName}  />
                            <label className="label-helper" htmlFor="branchName"><span>지점명</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="mypage-container">
                            <input type="text" className="input-text readonly-input" id="repreName" name="repreName" value={userData && userData.representativeName}  />
                            <label className="label-helper" htmlFor="repreName"><span>대표자명</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="mypage-container">
                            <input type="text" className="input-text readonly-input" id="phoneNum" name="phoneNum" value={userData && userData.phoneNumber}  />
                            <label className="label-helper" htmlFor="phoneNum"><span>휴대폰번호</span></label>
                        </div>
                    </div>
                        <div className="btn-container">
                            <Link to="/updateMypage"><button className="mypage-btn" type="button">관리하러가기</button></Link>
                        </div>
            </div>
        </div>
    )
}
export default MyPage;