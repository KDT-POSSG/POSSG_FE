import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

function MonthlySales(){
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
    setSelectedDate(date);
    };

    return(
        <div className="sales-content-wrap">
            <div className="sales-nav">
                <div className="sales-title">월별 매출</div>
                <div className="sales-calendar-container">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        showMonthYearPicker
                        dateFormat="yyyy년 MM월"
                        minDate={new Date(2000, 0)} 
                        maxDate={new Date()} 
                    />
                    <div className="material-symbols-rounded">calendar_month</div>
                    <button className="calendar-button" type="button">조회</button>
                </div>
            </div>
        </div>
    )
}
export default MonthlySales;