import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import MyChart from "../../store/utils/MyChart";

function CashSale(){
    const [activeSort, setActiveSort] = useState(1);

    const handleActiveSort = (status) => {
        // console.log("status >> ", status);
        setActiveSort(status);
    }

    return(
        <div className="cashSale-content-wrap">
            <div className="cashSale-sort-wrap">
                <div className="cashSale-sort">
                    <div className={`cashSale-sort-active status-0${activeSort}`}></div>
                    <Link to="/cashSale/dailyCashSale" className="cashSale-status cashSale-status-01" onClick={() => handleActiveSort(1)}>일별</Link>
                    <Link to="monthlyCashSale" className="cashSale-status cashSale-status-02" onClick={() => handleActiveSort(2)}>월별</Link>
                    <Link to="yearCashSale" className="cashSale-status cashSale-status-03" onClick={() => handleActiveSort(3)}>연별</Link>
                </div>
            </div>
            <div className="imcomeReport-content">
                <Outlet />
            </div>
        </div>
    )
}
export default CashSale;