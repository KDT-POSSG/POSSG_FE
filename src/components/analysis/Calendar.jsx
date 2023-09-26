import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';


const Calendar = ({dateRange}) => {
    const [startDate, setStartDate] = useState(new Date());
    let minDate, maxDate;

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
        {value}
    </button>
    ));

    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<ExampleCustomInput/>}
            dateFormat="yyyy년 MM월 dd일"
            minDate={minDate}
            maxDate={maxDate}
        />
    );
};

export default Calendar;