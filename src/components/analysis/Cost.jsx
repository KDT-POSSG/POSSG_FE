import { Link } from "react-router-dom";

function Cost(){
    return(
        <div className="cost-content-wrap">
            <div className="cost-content">
                <div className="cost"><Link to="/addCost">월세 및 관리비 입력</Link></div>
                <div className="cost"><Link to="/updateCost">월세 및 관리비 수정</Link></div>
            </div>
        </div>
    )
}
export default Cost;