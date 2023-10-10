import { useState } from "react";
import DatePicker from 'react-datepicker';
import MyChart from "../../store/apis/MyChart";
import axios from "axios";

function YearImcome(){
    const accesstoken = localStorage.getItem("accesstoken");

    const [selectedDate, setSelectedDate] = useState(null);
    const [totalPrice, setTotalPrice] = useState([]); 
    const [totalLoss, setTotalLoss] = useState([]); 
    const [profit, setProfit] = useState([]); 
    const [data, setData] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const fetchData = async (selectedDate) => {  
        try {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const yearImcomeDate = `${year}년${month}월${day}일`;
            console.log("yearImcomeDate >>> ", yearImcomeDate)
            const res = await axios.get(`http://54.180.60.149:3000/profitAndLoss?date=${yearImcomeDate}&choice=1`,
            {
                headers: {
                    accessToken: `Bearer ${accesstoken}`,
                },
            })
            console.log("monthSalesdDate res >>> ", res);
            const resData = res.data;
            setTotalPrice(resData.sales);
            setTotalLoss(resData.expenses);
            setProfit(resData.profit);
        } catch (error) {
            console.error('try-catch 오류:', error);
        }
    }
    const onClick = () => {
        if (selectedDate) {
            // API 호출
            fetchData(selectedDate);
        }
    }

    return(
        <div className="imcome-content-wrap">
            <div className="imcome-nav">
                <div className="imcome-title">손익 보고서</div>
                <div className="imcome-calendar-container">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        showYearPicker
                        dateFormat="yyyy년"
                        yearItemNumber={9}
                        minDate={new Date(2000, 0)}
                        maxDate={new Date()}
                    />
                    <div className="material-symbols-rounded">calendar_month</div>
                    <button className="calendar-button" type="button" onClick={onClick}>조회</button>
                </div>
                
            </div>
            {/* {data && ( */} 
            {/* <div className="imcome-content">
                <div className="imcome-data-container">
                    <div className="imcome-data">
                        <label>총 수익</label>
                        <input type="text" className="imcome-data-input" />
                    </div>
                    <div className="imcome-data">
                        <label>총 비용</label>
                        <input type="text" className="imcome-data-input" />
                    </div>
                    <div className="imcome-data">
                        <label>총 이익</label>
                        <input type="text" className="imcome-data-input" />
                    </div>
                </div>
                <div className="imcome-chart">
                    <MyChart />
                </div>
            </div> */}
            {/* )} */}
        </div>
    )
}
export default YearImcome;