import { Link, useNavigate } from "react-router-dom";

function Cost(){
    const navi = useNavigate();
    return(
        <div className="cost-content-wrap">
            <div className="cost-content">
                <div className="list-btn">
                    <button onClick={() => navi("/analysis")}>목록</button>
                </div>
                <div className="link-content">
                    <Link to="/addCost"><div className="cost">월세 및 관리비 입력</div></Link>
                    <Link to="/updateCost"><div className="cost">월세 및 관리비 수정</div></Link>
                </div>

            </div>
        </div>
    )
}
export default Cost;