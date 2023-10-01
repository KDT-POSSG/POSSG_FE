import React from 'react';
import axios from 'axios';
import { useState } from 'react';



function LeaveWork({onClose}) {
    const [employeeSeq, setEmployeeSeq] = useState(0);
    const [leavework, setLeaveWork] = useState('');

    const handleclickLeaveWork = () =>{
        axios.post('http://54.180.60.149:3000/leavework',null,{params:{employeeSeq:employeeSeq}})
        .then((res)=> {
            setLeaveWork(res.data.leavework);
            console.log('퇴근 성공');
            onClose();
            
        })
        .catch((err)=>{
            console.log('Error Response:', err.response);
            console.log('퇴근 실패')
        });
    };
    
    return (
        <div>
            <h1>직원번호 입력 ----- 퇴근</h1>
            <input placeholder="employeeSeq 입력" onChange={(e) => setEmployeeSeq(e.target.value)} />
            <button onClick={handleclickLeaveWork}>퇴근하기</button>
        </div>
    )
}

export default LeaveWork;