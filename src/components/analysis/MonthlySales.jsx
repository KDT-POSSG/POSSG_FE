import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import MyChart from '../../store/apis/MyChart';

function MonthlySales(){
    const accesstoken = localStorage.getItem("accesstoken");

    const [selectedDate, setSelectedDate] = useState(null);
    const [salesData, setSalesData] = useState([]); // 매출 데이터 저장
    const [expenseData, setExpenseData] = useState([]); // 지출 데이터 저장
    const [profitData, setProfitData] = useState([]); // 순이익 데이터 저장

    const handleDateChange = (date) => {
    setSelectedDate(date);
    };

    const fetchData = async (selectedDate) => {   
        try {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            // const day = String(selectedDate.getDate()).padStart(2, '0');
            const monthSalesdDate = `${year}년${month}월`;
            console.log("MonthSalesdDate >>> ", monthSalesdDate)
            const res = await axios.get(`http://54.180.60.149:3000/selectSales?date=${monthSalesdDate}&choice=1`,
            {
                headers: {
                    accessToken: `Bearer ${accesstoken}`,
                },
            })
            console.log("monthSalesdDate res >>> ", res);
            const resData = res.data;
            setSalesData(resData.sales);
            setExpenseData(resData.expenses);
            setProfitData(resData.profit);
        } catch (error) {
            console.error('try-catch 데이터 가져오기 오류:', error);
        }
    }
    const onClick = () => {
        if (selectedDate) {
            // API 호출
            fetchData(selectedDate);
        }
    }

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
                    <button className="calendar-button" type="button" onClick={onClick}>조회</button>
                </div>
            </div>
            <div className="sales-chart"> 
                <MyChart salesData={salesData} expenseData={expenseData} profitData={profitData} />
            </div>
        </div>
    )
}
export default MonthlySales;