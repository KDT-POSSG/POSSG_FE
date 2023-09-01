import React from "react";
import '../styles/page/employees/employees.css';

function Employees() {
    return(
        <>
        <h1 className='inven-title'>직원 관리</h1>
            <hr/>
        <button className='employee-btn'>직원 추가</button>
        <div>
            <div>🥷</div>
            <table className='employee-table'>
                <thead>
                    <tr>
                        <th>빌 곳</th>
                        <th>직원명</th>
                        <th>출근 시간</th>
                        <th>퇴근 시간</th>
                        <th>수정</th>
                    </tr>
                </thead>
            </table>

        </div>
        </>
    )
}

export default Employees;