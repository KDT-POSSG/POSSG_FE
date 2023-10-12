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
    const [employeeData, setEmployeeData] = useState({});  // employeeData 객체 상태 생성
    const accesstoken = localStorage.getItem("accesstoken");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const indexOfLastItem = currentPage * itemsPerPage; //페이지의 마지막 인덱스 계산
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = attendanceData.slice(indexOfFirstItem, indexOfLastItem);
    const [employeeType, setEmployeeType] = useState(null);

    const fetchEmployeeInfo = () => {
        axios.get('http://54.180.60.149:3000/selectOneAttendance', { params: { employeeSeq },
        headers:{ accessToken: `Bearer ${accesstoken}`}})
        .then((response) => {
            setEmployeeData(response.data.param);
            setAttendanceData(response.data.list);

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

    const openModal = (type) => {
        setEmployeeType(type);
        setModalIsOpen(true);
       };
    const closeModal = () => {
       setModalIsOpen(false);
       };

    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
        if (match) {
            return [match[1], match[2], match[3]].join('-');
        }
        return phoneNumber;
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
                    height: '73%',
                    width: '33%', 
                },
            };
        }
    };

    return (
        <>
        {employeeData.empName && (<div className={employeeData.terminationDate ? 'terminated' : 'employeesinfo'}>
            <div className='employeeinfo-header'>
                <div className='page-title'>{employeeData.empName}님의 정보</div>
                    <div className="employee-information">
                        <div className='employee-img'>
                            <img src={monkey} alt='직원 기본 이미지'/>
                        </div>
                        <div className='employee-info-container'>
                            <div className='employee-info-top'>
                                <h2 className='employee-name'>{employeeData.empName}</h2>
                                {employeeData.terminationDate === null ? (
                                    <div className='employee-btn-container'>
                                    <button className='employee-btn-update' onClick={() => openModal('updateEmp')}>정보 수정</button>
                                    <button className='employee-btn-terminate' onClick={() => openModal('terminateEmp')}>퇴사</button>
                                </div>
                                ) : (<div></div>)}
                            </div>
                            <div className='employee-line'>
                                <div className='employee-info-left'>
                                    <div className='employee-info'>지점</div>
                                    <div className='employee-info2'>{employeeData.branchName}</div>
                                    <div className='employee-info'>직원 번호</div>
                                    <div className='employee-info2'>{employeeData.employeeSeq}</div>
                                    <div className='employee-info'>생년월일</div>
                                    <div className='employee-info2'>{employeeData.birthDate}</div>
                                </div>
                                <div className='employee-info-right'>
                                    <div className='employee-info'>성별</div>
                                    <div className='employee-info2'>{employeeData.gender}</div>
                                    <div className='employee-info'>연락처</div>
                                    <div className='employee-info2'>{formatPhoneNumber(employeeData.phoneNumber)}</div>
                                    <div className='employee-info'>시급</div>
                                    <div className='employee-info2'>{new Intl.NumberFormat('ko-KR').format(employeeData.salary)} 원</div>
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
                        empName={employeeData.empName}
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
