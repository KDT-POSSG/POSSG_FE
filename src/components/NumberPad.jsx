import "../styles/numberPad.css"

function NumberPad({ onInputValueChange, selectedInputValue }) {

    const handleButtonClick = (value) => {
      let newInputValue;
  
      // 'C' 버튼이 눌렸다면, 모든 값을 지움
      if (value === "C") {
        newInputValue = "";
      } 
      // '⇦' 버튼이 눌렸다면, 마지막 문자를 지움
      else if (value === "⇦") {
        newInputValue = selectedInputValue.slice(0, -1);
      } 
      // 그 외 숫자 버튼들
      else {
        newInputValue = selectedInputValue + value;
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
