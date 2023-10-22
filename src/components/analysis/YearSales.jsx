import axios from 'axios';
import React, { useState } from 'react';
import MyChart from '../../store/utils/MyChart';
import { baseURL } from 'store/apis/base';
import { addComma } from 'store/utils/function';
import Calendar from './Calendar';
import MyPieChart from 'store/utils/MyPieChart';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function YearSales(){
    const accesstoken = localStorage.getItem("accesstoken");
    const navi = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [salesData, setSalesData] = useState([]);
    const [data, setData] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const getIncreaseRateColor = () => {
        if (salesData.increaseRate > 0) {
            return "positive-increase";
        } else if (salesData.increaseRate === 0) {
            return "zero-increase";
        } else {
            return "negative-increase";
        }
    };
    
    const fetchData = async (selectedDate) => {   
        try {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const yearSalesdDate = `${year}년${month}월${day}일`;
            console.log("MonthSalesdDate >>> ", yearSalesdDate)
            const res = await axios.get(`${baseURL}/selectSales?date=${yearSalesdDate}&choice=2`,
            {
                headers: {
                    accessToken: `Bearer ${accesstoken}`,
                },
            })
            console.log("yearSalesdDate res >>> ", res);
            const resData = res.data;
            if(resData){
                setSalesData(resData);
                setData(true);
            }else{
                setSalesData(0)
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
        }else{
            toast.error("날짜를 선택해주세요");
        }
    }

    return(
        <div className="sales-content-wrap">
            <div className="sales-title page-title">연별 매출</div>
            <div className="sales-nav">
                <div className="list-btn">
                    <button onClick={() => navi("/analysis")}>목록</button>
                </div>
                <div className="sales-calendar-container">
                    <Calendar
                        selectedDate={selectedDate}
                        onChange={handleDateChange}
                        type="year"
                    />
                    <div className="material-symbols-rounded">calendar_month</div>
                    <button className="calendar-button" type="button" onClick={onClick}>조회</button>
                </div>
            </div>
            {data ? (
            <div className="sales-content">
                <div className="sales-data-container">
                <div className="sales-data">
                        <div className="sales-data-title">총 매출</div>
                        <div className="sales-data-amount">{addComma(salesData.totalPrice)}원</div>
                            {salesData.increaseRate !== undefined && (
                                <p className={`sales-data-increaseRate ${getIncreaseRateColor()}`}>
                                    {salesData.increaseRate > 0
                                    ? `↑${salesData.increaseRate}%`
                                    : salesData.increaseRate === 0
                                    ? `${salesData.increaseRate}%`
                                    : `↓${salesData.increaseRate}%`}
                                </p>
                            )}
                    </div>
                    <div className="sales-data">
                        <div className="sales-data-title">결제 건수</div>
                        <div className="sales-data-amount">{addComma(salesData.totalCount)}건</div>
                    </div>
                    <div className="sales-data">
                        <div className="sales-data-title">할인 금액</div>
                        <div className="sales-data-amount">{addComma(salesData.discountPrice)}원</div>
                    </div>
                    <div className="sales-data">
                        <div className="sales-data-title">할인 건수</div>
                        <div className="sales-data-amount">{addComma(salesData.discountCount)}건</div>
                    </div>
                    <div className="sales-data">
                        <div className="sales-data-title">환불 금액</div>
                        <div className="sales-data-amount">{addComma(salesData.refundPrice)}원</div>
                    </div>
                    <div className="sales-data">
                        <div className="sales-data-title">환불 건수</div>
                        <div className="sales-data-amount">{addComma(salesData.refundCount)}건</div>
                    </div>
                    <div className="sales-data">
                        <div className="sales-data-title">총 비용</div>
                        <div className="sales-data-amount">{addComma(salesData.totalLoss)}원</div>
                    </div>
                    <div className="sales-data">
                        <div className="sales-data-title">순 이익</div>
                        <div className="sales-data-amount">{addComma(salesData.profit)}원</div>
                    </div>
                </div>
                {salesData.totalPrice === 0 && salesData.totalLoss === 0 && salesData.profit === 0 ? (
                    <div className="sales-no-datas">
                        <p className="select-no-text">저장된 데이터가 없습니다</p>&nbsp;&nbsp;&nbsp;
                        <span class="material-symbols-rounded chart-icon">bar_chart_4_bars</span>       
                    </div>
                ) : (
                    <div className="sales-chart-datas"> 
                        <div className="sales-chart">
                            <MyPieChart
                                data={[salesData.totalPrice, salesData.totalLoss, salesData.profit]}
                                labels={["총 매출", "총 비용", "순 이익"]}
                                chartOptions={{}}
                            />
                        </div>
                        <div className="sales-datas-container">
                            <div className="sales-datas">
                                <div className="sales-datas-title">총 매출</div>
                                <div className="sales-datas-amount">{addComma(salesData.totalPrice)}원</div>
                            </div>
                            <div className="sales-datas">
                                <div className="sales-datas-title">총 비용</div>
                                <div className="sales-datas-amount">{addComma(salesData.totalLoss)}원</div>
                            </div>
                            <div className="sales-datas">
                                <div className="sales-datas-title">순 이익</div>
                                <div className="sales-datas-amount">{addComma(salesData.profit)}원</div>
                            </div>
                        </div>
                    </div>
                )}
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
export default YearSales;