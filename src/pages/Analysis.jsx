import { Link } from "react-router-dom";

function Analysis(){
    return(
        <div className="analysis-wrap">
            <div className="analysis-content-wrap">
                <div className="analysis-content-title page-title">편의점 분석</div>
                <div className="analysis-content">
                    <Link to="/salesReport"><div className="analysis">매출 보고서</div></Link>
                    <Link to="/cashSale"><div className="analysis">결제 보고서</div></Link>
                    <Link to="/addCost"><div className="analysis">월세 및 관리비 입력</div></Link>
                    <Link to="/updateCost"><div className="analysis">월세 및 관리비 수정</div></Link>
                </div>

            </div>
        </div>
    )
}
export default Analysis;