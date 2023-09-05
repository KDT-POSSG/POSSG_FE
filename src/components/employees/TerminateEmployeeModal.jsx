import React, { useState } from 'react';
import axios from 'axios';


function TerminateEmployeeModal(){

    const [terminateemployee, setTerminateEmployee] = useState('');  // 퇴사 직원 번호
    const [employeeSeq, setEmployeeSeq] = useState(''); // 입력한 직원 번호
    
    const handleTerminate = () => {
        axios.post('http://10.10.10.90:3000/terminateEmployee', null, {params: {employeeSeq : employeeSeq}})
        .then((res) => {
            setTerminateEmployee(res.data.terminateemployee);
            console.log('직원 퇴사 성공');

        })
        .catch((err) => {
            console.log(err);
            console.log('직원 퇴사 실패');
        });
    };


    return(
        <div>
            <h1>퇴사 모달</h1>
            <input placeholder="employeeSeq 입력" value={employeeSeq} onChange={(e) => setEmployeeSeq(e.target.value)}/>
            <button onClick={ handleTerminate }>퇴사</button>
        </div>
    )
}

export default TerminateEmployeeModal;