import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';

function DailySales(){
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return(
        <div className="daily-content-wrap">
            <div className="daily-nav">
                <div className="daily-title">일별 매출</div>
                <div className="daily-calendar-container">           
                    <ReactDatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy년 MM월 dd일" 
                        minDate={new Date(2000, 0, 1)} 
                        maxDate={new Date()} 
                    />
                    <div className="material-symbols-rounded">calendar_month</div>
                    <button className="calendar-button" type="button">조회</button>
                </div>
            </div>
        </div>
    )
}
export default DailySales;