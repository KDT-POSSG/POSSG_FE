import React from "react";
import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from '../components/ui/Modal';
import AddEmployeeModal from '../components/employees/AddEmployeeModal'
import ModifyEmployeeModal from '../components/employees/ModifyEmployeeModal'
import Pagination from "react-js-pagination";

function Employees() {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [employeeType, setEmployeeType] = useState(null);
    const [employeeList, setEmployeeList] = useState([]);
    const [totalCnt, setTotalCnt] = useState(0);
    const accesstoken = localStorage.getItem("accesstoken");


    //모달
    const openModal = (type) => {
      setEmployeeType(type);
      setModalIsOpen(true);
     };
     const closeModal = () => {
     setModalIsOpen(false);
     };
 
     const fetchEmployees = () => {
      axios.get('http://54.180.60.149:3000/findallemployee', {params: {convSeq : 1}, headers:{ accessToken: `Bearer ${accesstoken}`}})
        .then((res) => {
            setEmployeeList(res.data.employee);
            console.log('직원 리스트 불러오기 성공');
            console.log(res.data);
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
          
          <div className="employee-content">
            <div className="employee-header">
              <div className='page-title'>직원 관리</div>
              <button className='employee-btn' onClick={() => openModal('add')} >직원 추가</button>
            </div>

                  <div className="employee-table">
                    
                    <table>
                      <thead className="">
                        <tr>
                          <th>직원 번호</th>
                          <th>이름</th>
                        
                          <th>연락처</th>
                          <th>입사 날짜</th>
                          <th>퇴사 날짜</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      
                      <tbody className="employee-list">
                        {employeeList.length === 0 ? (
                          <tr>
                            <td className="tossface employee-empty" colSpan="6">🪪</td>
                          </tr>
                          ) : (
                          employeeList.map((employee, index) => ( // employeeList를 이용하여 테이블에 행을 추가
                          <tr key={index}>
                            <td>{employee.employeeSeq}</td>
                            <td>{employee.empName}</td>
                            
                            <td>{employee.phoneNumber}</td>
                            <td>{employee.hireDate}</td>
                            <td>{employee.terminationDate ? employee.terminationDate : "-"}</td>
                            <td><button className='employee-info-btn' onClick={() => navigate(`/employeeInfo/${employee.employeeSeq}`)}>정보 보기</button></td>
                          </tr>
                          ))
                        )
                      }
                      </tbody>
                      
                    </table>
                  </div>
                
            </div>
        
        <Modal isOpen={modalIsOpen} onClose={closeModal}>
          {employeeType === 'add' && <AddEmployeeModal onAdd={handleAddEmployee} />}
          {employeeType === 'modify' && <ModifyEmployeeModal />}
        </Modal>
        
        </div>
  );
}

export default Employees;