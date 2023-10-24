
function NumberPad({ onInputValueChange, selectedInputValue }) {

    const handleButtonClick = (value) => {
      let newInputValue;

      // 들어오는 값이 문자열이 아니라 숫자라면, 에러가 발생해 함수를 추가함
      let inputValueString = selectedInputValue.toString();
  
      if (value === "C") {
        newInputValue = "";
      } 

      else if (value === "⇦") {
        newInputValue = inputValueString.slice(0, -1);
      } 
      
      else {
        newInputValue = inputValueString + value;
      }
  
      onInputValueChange(newInputValue);
    };
  
    return (
      <div className="numberpad-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "⇦"].map((num, index) => (
          <button className={`button-common button-${num}`}
            key={index}
            onClick={() => handleButtonClick(num.toString())}
          >
            {num}
          </button>
        ))}
      </div>
    );
  }

export default NumberPad;
