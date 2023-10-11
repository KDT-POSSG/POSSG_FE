import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { ACCESS_TOKEN } from 'store/apis/base';
import { toast } from 'react-hot-toast';



function Attendance({onClose}) {
    const [employeeSeq, setEmployeeSeq] = useState(0);
    const [attendance, setAttendance] = useState('');
    const accesstoken = localStorage.getItem("accesstoken");

    const attendancedata = {
        employeeSeq
      };

    const handleclickAttendance = () =>{
        axios.post('http://54.180.60.149:3000/attendance', attendancedata, {
            headers:{ accessToken: `Bearer ${accesstoken}`}})
        .then((res)=> {
            if(res.data === "YES") {
                setAttendance(res.data.attendance);
                console.log('출근 성공');
                toast.success('출근합니다.'); // 
            } else if(res.data === "ALREADY CHECK") {
                toast.error('이미 출근했습니다.'); //
            } else {
                console.log(res.data);
            }
            
            onClose();
        })
        .catch((err)=>{
            console.log('Error Response:', err.response);
            console.log('출근 실패')
            toast.error('출근에 실패했습니다.'); // 추가된 에러 알림
        });
    };
    
    
    return (
        <div className='attendancecheck'>
            <div className='attendancecheck-title'>출근</div>
            <div className='attendancecheck-subtitle'>직원 번호를 입력해 주세요</div>
            <input className='attendancecheck-input' placeholder="직원번호" onChange={(e) => setEmployeeSeq(parseInt(e.target.value))} />
            <button className="attendancecheck-btn" onClick={handleclickAttendance}>출근</button>
        </div>
    )
}

export default Attendance;