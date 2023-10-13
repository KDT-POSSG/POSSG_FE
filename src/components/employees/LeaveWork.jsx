import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

function LeaveWork({onClose}) {
    const [employeeSeq, setEmployeeSeq] = useState(0);
    const [leavework, setLeaveWork] = useState('');
    const accesstoken = localStorage.getItem("accesstoken");

    const handleclickLeaveWork = () => {
        axios.post('http://54.180.60.149:3000/leavework', null, {
            params: { employeeSeq: employeeSeq },
            headers: { accessToken: `Bearer ${accesstoken}`,}})
        .then((res) => {
            if (res.data === "YES") {
                setLeaveWork(res.data.leavework);
                console.log('퇴근 성공');
                toast.success('퇴근합니다.'); // 퇴근 성공 알림
            } else if (res.data === "ALREADY CHECK") {
                toast.error('이미 퇴근했습니다.'); // 이미 퇴근했다는 알림
            } else {
                console.log(res.data);
            }
            onClose();
        })
        .catch((err) => {
            console.log('Error Response:', err.response);
            console.log('퇴근 실패');
            toast.error('퇴근에 실패했습니다.'); // 에러 발생 시 알림
        });
    };
    
    return (
        <div className='attendancecheck'>
            <div className='attendancecheck-title'>퇴근</div>
            <div className='attendancecheck-subtitle'>직원 번호를 입력해 주세요</div>
            <input className='attendancecheck-input' placeholder="직원번호" onChange={(e) => setEmployeeSeq(parseInt(e.target.value))} />
            <button className="attendancecheck-btn" onClick={handleclickLeaveWork}>퇴근</button>
        </div>
    )
}

export default LeaveWork;