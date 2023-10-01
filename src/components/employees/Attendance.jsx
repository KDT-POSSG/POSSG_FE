import React from 'react';
import axios from 'axios';
import { useState } from 'react';



function Attendance({onClose}) {
    const [employeeSeq, setEmployeeSeq] = useState(0);
    const [attendance, setAttendance] = useState('');

    const attendancedata = {
        employeeSeq
      };

    const handleclickAttendance = () =>{
        axios.post('http://54.180.60.149:3000/attendance', attendancedata)
        .then((res)=> {
            setAttendance(res.data.attendance);
            console.log('출근 성공');
            
            onClose();
        })
        .catch((err)=>{
            console.log('Error Response:', err.response);
            console.log('출근 실패')
        });
    };
    
    return (
        <div>
            <h1>직원번호 입력 ----- 출근</h1>
            <input placeholder="employeeSeq 입력" onChange={(e) => setEmployeeSeq(parseInt(e.target.value))} />
            <button onClick={handleclickAttendance}>출근하기</button>
        </div>
    )
}

export default Attendance;