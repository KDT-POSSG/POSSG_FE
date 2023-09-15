import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Logout(){
    // 로그아웃
    const logout = (accesstoken) => {
        // 토큰 삭제
        // localStorage.removeItem("accessToken");

        axios.get("http://10.10.10.109:3000/logout", {
            headers: {
                accessToken: `Bearer ${accesstoken}` 
            }
        })
        .then((res)=>{
            if(res.data==="YES"){
                console.log("로그아웃 성공")
            }else{
                console.log("로그아웃 실패")
            }
        })
        .catch((err)=>{
            console.log(err)
        })

    }

    return(
        <div>
            <button onClick={logout}>로그아웃</button>
        </div>
    )
}
export default Logout;