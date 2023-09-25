import { Link } from "react-router-dom";

function Analysis(){
    return(
        <div className="analysis-content-wrap">
            <div className="analysis-content">
                <div className="analysis"><Link to="/addCost">월세 및 관리비</Link></div>
                <div className="analysis"><Link to="/salesReport">매출 보고서</Link></div>
                <div className="analysis"><Link to="/imcomeReport">손익 보고서</Link></div>
            </div>
        </div>
    )
}
export default Analysis;