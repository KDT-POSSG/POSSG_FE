import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import MyChart from './MyChart';

function DailySales(){
    const [selectedDate, setSelectedDate] = useState(null);
    const [salesData, setSalesData] = useState([]); // 매출 데이터 저장
    const [expenseData, setExpenseData] = useState([]); // 지출 데이터 저장
    const [profitData, setProfitData] = useState([]); // 순이익 데이터 저장

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const onClick = async () => {   
        try {
            // API 호출 및 데이터 가져오기
            // 예: const response = await fetch(`/api/sales?date=${selectedDate}`);
            // const data = await response.json();
            // axios.post("http://54.180.60.149:3000//selectSales")

            // 가상의 데이터 (실제 데이터로 대체)
            // const data = {
            //     sales: [/* sales 데이터 배열 */],
            //     expenses: [/* 지출 데이터 배열 */],
            //     profit: [/* 순이익 데이터 배열 */],
            // };

            // setSalesData(data.sales);
            // setExpenseData(data.expenses);
            // setProfitData(data.profit);

        } catch (error) {
            console.error('데이터 가져오기 오류:', error);
        }
    }

    // useEffect(() => {
    //     if (selectedDate) {
    //         fetchData();
    //     }
    // }, [selectedDate]);

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
                    <button className="calendar-button" type="button" onClick={onClick}>조회</button>
                </div>
            </div>

            <div className="sales-chart"> 
                {/* 차트 */}
                {/* 예: <ChartComponent data={salesData} /> 이런식으로 */}
                <MyChart />
            </div>
        </div>
    )
}
export default DailySales;