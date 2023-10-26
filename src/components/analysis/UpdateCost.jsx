import axios from "axios";
import NumberPad from "components/ui/NumberPad";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addComma } from "store/utils/function";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calendar";
import { baseURL } from "store/apis/base";

function UpdateCost(){
    const navi = useNavigate();
    const accesstoken = localStorage.getItem("accesstoken");
    const [rent, setRent] = useState("");
    const [waterBill, setWaterBill] = useState("");
    const [electricityBill, setElectricityBill] = useState("");
    const [gasBill, setGasBill] = useState("");
    const [totalLaborCost, setTotalLaborCost] = useState("");
    const [securityMaintenanceFee, setSecurityMaintenanceFee] = useState("");
    const [costYear, setCostYear] = useState(""); 
    const [costMonth, setCostMonth] = useState("");

    const inputFields = [
        { state: rent, setState: setRent, name:"월세", value:rent },
        { state: waterBill, setState: setWaterBill, name:"수도세", value:waterBill },
        { state: electricityBill, setState: setElectricityBill, name:"전기세", value:electricityBill },
        { state: gasBill, setState: setGasBill, name:"가스비", value:gasBill },
        { state: totalLaborCost, setState: setTotalLaborCost, name:"총 인건비", value:totalLaborCost },
        { state: securityMaintenanceFee, setState: setSecurityMaintenanceFee, name:"보안유지비", value:securityMaintenanceFee },
    ];
    
    const [selectedInputIndex, setSelectedInputIndex] = useState(null); 
    
    const handleInputFocus = (index) => {
        setSelectedInputIndex(index);
    };
    
    const handleNumberPadInput = (value) => {
        if (selectedInputIndex !== null) {
            const currentInputField = inputFields[selectedInputIndex];
            const addCommaValue = addComma(value); 
            if (addCommaValue !== "") {
                currentInputField.setState(addCommaValue);
            }
        }   
    };

    const [selectedDate, setSelectedDate] = useState(null);

    const getData = (accesstoken, costDate) => { // 해당 월의 data 불러오기
        axios.get(`${baseURL}/selectCost?date=${costDate}&choice=2`, {
            headers: {
                accessToken: `Bearer ${accesstoken}`,
            },
        })
        .then( (res) => {
            console.log("getData res >>> ", res);
            setRent(addComma(res.data.rent));
            setWaterBill(addComma(res.data.waterBill));
            setElectricityBill(addComma(res.data.electricityBill));
            setGasBill(addComma(res.data.gasBill));
            setTotalLaborCost(addComma(res.data.totalLaborCost));
            setSecurityMaintenanceFee(addComma(res.data.securityMaintenanceFee));
        })
        .catch( (err) => {
            toast.error("데이터 불러오기 에러");
            console.error("catch 에러 ", err )
        })
    }

    const handleDateChange = (date) => { // 날짜 선택하기
        setSelectedDate(date);
        if(date){
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate() ? String(date.getDate()).padStart(2, '0') : "";
            const costDate = `${year}년${month}월${day}일`;
            setCostYear(String(year));
            setCostMonth(String(month).padStart(2, "0"));
        }else {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            setCostYear(String(currentYear));
            setCostMonth(String(currentMonth).padStart(2, "0"));
        }
    };

    const onSearch = async () => { // 조회하기 버튼을 누르면 data 불러오기
        try {
            if(selectedDate){
                const year = selectedDate.getFullYear();
                const month = selectedDate.getMonth() + 1;
                setCostYear(String(year));
                setCostMonth(String(month).padStart(2, "0"));
                const res = await axios.post(`${baseURL}/callSelectCost`, {
                    costYear: String(year),
                    costMonth: String(month).padStart(2, "0"),
                },{
                    headers: {
                        accessToken: `Bearer ${accesstoken}`,
                    },
                })
                const resData = res.data;
                console.log("onSearch resData >>> ",resData)
                setRent(resData.rent || 0); 
                setWaterBill(resData.waterBill || 0);
                setElectricityBill(resData.electricityBill || 0); 
                setGasBill(resData.gasBill || 0); 
                setTotalLaborCost(resData.totalLaborCost || 0);
                setSecurityMaintenanceFee(resData.securityMaintenanceFee || 0);
                toast.success("조회 완료");
            }else{
                toast.error("날짜를 선택해주세요");
            }
        }catch(err){
            console.error('조회 오류', err);
            toast.error("조회 중 오류 발생");
        }
    }

    const onClick = () => {
        if (!selectedDate) {
            toast.error("날짜를 선택해 주세요.");
            return;
        }else{
            axios.post(`${baseURL}/updateCost`, {
                rent: rent,
                waterBill: waterBill,
                electricityBill: electricityBill,
                gasBill: gasBill,
                totalLaborCost: totalLaborCost,
                securityMaintenanceFee: securityMaintenanceFee,
                costYear: costYear,
                costMonth: costMonth,
            }, {
                headers: {
                accessToken: `Bearer ${accesstoken}`,
                },
            })
            .then((res)=>{
                console.log("res >>> ", res);
                if(res.data==="YES"){
                    toast.success("수정 완료");
                    navi("/analysis");
                }else{
                    toast.error("수정 실패");
                }
            })
            .catch((err) => {
                toast.error("수정 실패");
                console.error('catch 오류', err);
            })
        }
    }

    useEffect(() => {
        getData(accesstoken, costYear, costMonth)
        handleDateChange(null);
    }, []);

    return(
        <div className="updateCost-content-wrap">
            <div className="updateCost-nav">
                <div className="updateCost-title page-title">비용 수정</div>
                <div className="updateCost-calendar-container">
                    <Calendar
                            selectedDate={selectedDate}
                            onChange={handleDateChange}
                            type="month" 
                            costDate={`${costYear}년${costMonth}월`}
                        />
                    <div className="material-symbols-rounded">calendar_month</div>
                    <button className="calendar-button" type="button" onClick={onSearch}>조회</button>
                </div>
            </div>
            <div className="updateCost-content">
                <div className="updateCost-info">
                {inputFields.map((inputField, index) => (
                    <div className="info-container" key={index}>
                    <input
                        type="text"
                        className="input-text"
                        id={`inputField-${index}`}
                        name={`inputField-${index}`}
                        value={inputField.state}
                        onFocus={() => handleInputFocus(index)}
                        required
                    />
                    <label className="label-helper" htmlFor={`inputField-${index}`}>
                        <span>{inputField.name}</span>
                    </label>
                    </div>
                ))}
                </div>
                <div className="updateCost-keypad">
                        {/* 숫자패드 */}
                        <NumberPad 
                            onInputValueChange={handleNumberPadInput}
                            selectedInputValue={
                            selectedInputIndex !== null
                                ? inputFields[selectedInputIndex].state
                                : ""
                            }/>
                    <div className="keypad-container">
                    <button className="cancle-btn" type="button" onClick={() => navi("/analysis")}>목록</button>
                        <button className="save-btn" type="button" onClick={onClick}>수정</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UpdateCost;