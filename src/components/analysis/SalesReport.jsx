import { Link, NavLink, Outlet } from "react-router-dom";

function SalesReport(){
    return(
        <div className="salesReport-content-wrap">
            <div className="salesReport-content-nav">
                <NavLink to="/salesReport/daily" className="salesReport-link" activeClassName="active">일별</NavLink>
                <NavLink to="weeklySales" className="salesReport-link" activeClassName="active">주별</NavLink>
                <NavLink to="monthlySales" className="salesReport-link" activeClassName="active">월별</NavLink>
            </div>
            <div className="salesReport-content">
                <Outlet />
            </div>
        </div>
    )
}
export default SalesReport;