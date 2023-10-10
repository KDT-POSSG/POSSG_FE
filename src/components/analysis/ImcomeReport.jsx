import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import MyChart from "../../store/apis/MyChart";

function ImcomeReport(){
    const [activeSort, setActiveSort] = useState(1);

    const handleActiveSort = (status) => {
        // console.log("status >> ", status);
        setActiveSort(status);
    }

    return(
        <div className="imcomeReport-content-wrap">
            <div className="imcomeReport-sort">
                <div className={`imcomeReport-sort-active status-0${activeSort}`}></div>
                <Link to="/imcomeReport/monthlyImcome" className="imcomeReport-status imcomeReport-status-01" onClick={() => handleActiveSort(1)}>월별</Link>
                <Link to="yearImcome" className="imcomeReport-status imcomeReport-status-02" onClick={() => handleActiveSort(2)}>연별</Link>
            </div>
            <div className="imcomeReport-content">
                <Outlet />
            </div>
        </div>
    )
}
export default ImcomeReport;