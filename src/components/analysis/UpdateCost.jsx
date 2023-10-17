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
    const [costYear, setCostYear] = useState(""); // 임시로 입력
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
        }else {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            setCostYear(String(currentYear));
            setCostMonth(String(currentMonth).padStart(2, "0"));
        }
    };

    const onSearch = async () => {
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
                // console.log("resData >>> ", resData);
                setRent(addComma(resData.rent));
                setWaterBill(addComma(resData.waterBill));
                setElectricityBill(addComma(resData.electricityBill));
                setGasBill(addComma(resData.gasBill));
                setTotalLaborCost(addComma(resData.totalLaborCost));
                setSecurityMaintenanceFee(addComma(resData.securityMaintenanceFee));

                toast.success("조회 완료");
            }else{
                toast.error("날짜를 선택해주세요");
            }

        }catch(err){
            console.error('catch 오류:', err);
            toast.error("조회 중 오류 발생");
        }
    }

    const onClick = () => {
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
                navi("/cost");
            }else{
                toast.error("수정 실패");
            }
        })
        .catch((err) => {
            toast.error("catch 입력 실패");
            console.error('catch 오류', err);
        })
    }

    useEffect(() => {
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
                        <button className="save-btn" type="button" onClick={onClick}>수정하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UpdateCost;