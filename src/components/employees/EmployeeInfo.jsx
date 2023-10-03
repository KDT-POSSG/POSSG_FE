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
    const [branchName, setBranchName] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [salary, setSalary] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');


    const openModal = () => {
        setModalIsOpen(true);
       };
    const closeModal = () => {
       setModalIsOpen(false);
       };

    useEffect(() => {
        axios.get('http://54.180.60.149:3000/selectOneAttendance', { params: { employeeSeq } })
        .then((response) => {
            setAttendanceData(response.data);
            const employeeData = response.data[0];
            setEmpName(employeeData.empName);
            setBranchName(employeeData.branchName);
            setGender(employeeData.gender);
            setBirthDate(employeeData.birthDate);
            setSalary(employeeData.salary);
            setPhoneNumber(employeeData.phoneNumber);
            console.log('출퇴근 정보 불러오기 성공');
        })
        .catch((error) => {
            console.log('출퇴근 정보 불러오기 실패:', error);
        });
    }, [employeeSeq]);

    return (
        <div className='employeesinfo'>
            <div className='employeeinfo-header'>
                <div className='page-title'>{empName}님의 정보</div>
                <div className="employee-information">
                    <div className='employee-img'>
                        <img src='https://i.namu.wiki/i/zekLiDSe20sTxWfFJ0kmbeJh7yI0o_Fz7cWmu1r2P7bfYTvUJxW8P5MHyMWukE1UCMeCRJdzNL2kjw-pZEzUYA.webp'/>
                    </div>
                    <div className='employee-info-container'>
                        <h2 className='employee-name'>{empName}</h2>
                        <hr/>
                        <div className='employee-branch-title'>
                            <h2 className='employee-branch'>지점 : {branchName}</h2>
                            <h2 className='employee-number'>사원번호 : {employeeSeq}</h2>
                        </div>
                        <h2 className='employee-info'>생년월일 : {birthDate}</h2>
                        <h2 className='employee-info'>성별 : {gender}</h2>
                        <h2 className='employee-info'>연락처 : {phoneNumber}</h2>
                        <h2 className='employee-info'>시급 : {new Intl.NumberFormat('ko-KR').format(salary)}</h2>
                    </div>
                </div>
            </div>


            <div className='employee-content'>
            
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
                    {attendanceData.length === 0 ? (
                        <tr>
                            <td className='tossface employeeinfo-empty' colSpan='5'>🏷️</td>
                        </tr>
                        ) : (
                        attendanceData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.attendance}</td>
                            <td>{data.leaveWork}</td>
                            <td>{data.workHours}</td>
                            <td>{data.remark}</td>
                            <td>{data.matter}</td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
            </div>
            <div className='employee-btn-container'>
            <button className='employee-btn' onClick={ openModal }>퇴사</button>
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
