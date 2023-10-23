import { useState } from "react";
import DatePicker from 'react-datepicker';
import MyChart from "../../store/utils/MyChart";
import axios from "axios";
import { addComma } from "store/utils/function";
import toast from "react-hot-toast";
import { baseURL } from "store/apis/base";
import Calendar from "./Calendar";
import MyPieChart from "store/utils/MyPieChart";
import { useNavigate } from "react-router";

function YearCashSale(){
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
            const yearSalesDate = `${year}년${month}월${day}일`;
            console.log("yearImcomeDate >>> ", yearSalesDate)
            const res = await axios.get(`${baseURL}/cardOrCash?date=${yearSalesDate}&choice=2`,
            {
                headers: {
                    accessToken: `Bearer ${accesstoken}`,
                },
            })
            const colors = [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
            ];
            if(res.data && res.data.card){
                const cardData = res.data.card;
                const labels = Object.keys(cardData);
                const data = Object.values(cardData);
                const backgroundColors = colors.slice(0, data.length);
                
                let dataTotal = 0;
                const datasets = [];

                for(let i=0; i<labels.length; i++){
                    dataTotal = data[i];
                    const backgroundColor = backgroundColors[i];

                    const dataset = {
                        label:labels[i],
                        data:[dataTotal],
                        backgroundColor:backgroundColor,
                    };
                    datasets.push(dataset);
                }

                setChartDataList((prevDataList) => [
                    ...prevDataList,
                    {
                        labels: [yearSalesDate],
                        datasets: datasets,
                    },
                ]);
                console.log("cashSaleData >>> ", cashSaleData)
                setCardData(cardData);
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
        }else{
            toast.error("날짜를 선택해주세요");
        }
    }

    return(
        <div className="cashSales-content-wrap">
            <div className="cashSales-title page-title">연별 결제내역</div>
            <div className="cashSales-nav">
                <div className="list-btn">
                    <button onClick={() => navi("/analysis")}>목록</button>
                </div>
                <div className="cashSales-calendar-container">           
                    <Calendar
                        className="date-calendar"
                        selectedDate={selectedDate}
                        onChange={handleDateChange}
                        type="year"
                    />
                    <div className="material-symbols-rounded">calendar_month</div>
                    <button className="calendar-button" type="button" onClick={onClick}>조회</button>
                </div>
            </div>

            {data ? (
            <div className="cashSales-content-wrap">
                {cashSaleData.cash > 0 || totalCardAmount(cashSaleData.card) > 0 || cashSaleData.kakao > 0 || cashSaleData.toss > 0 ? (
                <div className="cashSales-data-container">
                    <div className="cashSales-piechart">
                        <div>
                            <MyPieChart
                                data={[cashSaleData.cash, totalCardAmount(cashSaleData.card), cashSaleData.kakao, cashSaleData.toss]}
                                labels={["현금","카드","카카오페이","토스페이","기타"]}
                                chartOptions={{}} 
                            />
                        </div>
                    </div>
                    <div className="cashSales-data-content">
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
                </div>
                ) : (
                    <div></div>
                )}

                {Object.keys(cardData).length > 0 ? (
                    <div className="cashSales-barchart-datas">
                            <div className="cashSales-barchart-title">카드사별 매출내역</div>
                            <div className="cashSales-barchart">
                                {chartDataList.map((chartData, index) => (
                                    <MyChart key={index} datasets={chartData.datasets} labels={chartData.labels} />
                                ))}
                            </div>
                            <div className="cashSales-datas-container">
                                    {Object.keys(cardData).map((cardName)=>(
                                        <div key={cardName} className="cashSales-card-detail">
                                            <div className="cashSales-card-title">{cardName}</div>
                                            <div className="cashSales-card-amount">{addComma(cardData[cardName])}원</div>
                                        </div>
                                    ))}
                            </div>    
                        
                    </div>
                ) : (
                    <div className="cashSales-no-datas">
                        <p className="select-no-text">저장된 데이터가 없습니다</p>&nbsp;&nbsp;&nbsp;
                        <span className="material-symbols-rounded chart-icon">bar_chart_4_bars</span>       
                    </div>
                )}

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
export default YearCashSale;