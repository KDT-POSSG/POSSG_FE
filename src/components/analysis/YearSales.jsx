import React from 'react';
import Calendar from './Calendar';

function YearSales(){
    return(
        <div className="daily-content-wrap">
            <div className="daily-nav">
                <div className="daily-title">연별 매출</div>
                <div className="daily-calendar-container">
                    <Calendar dateRange="year" />
                    <button className="calendar-button" type="button">조회</button>
                </div>
            </div>
        </div>
    )
}
export default YearSales;