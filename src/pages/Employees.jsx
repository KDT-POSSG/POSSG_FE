import React from "react";
import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from '../components/Modal';
import AddEmployeeModal from '../components/employees/AddEmployeeModal'
import ModifyEmployeeModal from '../components/employees/ModifyEmployeeModal'
import '../styles/page/employees/employees.scss';


function Employees() {
    const navigate = useNavigate();
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
 
     const fetchEmployees = () => {
      axios.get('http://10.10.10.90:3000/findallemployee', {params: {convSeq :1}})
        .then((res) => {
            setEmployeeList(res.data);
            setTotalCnt(res.data.cnt);
        })
        .catch((err) => {
            console.log(err);
            console.log('직원 리스트 불러오기 실패');
        });
    }

    useEffect(() => {
      fetchEmployees();
    }, []);

    const handleAddEmployee = () => {
      fetchEmployees();
      closeModal();
    }


    return(
        <div className="employee">
      <h1 className='inven-title'>직원 관리</h1>
      <hr />
      <button className='employee-btn' onClick={() => openModal('add')} >직원 추가</button>
      <div>
        <div>🥷</div>
        <table className="table">
          <thead>
            <tr>
              <th>직원 번호</th>
              <th>이름</th>
              <th>생년월일</th>
              <th>성별</th>
              <th>연락처</th>
              <th>입사 날짜</th>
              <th>퇴사 날짜</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>

            {employeeList.map((employee, index) => ( // employeeList를 이용하여 테이블에 행을 추가
              <tr key={index}>
                <td>{employee.employeeSeq}</td>
                <td>{employee.empName}</td>
                <td>{employee.birthDate}</td>
                <td>{employee.gender}</td>
                <td>{employee.phoneNumber}</td>
                <td>{employee.hireDate}</td>
                <td>{employee.terminationDate}</td>
                <td><button className='' onClick={() => navigate(`/employeeInfo/${employee.employeeSeq}`)}>정보</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
      {employeeType === 'add' && <AddEmployeeModal onAdd={handleAddEmployee} />}
      {employeeType === 'modify' && <ModifyEmployeeModal />}
    </Modal>
     
    </div>
  );
}

export default Employees;