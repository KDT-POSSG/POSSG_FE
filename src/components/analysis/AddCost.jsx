import axios from "axios";
import NumberPad from "components/NumberPad";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addComma } from "store/utils/function";
import DatePicker from 'react-datepicker';

function AddCost(){
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
            setCostYear(String(year));
            setCostMonth(String(month).padStart(2, "0"));

            console.log("date >> ", date);
            console.log("year >> ", year);
            console.log("month >> ", month);
        }else {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            setCostYear(String(currentYear));
            setCostMonth(String(currentMonth).padStart(2, "0"));
        }
    };

    const onClick = (e) => {
        console.log(inputFields);
        e.preventDefault();
        axios.post("http://54.180.60.149:3000/addCost", {
            // 숫자로 보내고 , 제거 작업필요!
            // rent: parseInt(rent.replace(/,/g, ''), 10),
            // waterBill: parseInt(waterBill.replace(/,/g, ''), 10),
            // electricityBill: parseInt(electricityBill.replace(/,/g, ''), 10),
            // gasBill: parseInt(gasBill.replace(/,/g, ''), 10),
            // totalLaborCost: parseInt(totalLaborCost.replace(/,/g, ''), 10),
            // securityMaintenanceFee: parseInt(securityMaintenanceFee.replace(/,/g, ''), 10),
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
            // console.log("b");
            console.log("res >>> ", res);
            if(res.data==="YES"){
                toast.success("입력이 완료되었습니다");
            }else{
                // console.log("c");
                toast.error("입력에 실패되었습니다");
            }
        })
        .catch((err) => {
            console.error(err);  
            console.log("catch 에러");
        })
    }

    useEffect(() => {
        handleDateChange(null);
    }, []);

    return(
        <div className="addCost-content-wrap">
            <div className="addCost-nav">
                <div className="addCost-title">비용 입력</div>
                <div className="addCost-calendar-container">
                    <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            showMonthYearPicker
                            dateFormat="yyyy년 MM월"
                            minDate={new Date(2000, 0)} 
                            maxDate={new Date()} 
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