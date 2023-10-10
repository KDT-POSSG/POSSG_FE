import { useState } from "react";
import DatePicker from 'react-datepicker';
import MyChart from "../../store/apis/MyChart";
import axios from "axios";
import { addComma } from "store/utils/function";
import toast from "react-hot-toast";
import { ACCESS_TOKEN, baseURL } from "store/apis/base";

function YearImcome(){
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
            const res = await axios.get(`${baseURL}/profitAndLoss?date=${yearImcomeDate}&choice=0`,
            {
                headers: {
                    accessToken: `Bearer ${ACCESS_TOKEN}`,
                },
            })
            // console.log("monthSalesdDate res >>> ", res);
            const resData = res.data;
            if(resData){
                setTotalPrice(addComma(resData.totalPrice));
                setTotalLoss(addComma(resData.totalLoss));
                setProfit(addComma(resData.profit));
                setData(true);
            }else{
                toast.error("조회하신 날짜의 데이터가 없습니다");
                setData(false);
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
                <div className="imcome-title page-title">연도 손익</div>
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
            {data && ( 
            <div className="imcome-content">
                <div className="imcome-data-container">
                    <div className="imcome-data">
                        <div className="imcome-data-title">총 수익</div>
                        <div className="imcome-data-amount">{totalPrice}</div>
                    </div>
                    <div className="imcome-data">
                        <div className="imcome-data-title">총 비용</div>
                        <div className="imcome-data-amount">{totalLoss}</div>
                    </div>
                    <div className="imcome-data">
                        <div className="imcome-data-title">총 이익</div>
                        <div className="imcome-data-amount">{profit}</div>
                    </div>
                </div>
                <div className="imcome-chart">
                    <MyChart />
                </div>
            </div>
            )}
        </div>
    )
}
export default YearImcome;