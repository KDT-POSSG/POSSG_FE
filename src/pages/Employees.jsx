import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from '../components/Modal';
import AddEmployeeModal from '../components/employees/AddEmployeeModal'
import ModifyEmployeeModal from '../components/employees/ModifyEmployeeModal'



function Employees() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [employeeType, setEmployeeType] = useState(null);
    const [employeeList, setEmployeeList] = useState([]);
    const [totalCnt, setTotalCnt] = useState(0);

    //모달
    const openModal = (type) => {
      setEmployeeType(type);
      setModalIsOpen(true);
     };
     const closeModal = () => {
     setModalIsOpen(false);
     };

    useEffect(() => {
        axios.get('http://10.10.10.90:3000/selectAllAttendance', {params: {convSeq :1}}) //convSeq는 나중에 로그인한 지점의 seq로 변경
        .then((res) => {
            setEmployeeList(res.data);
            setTotalCnt(res.data.cnt);
        })
        .catch((err) => {
            console.log(err);
            console.log('직원 리스트 불러오기 실패');
        });
    }, []);


    return(
        <div className="employee">
      <h1 className='inven-title'>직원 관리</h1>
      <hr />
      <button className='employee-btn' onClick={() => openModal('add')} >직원 추가</button>
      <div>
        <div>🥷</div>
        <table className="table table-responsive-xl">
          <thead>
            <tr>
              <th>직원 번호</th>
              <th>이름</th>
              <th>성별</th>
              <th>연락처</th>
              <th>출근시간</th>
              <th>퇴근시간</th>
              <th>근무시간</th>
              <th>상태</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>99</td>
              <td>김철수</td>
              <td>남</td>
              <td>010-1234-5678</td>
              <td>09:00</td>
              <td>18:00</td>
              <td>9</td>
              <td>근무중</td>
              <td><button className='' onClick={() => openModal('modify')}>수정</button></td>
            </tr>

            {employeeList.map((employee, index) => ( // employeeList를 이용하여 테이블에 행을 추가
              <tr key={index}>
                <td>{employee.employeeSeq}</td>
                <td>{employee.empName}</td>
                <td>{employee.gender}</td>
                <td>{employee.phoneNumber}</td>
                <td>{employee.attendance}</td>
                <td>{employee.leaveWork}</td>
                <td>{employee.workHours}</td>
                <td>{employee.remark}</td>
                <td><button className='' onClick={() => openModal('modify')}>수정</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
                {employeeType === 'add' && <AddEmployeeModal />}
                {employeeType === 'modify' && <ModifyEmployeeModal />}
            </Modal>
    </div>
  );
}

export default Employees;