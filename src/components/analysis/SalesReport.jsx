import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function SalesReport(){
    const [activeSort, setActiveSort] = useState(1);

    const handleActiveSort = (status) => {
        // console.log("status >> ", status);
        setActiveSort(status);
    }
    return(
        <div className="salesReport-content-wrap">
            <div className="salesReport-sort">
                <div className={`salesReport-sort-active status-0${activeSort}`}></div>
                <Link to="/salesReport/daily" className="salesReport-status salesReport-status-01" onClick={() => handleActiveSort(1)}>일별</Link>
                <Link to="monthlySales" className="salesReport-status salesReport-status-02" onClick={() => handleActiveSort(2)}>월별</Link>
                <Link to="yearSales" className="salesReport-status salesReport-status-02" onClick={() => handleActiveSort(3)}>연별</Link>
            </div>
            <div className="salesReport-content">
                <Outlet />
            </div>
        </div>
    )
}
export default SalesReport;