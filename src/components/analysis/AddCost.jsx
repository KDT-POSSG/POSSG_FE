import axios from "axios";
import NumberPad from "components/NumberPad";
import { useState } from "react";
import toast from "react-hot-toast";
import { addComma } from "store/utils/function";

function AddCost(){

    const [rent, setRent] = useState("");
    const [waterBill, setWaterBill] = useState("");
    const [electricityBill, setElectricityBill] = useState("");
    const [gasBill, setGasBill] = useState("");
    const [totalLaborCost, setTotalLaborCost] = useState("");
    const [securityMaintenanceFee, setSecurityMaintenanceFee] = useState("");

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
    
    const handleNumberPadInput = (value) => {   // 숫자패드에서 숫자를 입력할 때 호출되는 함수, selectedInputIndex 상태를 사용
        if (selectedInputIndex !== null) {
            const currentInputField = inputFields[selectedInputIndex];
            if (/^\d+$/.test(value.replace(/,/g, ''))) {
                const addCommaValue = addComma(value.replace(/,/g, '')); // 콤마 제거 후 처리
                currentInputField.setState(addCommaValue);
            }
        }
    };

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
                        <button className="save-btn" type="button">저장하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddCost;