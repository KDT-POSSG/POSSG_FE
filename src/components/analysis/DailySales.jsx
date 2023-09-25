import React from 'react';
import Calendar from './Calendar';

function DailySales(){
    return(
        <div className="daily-content-wrap">
            <div className="daily-content-title">일별 매출</div>
            <div className="daily-content-top">
                <Calendar />
            </div>
        </div>
    )
}
export default DailySales;