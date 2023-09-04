import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from '../components/Modal';
import EmployeeModal from '../components/employees/EmployeeModal'


function Employees() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [employeeList, setEmployeeList] = useState([]);
    const [totalCnt, setTotalCnt] = useState(0);

    //모달
    const openModal = () => {
        setModalIsOpen(true);
       };
    const closeModal = () => {
       setModalIsOpen(false);
       };

    useEffect(() => {
        axios.get('http://10.10.10.90:3000/findallemployee', {params: {convSeq :1}}) //convSeq는 나중에 로그인한 지점의 seq로 변경
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
      <button className='employee-btn' onClick={openModal} >직원 추가</button>
      <div>
        <div>🥷</div>
        <table className="table table-responsive-xl">
          <thead>
            <tr>
              <th>이름</th>
              <th>생년월일</th>
              <th>성별</th>
              <th>연락처</th>
              <th>출근시간</th>
              <th>퇴근시간</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((employee, index) => ( // employeeList를 이용하여 테이블에 행을 추가
              <tr key={index}>
                <td>{employee.empName}</td>
                <td>{employee.birthDate}</td>
                <td>{employee.gender}</td>
                <td>{employee.phoneNumber}</td>
                <td>{employee.hireDate}</td>
                <td>{employee.terminationDate}</td>
                <td>수정</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modalIsOpen} onClose={ closeModal } >
                <EmployeeModal closeModal={ closeModal }/>
            </Modal>
    </div>
  );
}

export default Employees;