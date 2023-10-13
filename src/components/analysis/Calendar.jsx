import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";

registerLocale("ko", ko);

function Calendar({ selectedDate, onChange, type }) {
    const getDateFormat = (type) => {
        switch (type) {
        case 'day':
            return "yyyy년 MM월 dd일";
        case 'month':
            return "yyyy년 MM월";
        case 'year':
            return "yyyy년";
        default:
            return "yyyy년 MM월 dd일";
        }
    }

    const getDatePickerProps = (type) => {
        switch (type) {
        case 'day':
            return {
            showMonthYearPicker: false,
            showYearPicker: false,
            };
        case 'month':
            return {
            showMonthYearPicker: true,
            showYearPicker: false,
            };
        case 'year':
            return {
            showMonthYearPicker: false,
            showYearPicker: true,
            };
        default:
            return {};
        }
    }

    return (
        <DatePicker
            selected={selectedDate}
            onChange={onChange}
            dateFormat={getDateFormat(type)}
            minDate={new Date('2000-01-01')}
            maxDate={new Date()} 
            locale="ko"
            placeholderText="날짜를 선택하세요"
            {...getDatePickerProps(type)}
            className="datepicker"
            
        />
    );
}

export default Calendar;