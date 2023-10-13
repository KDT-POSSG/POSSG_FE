import { useState } from "react";
import DatePicker from 'react-datepicker';
import MyChart from "../../store/utils/MyChart";
import axios from "axios";
import { addComma } from "store/utils/function";
import toast from "react-hot-toast";
import { baseURL } from "store/apis/base";
import Calendar from "./Calendar";

function MonthlyImcome(){
    const accesstoken = localStorage.getItem("accesstoken");

    const [selectedDate, setSelectedDate] = useState(null);
    const [totalPrice, setTotalPrice] = useState([]); 
    const [totalLoss, setTotalLoss] = useState([]); 
    const [profit, setProfit] = useState([]); 
    const [data, setData] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                max: 5000000, // 임시로 설정
            },
        },
    };
    
    const fetchData = async (selectedDate) => {   
        try {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const monthImcomeDate = `${year}년${month}월${day}일`;
            console.log("monthImcomeDate >>> ", monthImcomeDate)
            const res = await axios.get(`${baseURL}/profitAndLoss?date=${monthImcomeDate}&choice=1`,
            {
                headers: {
                    accessToken: `Bearer ${accesstoken}`,
                },
            })
            console.log("accesstoken >>> ",accesstoken)
            const resData = res.data;
            if (JSON.stringify(resData) === '{}') {
                setTotalPrice(0);
                setTotalLoss(0);
                setProfit(0);
                setData(true);
            } else {
                setTotalPrice(resData.totalPrice);
                setTotalLoss(resData.totalLoss);
                setProfit(resData.profit);
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
        <div className="imcome-content-wrap">
            <div className="imcome-nav">
                <div className="imcome-title page-title">월별 손익</div>
                <div className="imcome-calendar-container">
                    <Calendar
                            selectedDate={selectedDate}
                            onChange={handleDateChange}
                            type="month" 
                        />
                    <div className="material-symbols-rounded">calendar_month</div>
                    <button className="calendar-button" type="button" onClick={onClick}>조회</button>
                </div>
            </div>
            {data ? (
            <div className="imcome-content">
                <div className="imcome-data-container">
                    <div className="imcome-data">
                        <div className="imcome-data-title">총 수익</div>
                        <div className="imcome-data-amount">{addComma(totalPrice)}</div>
                    </div>
                    <div className="imcome-data">
                        <div className="imcome-data-title">총 비용</div>
                        <div className="imcome-data-amount">{addComma(totalLoss)}</div>
                    </div>
                    <div className="imcome-data">
                        <div className="imcome-data-title">총 이익</div>
                        <div className="imcome-data-amount">{addComma(profit)}</div>
                    </div>
                </div>
                <div className="imcome-chart">
                    <MyChart data={[totalPrice, totalLoss, profit]} labels={["총 수익", "총 비용", "총 이익"]} chartOptions={chartOptions} />
                    
                </div>
            </div>
            ) : (
                <div className="select-date-message">
                    <span className="tossface select-icon">📆</span>
                    <p className="select-date-text">조회할 날짜를 선택해주세요</p>
                </div>
            )}
        </div>
    )
}
export default MonthlyImcome;