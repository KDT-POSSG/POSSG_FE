import axios from "axios";
import NumberPad from "components/NumberPad";
import { useState } from "react";
import toast from "react-hot-toast";
import { addComma } from "store/utils/function";

function AddCost(){
    const accesstoken = localStorage.getItem("accesstoken");

    const [rent, setRent] = useState("");
    const [waterBill, setWaterBill] = useState("");
    const [electricityBill, setElectricityBill] = useState("");
    const [gasBill, setGasBill] = useState("");
    const [totalLaborCost, setTotalLaborCost] = useState("");
    const [securityMaintenanceFee, setSecurityMaintenanceFee] = useState("");
    const [costYear, setCostYear] = useState("2023"); // 임시로 입력
    const [costMonth, setCostMonth] = useState("2023");

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

    const onClick = () => {
        alert("클릭");
        console.log("a");
        axios.post("http://54.180.60.149:3000/addcost", {
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
            Authorization: `Bearer ${accesstoken}`,
            },
        })
        .then((res)=>{
            console.log("b");
            console.log("res >>> ", res);
            if(res.data==="YES"){
                toast.success("입력 완료");
            }else{
                console.log("c");
                toast.error("입력 실패");
            }
        })
        .catch((err) => {
            console.error(err);  
            console.log("catch 에러");
        })
    }

    return(
        <div className="addCost-content-wrap">
            <div className="addCost-title">비용 입력</div>
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