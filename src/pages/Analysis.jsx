import { Link } from "react-router-dom";

function Analysis(){
    return(
        <div className="analysis-content-wrap">
            <div className="analysis-content">
                <Link to="/cost"><div className="analysis">월세 및 관리비</div></Link>
                <Link to="/salesReport"><div className="analysis">매출 보고서</div></Link>
                <Link to="/imcomeReport"><div className="analysis">손익 보고서</div></Link>
            </div>
        </div>
    )
}
export default Analysis;