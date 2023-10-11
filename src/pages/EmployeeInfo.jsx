import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Modal from '../components/ui/Modal';
import TerminateEmployeeModal from '../components/employees/TerminateEmployeeModal';
import ModifyEmployeeModal from '../components/employees/ModifyEmployeeModal';
import Pagination from "react-js-pagination";
import monkey from '../assets/img/monkeypng.png';

function EmployeeInfo() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [attendanceData, setAttendanceData] = useState([]);
    const { employeeSeq } = useParams();
    const [empName, setEmpName] = useState('');    
    const [branchName, setBranchName] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [salary, setSalary] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [hireDate, setHireDate] = useState('');
    const accesstoken = localStorage.getItem("accesstoken");
    const [employeeType, setEmployeeType] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const indexOfLastItem = currentPage * itemsPerPage; //페이지의 마지막 인덱스 계산
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = attendanceData.slice(indexOfFirstItem, indexOfLastItem);
    const [terminationDate, setTerminationDate] = useState(null);

    const openModal = (type) => {
        setEmployeeType(type);
        setModalIsOpen(true);
       };
    const closeModal = () => {
       setModalIsOpen(false);
       };

    const fetchEmployeeInfo = () => {
        axios.get('http://54.180.60.149:3000/selectOneAttendance', { params: { employeeSeq },
        headers:{ accessToken: `Bearer ${accesstoken}`}})
        .then((response) => {
            const employeeData = response.data.param;  // param 부분으로 데이터 추출
            const attendanceList = response.data.list; // list 부분으로 데이터 추출

            setEmpName(employeeData.empName);
            setBranchName(employeeData.branchName);
            setGender(employeeData.gender);
            setBirthDate(employeeData.birthDate);
            setHireDate(employeeData.hireDate);
            setSalary(employeeData.salary);
            setPhoneNumber(employeeData.phoneNumber);
            setAttendanceData(attendanceList);
            setTerminationDate(employeeData.terminationDate);

            console.log('출퇴근 정보 불러오기 성공');
            console.log(response);
        })
        .catch((error) => {
            console.log('출퇴근 정보 불러오기 실패:', error);
        });
    }

    useEffect(() => {
        fetchEmployeeInfo();
    }, []);

    const handleUpdateEmployee = () => {
        fetchEmployeeInfo();
        closeModal();
    }


    const getModalStyle = () => {
        if (employeeType === 'terminateEmp') {
            return {
                content: {
                    height: '30%',
                    width: '37%', 
                },
            };
        }
        if (employeeType === 'updateEmp') {
            return {
                content: {
                    height: '78%',
                    width: '35%', 
                },
            };
        }
    };

    return (
        <>
        {empName && (<div className={terminationDate ? 'terminated' : 'employeesinfo'}>
                <div className='employeeinfo-header'>
                    <div className='page-title'>{empName}님의 정보</div>
                    <div className="employee-information">
                        <div className='employee-img'>
                        <img src={monkey} alt='직원 기본 이미지'/>
                        </div>
                        <div className='employee-info-container'>
                            <div className='employee-info-top'>
                                <h2 className='employee-name'>{empName}</h2>
                                {terminationDate === null ? (
                                    <div className='employee-btn-container'>
                                    <button className='employee-btn-update' onClick={() => openModal('updateEmp')}>정보 수정</button>
                                    <button className='employee-btn-terminate' onClick={() => openModal('terminateEmp')}>퇴사</button>
                                </div>
                                ) : (<div></div>)}
                            </div>
                            <div className='employee-line'>
                                <div className='employee-info-left'>
                                    <div className='employee-info'>지점</div>
                                    <div className='employee-info2'>{branchName}</div>
                                    <div className='employee-info'>직원 번호</div>
                                    <div className='employee-info2'>{employeeSeq}</div>
                                    <div className='employee-info'>생년월일</div>
                                    <div className='employee-info2'>{birthDate}</div>
                                </div>
                                <div className='employee-info-right'>
                                    <div className='employee-info'>성별</div>
                                    <div className='employee-info2'>{gender}</div>
                                    <div className='employee-info'>연락처</div>
                                    <div className='employee-info2'>{phoneNumber}</div>
                                    <div className='employee-info'>시급</div>
                                    <div className='employee-info2'>{new Intl.NumberFormat('ko-KR').format(salary)} 원</div>
                                </div>
                            </div>
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
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.length === 0 ? (
                            <tr>
                                <td className='tossface employeeinfo-empty' colSpan='5'>🏷️</td>
                            </tr>
                            ) : (
                            currentItems.map((data, index) => (
                            <tr key={index}>
                                <td>{data.attendance}</td>
                                <td>{data.leaveWork}</td>
                                <td>{data.workHours}</td>
                                <td>{data.remark}</td>
                            </tr>
                            ))
                        )}
                    </tbody>
                </table>
                </div>
                
                
                </div>
                <Pagination className="pagination"
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={attendanceData.length}
                    onChange={(pageNumber) => setCurrentPage(pageNumber)}
                    firstPageText={<span className="material-symbols-rounded page-btn">keyboard_double_arrow_left</span>}
                    prevPageText={<span className="material-symbols-rounded page-btn">chevron_left</span>}
                    nextPageText={<span className="material-symbols-rounded page-btn">chevron_right</span>}
                    lastPageText={<span className="material-symbols-rounded page-btn">keyboard_double_arrow_right</span>}
                />

                <Modal isOpen={ modalIsOpen } onClose={ closeModal } style={getModalStyle()}>
                    {employeeType === 'terminateEmp' && 
                    <TerminateEmployeeModal 
                        employeeSeq={employeeSeq}
                        empName={empName}
                    />}
                    {employeeType === 'updateEmp' && 
                    <ModifyEmployeeModal 
                        employeeSeq={employeeSeq}
                        onUpdate={handleUpdateEmployee}
                    />}
                </Modal>
        </div>)}
        </>
    );
}

export default EmployeeInfo;
