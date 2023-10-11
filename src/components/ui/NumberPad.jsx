
function NumberPad({ onInputValueChange, selectedInputValue }) {

    const handleButtonClick = (value) => {
      let newInputValue;
  
      if (value === "C") {
        newInputValue = "";
      } 

      else if (value === "⇦") {
        newInputValue = selectedInputValue.slice(0, -1);
      } 
      
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
