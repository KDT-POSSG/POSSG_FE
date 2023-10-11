import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import MyChart from '../../store/apis/MyChart';
import { baseURL } from 'store/apis/base';
import { addComma } from 'store/utils/function';

function DailySales(){
    const accesstoken = localStorage.getItem("accesstoken");

    const [selectedDate, setSelectedDate] = useState(null);
    const [salesData, setSalesData] = useState([]); 
    const [data, setData] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                max: 100000, // 임시로 설정
            },
        },
    };

    const fetchData = async (selectedDate) => {   
        try {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const dailySalesdDate = `${year}년${month}월${day}일`;
            // console.log("dailySalesdDate >>> ", dailySalesdDate)
            const res = await axios.get(`${baseURL}/selectSales?date=${dailySalesdDate}&choice=0`,
            {
                headers: {
                    accessToken: `Bearer ${accesstoken}`,
                },
            })
            // console.log("DailySales res >>> ", res);
            const resData = res.data;
            console.log("resData >>> ", resData)
            if(resData){
                setSalesData(resData);
                setData(true);
            }else{
                setSalesData(0)
                setData(true);
            }
            
        } catch (err) {
            console.error('try-catch 오류:', err);
            setData(false);
        }
    }
    const onClick = () => {
        if (selectedDate) {
            fetchData(selectedDate);
        }
    }

    return(
        <div className="sales-content-wrap">
            <div className="sales-nav">
                <div className="sales-title page-title">일별 매출</div>
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
            <div className="sales-content">
                <div className="sales-data-container">
                    <div className="sales-data">
                        <div className="sales-data-title">총 매출</div>
                        <div className="sales-data-amount">{addComma(salesData)}</div>
                    </div>
                </div>
                <div className="sales-chart"> 
                    <MyChart data={[salesData]} labels={["매출"]} chartOptions={chartOptions} />
                </div>
            </div>    
        </div>
    )
}
export default DailySales;