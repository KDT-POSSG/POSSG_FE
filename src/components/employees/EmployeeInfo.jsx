import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/page/employees/employeeinfo.scss'

function EmployeeInfo() {
    const [attendanceData, setAttendanceData] = useState([]);
    const { employeeSeq } = useParams();  // URL에서 employeeSeq 값 가져오기

    useEffect(() => {
        axios.get('http://10.10.10.90:3000/selectOneAttendance', { params: { employeeSeq } })
        .then((response) => {
            setAttendanceData(response.data);
        })
        .catch((error) => {
            console.log('출퇴근 정보 불러오기 실패:', error);
        });
    }, [employeeSeq]);

    return (
        <div className='employeeinfo'>
            <h1>직원 {employeeSeq} 출퇴근 정보</h1>
            <table className="table table-responsive-xl">
                <thead>
                    <tr>
                        <th>attSeq</th>
                        <th>branchName</th>
                        <th>empName</th>
                        <th>gender</th>
                        <th>phoneNumber</th>
                        <th>attendance</th>
                        <th>leaveWork</th>
                        <th>workHours</th>
                        <th>remark</th>
                        <th>matter</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.attSeq}</td>
                            <td>{data.branchName}</td>
                            <td>{data.empName}</td>
                            <td>{data.gender}</td>
                            <td>{data.phoneNumber}</td>
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
    );
}

export default EmployeeInfo;
