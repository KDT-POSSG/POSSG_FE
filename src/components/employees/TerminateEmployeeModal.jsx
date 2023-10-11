import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from 'store/apis/base';


function TerminateEmployeeModal({ employeeSeq, empName }){
    const navigate = useNavigate();
    const [terminateemployee, setTerminateEmployee] = useState('');  // 퇴사 직원 번호
    
    const handleTerminate = () => {
        axios.post('http://54.180.60.149:3000/terminateEmployee', null, {params: {employeeSeq : employeeSeq},
        headers: { 
            accessToken: `Bearer ${ACCESS_TOKEN}`
        }
    })
        .then((res) => {
            setTerminateEmployee(res.data.terminateemployee);
            console.log('직원 퇴사 성공');
            navigate('/employees');
        })
        .catch((err) => {
            console.log(err);
            console.log('직원 퇴사 실패');
        });
    };


    return(
        <div className='terminateemployeemodal'>
            <div className='terminate-container'>
                <div className='terminate-title'>직원 퇴사</div>
                <div className='terminate-msg'>직원 번호 { employeeSeq }번 { empName }님을 퇴사 처리하시겠습니까?</div>
                <button className='terminate-btn'onClick={ handleTerminate }>확인</button>
            </div>
        </div>
    )
}

export default TerminateEmployeeModal;