import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { isAceessToken } from "store/utils/function";
import { baseURL } from "store/apis/base";
import logo from "../assets/svg/possg_logo.svg"

function Login(){
    const navi = useNavigate();

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [cookies, setCookie] = useCookies(["rememberedId"]);

    useEffect(() => {

        // if(isAceessToken()) {
        //     navi("/");
        //     return;
        // }

        if (cookies.rememberedId) {
        setId(cookies.rememberedId);
        setRememberMe(true);
        }
    }, [cookies.rememberedId]);

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`${baseURL}/NoSecurityZoneController/login`, {
            "userId": id,
            "pwd": pw,
        },)
        .then((res)=>{
            //console.log(res.headers);
            if(res.status===200){
                console.log("res.headers >> ", res.headers);
                const { accesstoken, refreshtoken } = res.headers;
                const { convSeq, branchName } = res.data;
                //console.log("res.data >>> ", res.data);
                localStorage.setItem("accesstoken", accesstoken);
                localStorage.setItem("refreshtoken", refreshtoken);
                localStorage.setItem("convSeq", convSeq);
                localStorage.setItem("branchName", branchName);
                toast.success("로그인 되었습니다");
                if (rememberMe) {
                    setCookie("rememberedId", id, { path: "/" });
                } else {
                    setCookie("rememberedId", "", { path: "/" });
                }
                navi("/");
            }else{
                toast.error("아이디 또는 비밀번호를 확인해주세요");
            }
        })
        .catch((err)=>{
            toast.error("아이디 또는 비밀번호를 확인해주세요");
            console.log(err);
        })
    }
    return(
        <div className="login-wrap">
        <div className="login-content-wrap">

            <div className="login-logo">
                <img src={logo} alt="POSSG 로고" width="100%" />
            </div>

            {/* <div className="login-title page-title">로그인</div> */}
            <div className="login-content">
                <form id="loginForm" method="post" autoComplete="off" onSubmit={onSubmit}>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="id" name="id" value={id} onChange={(e) => setId(e.target.value)} required />
                            <label className="label-helper" htmlFor="id"><span>아이디</span></label>                         
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="password" className="input-text" id="pw" name="pw" value={pw} onChange={(e) => setPw(e.target.value)} required  />
                            <label className="label-helper" htmlFor="pw"><span>비밀번호</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                            <div className="check-container">
                                <input type="checkbox" className="save-login" id="saveLogin" name="saveLogin" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}  />
                                <span>&nbsp;&nbsp;아이디 저장</span>                                    
                            </div>                        
                    </div>
                    <div className="form-row">
                        <div className="btn-container">
                            <button className="login-btn" type="submit">로그인</button>
                        </div>
                    </div>  
                </form>
                    <div className="link-container">
                        <Link to="/findId" className="login-link">아이디찾기</Link>
                        <span className="login-bar">|</span>
                        <Link to="/findPw" className="login-link"> 비밀번호찾기</Link>
                        <span className="login-bar">|</span>
                        <Link to="/register" className="login-link">회원가입</Link>  
                    </div>
            </div>            
        </div>
        </div>
    )
}
export default Login;