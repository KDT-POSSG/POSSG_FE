import axios from "axios";
import { useState, useEffect } from "react";

function MyPage(){

    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);

    // const mypage = (e) => {
        axios.get("http://10.10.10.92:3000/myPage", {
            headers: {
                accessToken: `Bearer ${accessToken}`, // 토큰을 헤더에 포함시킴
            },
          })
          .then( (res) => {
            console.log("res >>> ",res);
            if(res.status===200){
                // 서버에서 회원 정보를 가져온 후 처리
                const userData = res.data; // 서버에서 받은 회원 정보
                console.log("userData >>> ",userData);
                // userData를 사용하여 원하는 정보를 가져올 수 있음
                // const userId = userData.id;
                // const userPassword = userData.password;
            }
            
            

            // 가져온 정보를 사용하여 필요한 작업을 수행
          }).catch( (err) => {
            console.log(err);
          })
    // }

    // useEffect( ()=> {
    //     mypage();
    // })
    

    return(
        <div className="mypage-content-wrap">
            <div className="mypage-title">회원 정보 수정</div>
        
            <div className="mypage-content">
                <form id="mypageForm" method="post" autoComplete="off">
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="id" name="id" required />
                            <label className="label-helper" htmlFor="id"><span>아이디고정</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="password" className="input-text" id="pw" name="pw" required />
                            <label className="label-helper" htmlFor="pw"><span>비밀번호 (대소문자/숫자/특수문자 8자~16자)</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="password" className="input-text" id="pwCheck" name="pwCheck" required />
                            <label className="label-helper" htmlFor="pwCheck"><span>비밀번호 확인 (대소문자/숫자/특수문자 8자~16자)</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="branchName" name="branchName" required />
                            <label className="label-helper" htmlFor="branchName"><span>지점명고정</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="repreName" name="repreName" required />
                            <label className="label-helper" htmlFor="repreName"><span>대표자명</span></label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="phoneNum" name="phoneNum" required />
                            <label className="label-helper" htmlFor="phoneNum"><span>휴대폰번호 (숫자만 입력해주세요)</span></label>
                        </div>
                    </div>

                    
                        <div className="btn-container">
                            <button className="mypage-btn" type="submit">수정</button>
                        </div>
                </form>
            </div>
        </div>
    )
}
export default MyPage;