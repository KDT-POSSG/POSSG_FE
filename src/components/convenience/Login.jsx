import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import TokenRenewal from "./TokenRenewal";

function Login(){

    const navi = useNavigate();

    // 상태관리 초기값 세팅
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    // 쿠키 훅 사용
    const [cookies, setCookie] = useCookies(["rememberedId"]);

    // 컴포넌트가 마운트될 때, 쿠키에서 아이디를 가져와서 상태에 설정
    useEffect(() => {
        if (cookies.rememberedId) {
        setId(cookies.rememberedId);
        setRememberMe(true);
        }
    }, [cookies.rememberedId]);


    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("http://10.10.10.109:3000/login", {
            "userId": id,
            "pwd": pw,
        },)
        .then((res)=>{
            //console.log(res.headers);
            if(res.status===200){
                const { accesstoken } = res.headers;
                const { convSeq, branchName } = res.data;
                //console.log("res.data >>> ", res.data);
                localStorage.setItem("accesstoken", accesstoken);
                localStorage.setItem("convSeq",convSeq);
                localStorage.setItem("branchName",branchName);
                toast.success("로그인 되었습니다.");

                // 아이디 기억하기 옵션이 선택되었을 때, 쿠키에 아이디 저장
                if (rememberMe) {
                    setCookie("rememberedId", id, { path: "/" });
                } else {
                    // 선택되지 않았을 때, 쿠키에서 아이디 제거
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

    //https://velog.io/@plutoin/react-cookie 리액트 쿠키

    return(
        <div className="login-content-wrap">
            {/* <TokenRenewal /> */}
            <div className="login-title">로그인</div>

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
                            <input type="checkbox" id="saveLogin" name="saveLogin" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}  />
                            <label htmlFor="saveLogin"><span>아이디 저장</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="btn-container">
                            <button className="login-btn" type="submit">로그인</button>
                        </div>
                    </div>
                
                </form>
                    <div className="link-container">
                        <Link to="/findId">아이디찾기</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <Link to="/findPw"> 비밀번호찾기</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <Link to="/register">회원가입</Link>
                    </div>
            </div>
            
        </div>
    )
}
export default Login;