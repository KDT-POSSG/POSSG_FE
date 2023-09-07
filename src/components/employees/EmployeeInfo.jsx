import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Modal from '../Modal';
import TerminateEmployeeModal from './TerminateEmployeeModal';


function EmployeeInfo() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [attendanceData, setAttendanceData] = useState([]);
    const { employeeSeq } = useParams();  // URL에서 employeeSeq 값 가져오기
    const [empName, setEmpName] = useState('');    

    const openModal = () => {
        setModalIsOpen(true);
       };
       const closeModal = () => {
       setModalIsOpen(false);
       };

    useEffect(() => {
        axios.get('http://10.10.10.152:3000/selectOneAttendance', { params: { employeeSeq } })
        .then((response) => {
            setAttendanceData(response.data);
            setEmpName(response.data[0].empName);
            console.log('출퇴근 정보 불러오기 성공');
        })
        .catch((error) => {
            console.log('출퇴근 정보 불러오기 실패:', error);
        });
    }, [employeeSeq]);

    return (
        <div className='employeeinfo'>
            <h1 className='page-title'>{empName}님의 정보</h1>
            <div className="employee-info">
                
                <div className='employee-img'>
                    <img src='https://i.namu.wiki/i/zekLiDSe20sTxWfFJ0kmbeJh7yI0o_Fz7cWmu1r2P7bfYTvUJxW8P5MHyMWukE1UCMeCRJdzNL2kjw-pZEzUYA.webp'/>
                </div>
                <div className='employee-info-container'>
                    <h2 className='employee-name'>이름 : 정재원</h2>
                    <h2 className='employee-branch'>지점 : 센텀시티점</h2>
                    <h2 className='employee-seq'>사원번호 : 1</h2>
                    <h2 className='employee-birthdate'>생년월일 : 1999-01-23</h2>
                    <h2 className='employee-gender'>성별 : 남</h2>
                    <h2 className='employee-phonenumber'>연락처 : 010-5685-2833</h2>
                    <h2 className='employee-salary'>시급 : 10,000</h2>
                </div>
            </div>


            <div className='employee-content'>
            <div className='center-container'>
                <div className='employee-table'>
            <table>
                <thead className=''>
                    <tr>
                       
                        <th>출근 시간</th>
                        <th>퇴근 시간</th>
                        <th>근무 시간</th>
                        <th>상태</th>
                        <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceData.map((data, index) => (
                        <tr key={index}>
                            
                            
                            <td>{data.attendance}</td>
                            <td>{data.leaveWork}</td>
                            <td>{data.workHours}</td>
                            <td>{data.remark}</td>
                            <td>{data.matter}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div className='employee-btn-container'>
            <button className='employee-btn' onClick={ openModal }>퇴사 처리</button>
            </div>
            </div>
            </div>
            <Modal isOpen={ modalIsOpen } onClose={ closeModal } style={{
                content:{
                    width:'50%',
                    height:'30%'
                }
            }}>
                <TerminateEmployeeModal  employeeSeq={employeeSeq} empName={empName} />
            </Modal>
        </div>
    );
}

export default EmployeeInfo;
