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
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [currentPageData, setCurrentPageData] = useState([]);

    useEffect(() => {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setCurrentPageData(employeeList.slice(start, end));
    }, [employeeList, page, itemsPerPage]);
  
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
            setTotalCnt(res.data.cnt);
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
              <div className="btn-container">
              <button className='employee-btn' onClick={() => openModal('add')} >직원 추가</button>
              </div>
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
                            currentPageData.map((employee, index) => (
                          <tr key={index} className={employee.terminationDate ? 'terminated' : ''}>
                            <td>{employee.employeeSeq}</td>
                            <td>{employee.empName}</td>
                            <td>{employee.phoneNumber}</td>
                            <td>{employee.hireDate}</td>
                            <td>{employee.terminationDate ? employee.terminationDate : "-"}</td>
                            <td><button className='employee-info-btn' onClick={() => navigate(`/employeeInfo/${employee.employeeSeq}`)}>직원 정보</button></td>
                          </tr>
                          ))
                        )
                      }
                      </tbody>
                      
                    </table>
                  </div>
                
            </div>
        
            <Pagination className="pagination"
                activePage={page}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={totalCnt}
                onChange={(pageNumber) => setPage(pageNumber)}
                firstPageText={<span className="material-symbols-rounded page-btn">keyboard_double_arrow_left</span>}
                prevPageText={<span className="material-symbols-rounded page-btn">chevron_left</span>}
                nextPageText={<span className="material-symbols-rounded page-btn">chevron_right</span>}
                lastPageText={<span className="material-symbols-rounded page-btn">keyboard_double_arrow_right</span>}
            />

            <Modal isOpen={modalIsOpen} onClose={closeModal} style={{
              content: {
                height: '78%',
                width: '35%', 
              }
            }}>
                {employeeType === 'add' && <AddEmployeeModal onAdd={handleAddEmployee} />}
            </Modal>
        
        </div>
  );
}

export default Employees;