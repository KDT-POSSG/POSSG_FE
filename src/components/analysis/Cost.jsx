import { Link } from "react-router-dom";

function Cost(){
    return(
        <div className="cost-content-wrap">
            <div className="cost-content">
                <Link to="/addCost"><div className="cost">월세 및 관리비 입력</div></Link>
                <Link to="/updateCost"><div className="cost">월세 및 관리비 수정</div></Link>
            </div>
        </div>
    )
}
export default Cost;