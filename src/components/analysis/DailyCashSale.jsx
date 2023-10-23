import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseURL } from 'store/apis/base';
import Calendar from "./Calendar";
import toast from 'react-hot-toast';
import { addComma } from 'store/utils/function';
import MyChart from 'store/utils/MyChart';
import { useNavigate } from 'react-router';

function DailyCashSale(){
    const accesstoken = localStorage.getItem("accesstoken");
    const navi = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [cashSaleData, setCashSaleData] = useState({});
    const [cardData, setCardData] = useState({});
    const [data, setData] = useState(false);
    const [chartDataList, setChartDataList] = useState([]);
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const totalCardAmount = (cardData) => {
        if(cardData){
            return Object.values(cardData).reduce((acc, amount) => acc + amount, 0);
        }
        return 0;
    }

    const fetchData = async (selectedDate) => {   
        try {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const dailySalesdDate = `${year}년${month}월${day}일`;
            const res = await axios.get(`${baseURL}/cardOrCash?date=${dailySalesdDate}&choice=0`,
            {
                headers: {
                    accessToken: `Bearer ${accesstoken}`,
                },
            })
            // const resData = res.data;
            if(res.data && res.data.card){
                const cardData = res.data.card;
                const labels = Object.keys(cardData);
                const data = Object.values(cardData);

                const dataset = {
                    label: dailySalesdDate, 
                    data: data,
                    backgroundColor: "red", 
                };
                console.log("dataset >>> " , dataset)
                setChartDataList((prevDataList) => [
                    ...prevDataList,
                    {
                        labels: labels,
                        datasets: [dataset],
                    },
                ]);
                
                setCardData(labels,data);
                setCashSaleData(res.data);
                setData(true);
            }
            else{
                setCashSaleData({cash: 0, card: {}, kakao: 0, toss: 0})
                setData(true);
            }     
        } catch (err) {
            toast.error("해당 날짜에는 조회할 자료가 없습니다");
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
        <div className="cashSales-content-wrap">
            <div className="cashSales-title page-title">일별 결제내역</div>
            <div className="cashSales-nav">
                <div className="list-btn">
                    <button onClick={() => navi("/analysis")}>목록</button>
                </div>
                <div className="cashSales-calendar-container">           
                    <Calendar
                        className="date-calendar"
                        selectedDate={selectedDate}
                        onChange={handleDateChange}
                        type="day"
                    />
                    <div className="material-symbols-rounded">calendar_month</div>
                    <button className="calendar-button" type="button" onClick={onClick}>조회</button>
                </div>
            </div>

            {data ? (
            <div className="cashSales-content">
                <div className="cashSales-data-container">
                    <div className="cashSales-data">
                        <div className="cashSales-data-title">현금</div>
                        <div className="cashSales-data-amount">{addComma(cashSaleData.cash)}원</div>
                    </div>
                    <div className="cashSales-data">
                        <div className="cashSales-data-title">카드</div>
                        <div className="cashSales-data-amount">{addComma(totalCardAmount(cashSaleData.card))}원</div>
                    </div>
                    <div className="cashSales-data">
                        <div className="cashSales-data-title">카카오페이</div>
                        <div className="cashSales-data-amount">{addComma(cashSaleData.kakao)}원</div>
                    </div>
                    <div className="cashSales-data">
                        <div className="cashSales-data-title">토스페이</div>
                        <div className="cashSales-data-amount">{addComma(cashSaleData.toss)}원</div>
                    </div>
                </div>

                <div className="cashSales-no-datas">
                    <p className="select-no-text">저장된 데이터가 없습니다</p>&nbsp;&nbsp;&nbsp;
                    <span class="material-symbols-rounded chart-icon">bar_chart_4_bars</span>       
                </div>

                <div className="cashSales-chart-datas"> 
                    차트 부분
                    <div className="cashSales-chart">
                        {/* {chartDataList.map((chartData, index) => (
                            <MyChart key={index} datasets={chartData.datasets} labels={chartData.labels} />
                        ))} */}
                    </div>
                    {/* <div className="cashSales-datas-container">
                        <div className="cashSales-datas">
                            카드사별 매출 상세 금액 부분
                        </div>
                    </div> */}
                </div>


            </div>
            ) : (
                <div className="cashSales-date-message">
                    <span className="tossface select-icon">📆</span>
                    <p className="select-date-text">조회할 날짜를 선택해주세요</p>
                </div>
            )}
        </div>
    )
}
export default DailyCashSale;