import axios from "axios";
import NumberPad from "components/ui/NumberPad";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addComma } from "store/utils/function";
import Calendar from "./Calendar";
import { baseURL } from "store/apis/base";
import { useNavigate } from "react-router-dom";

function AddCost(){
    const accesstoken = localStorage.getItem("accesstoken");
    const navi = useNavigate();
    const [rent, setRent] = useState(0);
    const [waterBill, setWaterBill] = useState(0);
    const [electricityBill, setElectricityBill] = useState(0);
    const [gasBill, setGasBill] = useState(0);
    const [totalLaborCost, setTotalLaborCost] = useState(0);
    const [securityMaintenanceFee, setSecurityMaintenanceFee] = useState(0);
    const [costYear, setCostYear] = useState("");
    const [costMonth, setCostMonth] = useState("");

    const inputFields = [
        { state: rent, setState: setRent, name:"월세" },
        { state: waterBill, setState: setWaterBill, name:"수도세" },
        { state: electricityBill, setState: setElectricityBill, name:"전기세" },
        { state: gasBill, setState: setGasBill, name:"가스비" },
        { state: totalLaborCost, setState: setTotalLaborCost, name:"총 인건비" },
        { state: securityMaintenanceFee, setState: setSecurityMaintenanceFee, name:"보안유지비" },
    ];
    
    const [selectedInputIndex, setSelectedInputIndex] = useState(null); 
    
    const handleInputFocus = (index) => {
        setSelectedInputIndex(index);
    };
    
    const handleNumberPadInput = (value) => {
        if (selectedInputIndex !== null) {
            const currentInputField = inputFields[selectedInputIndex];
            const addCommaValue = addComma(value); 
            currentInputField.setState(addCommaValue);
        }
    };

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
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

    const onClick = (e) => {
        e.preventDefault();
        if (!selectedDate) {
            toast.error("날짜를 선택해 주세요.");
            return;
        }else{
            axios.post(`${baseURL}/addCost`, {
                rent: rent,
                waterBill: waterBill,
                electricityBill: electricityBill,
                gasBill: gasBill,
                totalLaborCost: totalLaborCost,
                securityMaintenanceFee: securityMaintenanceFee,
                costYear: costYear,
                costMonth: costMonth,
            }, 
            {
                headers: {
                accessToken: `Bearer ${accesstoken}`,
                },
            })
            .then((res)=>{
                console.log("res >>> ", res);
                if(res.data==="YES"){
                    toast.success("입력 완료");
                    navi("/cost")
                }else{
                    toast.error("입력 실패");
                }
            })
            .catch((err) => {
                toast.error("입력 실패");
                console.error('catch 오류', err);
            })
        }
    }

    useEffect(() => {
        handleDateChange(null);
    }, []);

    return(
        <div className="addCost-content-wrap">
            <div className="addCost-nav">
                <div className="addCost-title page-title">비용 입력</div>
                <div className="addCost-calendar-container">
                    <Calendar
                            selectedDate={selectedDate}
                            onChange={handleDateChange}
                            type="month" 
                        />
                    <div className="material-symbols-rounded">calendar_month</div>
                </div>
            </div>
            <div className="addCost-content">
                <div className="addCost-info">
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
                <div className="addCost-keypad">
                        {/* 숫자패드 */}
                        <NumberPad 
                            onInputValueChange={handleNumberPadInput}
                            selectedInputValue={
                            selectedInputIndex !== null
                                ? inputFields[selectedInputIndex].state
                                : ""
                            }/>
                    <div className="keypad-container">
                        <button className="save-btn" type="button" onClick={onClick}>저장하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddCost;