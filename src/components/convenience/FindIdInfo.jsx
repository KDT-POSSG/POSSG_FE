import { Link } from "react-router-dom";

function FindIdInfo({findId}){  
    return(
        <div className="findInfo-content-wrap">
            <div className="findInfo-title">아이디 찾기
            </div>

            <div className="findInfo-content">
                <form id="findInfoForm" method="post" autoComplete="off">
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="id" name="id" required defaultValue={findId} />
                            <label className="label-helper" htmlFor="id"><span>아이디</span></label>
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="btn-container">
                            <Link to="/login"><button type="button">로그인</button></Link>
                            <Link to="/findPw"><button type="submit">비밀번호 찾기</button></Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FindIdInfo;