function FindId(){

    return(
        <div className="find-content-wrap">
            <div className="find-title">아이디 찾기</div>

            <div className="find-content">
                <form id="findForm" method="post" autoComplete="off" >
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="repreName" name="repreName" required />
                            <label className="label-helper" htmlFor="currentPw"><span>대표자명</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" id="phoneNum" name="phoneNum" required />
                            <label className="label-helper" htmlFor="changePw"><span>휴대폰번호</span></label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="btn-container">
                            <button type="submit">찾기</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default FindId;