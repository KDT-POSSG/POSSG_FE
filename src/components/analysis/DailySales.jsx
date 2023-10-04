import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import MyChart from './MyChart';

function DailySales(){
    const accesstoken = localStorage.getItem("accesstoken");

    const [selectedDate, setSelectedDate] = useState(null);
    const [salesData, setSalesData] = useState([]); // 매출 데이터 저장
    const [expenseData, setExpenseData] = useState([]); // 지출 데이터 저장
    const [profitData, setProfitData] = useState([]); // 순이익 데이터 저장

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const onClick = async () => {   
        try {
            const res = await axios.get("http://54.180.60.149:3000//selectSales", {
                params: {
                    date: "2023년07월20일", // 임시로 받는 데이터
                    choice: 0 // 일별 매출 0번
                }
            } ,{
                headers: {
                    accessToken: `Bearer ${accesstoken}`,
                },
            })
            const resData = res.data;
            setSalesData(resData.sales);
            setExpenseData(resData.expenses);
            setProfitData(resData.profit);
        } catch (error) {
            console.error('try-catch 데이터 가져오기 오류:', error);
        }
    }

    return(
        <div className="sales-content-wrap">
            <div className="sales-nav">
                <div className="sales-title">일별 매출</div>
                <div className="sales-calendar-container">           
                    <ReactDatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy년 MM월 dd일" 
                        minDate={new Date(2000, 0, 1)} 
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
export default DailySales;