import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/page/employees/terminateemployeemodal.scss'


function TerminateEmployeeModal({ employeeSeq, empName }){

    const [terminateemployee, setTerminateEmployee] = useState('');  // 퇴사 직원 번호
    
    const handleTerminate = () => {
        axios.post('http://10.10.10.152:3000/terminateEmployee', null, {params: {employeeSeq : employeeSeq}})
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
        <div className='terminateemployeemodal'>
            <h1 className=''>퇴사 모달</h1>
            <h3>직원 번호 { employeeSeq }번 { empName }님을 퇴사처리 하시겠습니까?</h3>
            <button onClick={ handleTerminate }>퇴사 처리</button>
        </div>
    )
}

export default TerminateEmployeeModal;