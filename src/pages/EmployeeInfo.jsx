import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Modal from '../Modal';
import TerminateEmployeeModal from './TerminateEmployeeModal';
import { ACCESS_TOKEN } from 'store/apis/base';
import ModifyEmployeeModal from './ModifyEmployeeModal';
import Pagination from "react-js-pagination";

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

    useEffect(() => {
        axios.get('http://54.180.60.149:3000/selectOneAttendance', { params: { employeeSeq },
        headers:{ accessToken: `Bearer ${accesstoken}`}})
        .then((response) => {
            const employeeData = response.data.param;  // param 부분으로 데이터 추출
            const attendanceList = response.data.list; // list 부분으로 데이터 추출

            setEmpName(employeeData.empName);
            setBranchName(employeeData.branchName);
            setGender(employeeData.gender);
            setBirthDate(employeeData.birthDate);
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
    }, [employeeSeq]);
    
    const getModalStyle = () => {
        if (employeeType === 'terminateEmp') {
            return {
                content: {
                    height: '30%',
                    width: '40%', 
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
        <div className={terminationDate ? 'terminated' : 'employeesinfo'}>
            <div className='employeeinfo-header'>
                <div className='page-title'>{empName}님의 정보</div>
                <div className="employee-information">
                    <div className='employee-img'>
                        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA7VBMVEX729KrXj/////1s7AHAAEAAAD72dD83dSqXDz/4dj1sa7/39anVzWpWjr/4tn73dOmVDGuYkT97+v31Mrvyb2vZknzz8T3wLv++Pber6D4x8H5z8jWo5Kza1DIjXizm5XChG32urb85d/nvbC3c1nwy8DOl4Tjt6nlx7/Fq6T97OfZqZnw0cmJdnKXgn1wYFzRnIvNsqvFiHNPQ0E/NTPZvbViVFHz8/ObmpqlTia8e2MiGRlLQD29pZ6eiIMxKSd3ZmIWEBApISBbTUrS0dF6eHiMi4thX1/Hxsawr6/p6ek3NDRHRETVsqbq2dLtdXv+AAAPyUlEQVR4nO2deVvbuBbGHYMlCy84cRKyOfsGCRQoMDOZ0pa2t73LTL//x7myHW+x7GgxDWZ4/+hDWU7OzzrajiRLqrx2SYd24Nn1Rlh+vRGWX2+E5dcbYfn1Rlh+vRGWX2+E5dcbYfn1Rlh+iRKqhq7rVihdN1S1QIO6a1DMQwFC1f34af+6vZjMmgAAu1mftFfzTZXTLXVrsNde1JuewRk22OtvKhiU/7lxEmJnqpvrRdNESIMQSr7wVxpCpj1ZDRuGbjAbnC+aKMPgpoEpuVzlIVR1azqf2KYWOLIr7JZUXw1VWsitQZRnENR7G5UHkp3QsKa9mYSynImc0uzF0KLwybCc6/peg7g0YbO9oTEoRKjqlXldy3zWKUq75+QXJC7n/iS78HYNomavwRb+bIS4+Nr7Sy8hTZtsjEyXVN3p2YwG0WKYbVCM0LCGE4n2aUeCqN63iC6ploMfGKs9HBn1PkM5UhOq1qbOjrd1aTa00tVHr7IGRGgQzTIeGj+hqk8nfN74Lpn1zU4TYVR6CPJbRM0NZTnSEerVFWf5hYxo4eixJ2b1m+zxmWRcTPVsjxkJsTuamDtYGpiHoao7E3GDULomxD4PoaEvBB/3Vqhe9Z66as0lsYjwhdswZ38x7ifUN7b48966BPu6WwMXZhGAvkFLmNCaC7QHKWlt3GYVEPKBIGrvG+TsIVSttkATShCa9AuJ0FBavZrfpuYTqpVJMVUwEhRslNMGm04uYi6hWq0XF1DPJijldht5hKpaBkCMCDY5iDmEGLDoEH0mQTDNDtRsQrVSjhJ0BUF2XcwmtApvZJ5RsFnN6jQyCa1ViQAx4iSrKmYR6v1SAeKOdpWBmEFoTA/tMbNQn4yYQajWC+6Xn19QahCrIpnQWpWmGY0E68RROJHQ2JiHdpdHqEeKUzLhrHQx6gpKDiFOSYR6r4Qx6orYZRAIVQcc2lVeoWF6aEMgLCppcQjZ6cYmTahOS1kJfaF5Kk7ThFb5usKYmqkwTRGqm/LGqEQqxBShNSlzEeJC3FeGavkGpEmhvpFPaLVL2hcGgnU9l1BtlLYvDGRu1DxCfV7qdsYVXFi5hKXuKjzBHaTkf1WnlJOKpNDcyCbUy5WcIQtOrGxCyz60ewUIgsQkKkGobpi7Cm2rwt0UsJsM0wQh28RQQ5q0vj8fYJ3fr93/FtJKQdcuWJ4/YruPN2sJMttNThOThPRzew2tzy+/KjG9vxwsJSRYmFAz1zdXD3/G7H7AdjWmJT4I4jmpOCH9iA1Jjw/H7scfh/K9uboXaozRekC2+3FpMjw7dGuQCQ3KLLAJrp4SXsS9uRRojc2Bkmn33T390jhs62RCa0FjA9lXRDcCZ664EbWbPLvKuyW15aZFJqw0aQAfn7L9cF35xN3jmA95ht2HR20ptk4TI1QdilDXznf4lJ3AUpQ1N+F7Jcew+51Lyloen0LFCKmqIYx5oezI/+YHXkAJXSpEwzFGyqcXr4gxQr1NUQ3BceTF3bvBzXJtmmi9vBl8vvOcUZQBdz2ES5cGW/n08NHtYWOGA8IbuhYVziwiIdW84k7x+Z4u7yUz2EuLRyAmWg5w//jED4gL8QbT3H3EhtF2NOMa1u6vPgUBQluGgNjSWDSA2qMfOYN1qnPHg4/1ei00dMeDpHV61KAh6dyLEPquCEbT4IiQcuZkPn7B5Qd/8RxEQ4MvyvElda8fG5pGhLT9vWYufzWfK6ThKk//29GKcERIP+w+UBqAaWgazREjQroRTVk0I9RDa3Zor4qUHU4vYvWw9HnEuLRpilB1Du1UoYpWEiPCzWuqhrHuIiSk7SxKIi3sLiLC8me744KLFGFptyeQFWWjIkKamUV5BOupeqiXfGV0V81Ub1Hu5fu07NSYhiFXWgrBaqo/fFWDNjzLC4Zt0aiNJtFWIiFnl7D6GpadYkLTHUK18doIN7uEjv26WhoCIXhlhMHk4p9EeKj0yzPpjbD8+kfWw9dP+Or7w9c/pnn149JK9dXPLdRXRpieH4rM8WHhG9s06jc1ZQlVdwn58zSatD4f3KyLg9S09c3gfCmJGIQglcXgPYUAtccP3gr0w3lBKWV08+Bv9XoUeUFIOhPFvnwIsPBz/qps9y4onwURPYOS9FkJLD6s+YtxlsomMmeEYa1Vq42Xx9FWEOVBKFDhRa1Wu0Afog00ypclr0VSRpgxq2/Kvr796zjySAQRBga/P0UGP/EuahKy+sacyTtQkwP990fk0UfuQAUXocHfvkcG33Hu5ozOJPCursUIZflHFKhL7sbhImYwhki5C2pXkLC6NmTz7TTm0L9jccq9gxa0IoO/xeKUz5p2nSJkPtJ1Gnn0n9huPv5ChJHBbzGD53y72fvpVe4q8wRx/G3rz1PMIdoNkgSB8bff/Jr9v5jBB66qjYbpvRgWa7MFl8rTj++/f/8rsT/yk0AvrR0f//X9999/JPd5c+1Xhem9GBWLdWCqDdIbQLFH99w9hnZPNDjgMAhtJ02osw5qwg2vCQl0GGhANMi1Nz46ShojXLHG13uiQ5+5K6L5jmjwjoMw9o6MGOE1YzTYx0SHvnJHqUl+ZAoP4YKwN9EYMlpaE3fWC+zVB5/IFjlGblqPQMh69hA3pUR//uTeq7/+QrbI0cUSd9BWLLYyzCI85iWEyyeyRY7WmbgLumKxZWqKJ1xnELKXYfw9LnFCtll+FuGXlxClgHzegvGIbEZLc8e/T/WObJEjSOvE8xasuxPBn8TGnW8c6Sqrt+AgJJ+ZUadsvmlfyUMQ/h7/M9Hge/ZHFs2dkoSMswuTPGrjGUZu/Sps1IY2xLNrFYMtZaqdEw9D8o+8yW0XzwTRzDhDyppQXBMqItcoMnSMMKhRnjja5qwTljpbMoo4UhaYWuDg+kgwyJGFTRzmTkQp48hUu0k5pChCi3Tr9PFUnqjXehmEzKuk6eZduRI7y51qvJSvHAbjDU3yHDDrNF/bbRqUJ8FjKbtVmys9mXxHZPKNA6yZffMqmXBQRFdn0OMO4UeOIowy+ilCxrw3lpZobAROqgdCiWfGt0yQOI6/8+YPhzUkoPQutjIjVgl94XFEbKmHy0TyZVg7b29h31Rj+u8fUNwjwIW8vsccPPlHphWuEHU1zXx7i8WcjHI9Wl5+8l6JIXYEOBJaX7mnfu8ul7yrMpOsMtRv41EPITx1BffdjQARWLsHlAvbcQSRhA2C/TdAQdc595/T5E/QNbk/xCPv8I/xn9jdTufs7KzT6XYB/kYhV26E/4gawg6Cru+g6yGQkpTIIY68w5fRQal7Njo6OTk5cnXifjHqdCWxey6ghiCwsYDk3qwmYuoU2p2z0UngoOfpWQfEjJJnwGrVr0cQdI62fxqTa6TL7xiEk95w6jSwnOlmvgDcE5BT7N+I5ODRKOafdkvItelt5Bkg8W2NjHgZ0aLh3Yy4la5Xe7x3R4GzHP/sIFRjY+/Y6ppbQyAYZf39jg0mwNSlPqp1y0OI+fLcOzrpBla1TWplxh/PgLy/92x0OPzafVmjV+s59u+cdjPLL0TclkA0rknuGIKjfYRHJ2fMpZgcRYVPlLn7xBVov4JSjE7n/e23Ot7MCXb3PCIPccQ8tCMRsk63cQl2KLw7Crwzw92XLX+Hm+rOfuEZhQmOUmwWEaVUjx9r26kHKxeGJN9bYTWkCFIPscvoHOqlXkJt9ZmrIZVvoXPbwDGGkix7/b8/NaQjPBqxFiJGTLyP0mC/J4u2CENC/90ff/zEhEv3S52yofGtMM/k0ew2vHcVfzFkv6OH2Tfv5eX6XMaE8sYICKnqMkeYejeItoc+4WY14xml08ZX8IGS5V53VPMIL/4Is8GUz4md0P3MsZc+qdpcsyzaNqIT9vmY0Ppb9ghl3BD4h9Upg509Sj35W685t8xTtvNREwGtiurIW8JWw9gex6eLU+YesQhCqoc/iv4A18M/fgaE8k8ryOjTdKt8QSpIKJ1SjLdGUlSEdQs3MyGhPLeCDbSwu9dOh3MSJUZIMWY+iwDdDaaNVoywpYcZ/b3jd15AUcK9855EaGk9L0ZDQvlnNWaqmzcH4wxRcULcAeTOXZOJFjS9lhOEcq8eM3Vqd0YnpIn+qCuQZxElzMo/HLn5h51EEgSOvEPYSiwewlPJ7kS5Gj9bM+rY+/NuOZ35XsLcv/Z0eiq5AZZ066wrpRJlcPFzl1Bu7f4OhKdgm846O+t0u3B/wg22h7fZc4Z9hHDWH672fIKXZwvd6nS6doZbYzlFKJOGGtuUpKe9ny3BlWUYVuZFPFvCrKOcWh2PWC2qDSGBW+lUafgbMoGwJv7CNhdBVRfEXDXUet5M1OiTHxaqew+goNfCj0mEsqhV6O9EUvV5KlkIIZoFl4XqjUn6znEN9vyLfQt6E1CLSHghWohwe7pYr/Sa7vG67UzNTdPXb6N0m2ptJiAGiRsYe9XQt9mUQgDHMpFQFjUOm8Hiq64Oe/WmhFyB2WI+Tc6AVcuZL+q292OpWV8Nq9ubmdViLtiIn91IEArXRDgLL1g2dL3acKbTqdNQ9fBmaSPI2KiGZXg/njpVPbzpXjUWRZxiBLEiTBLKwguA0N7E7sneprij/+v9nm5k/hjX0FkhxzShnEnYEm9OYa+ScSGoqjsLhOqbrKvCDWNezFsPEmeydgjFGxvcKjbnBgHCsJyVCwBhe6dSbvH126IuWB7LOYTicYql2aup5S3EBMGoW/pwIQWvxoaTvuot1ASVz9CtxnWzsCvJ5VzCViEfg0x7Md84VZeuWnWG1xMp3gVCpLmLbQ3355WqM+23myyXO+Qr3o6SCFPDU165K6J2c1afNXGnkF4SxT9GwP/x/vE2i5KVkERYxOAtJpizrO3VyiI/TNrpKDIIi2htDqY0IIlQHpcWEZhpGhJheREJgGTCsiIiEguZsJSIpBDNJiwhYgZgJmHpWlRCK7qHsOB+8bkFLrI4sgkLGsD9GqVGMlSEcguVpRhhK5sij7As7U1WG0NDKNcO7T2FsqsgDaHcMl94MYK8CKUhfOndxp4CpCJ8yQ3O3gKkI3Rr4wtl3FuAtIQvs1EF4/0FSE8ot14aIzCp+OgJX1h1BDB7EMNN+IJ6DgY+NkLc5LyEWAUmAx8roVcfDwtJ2b7wE2JdwIMxAnjByMdF6AbrITpIII2ZwlOEEAdrzfy10QoAYi8+EUIXEkfrL4IEPNEpTih7Jfn8dRJIJj+eKKGr2hg9X1HiwhvXRPCKIJTdohw/Q8AWQeeqCEJXrdqFKRWFie2gQuhcFUXoCWOOoQQEQPGfQrMwOE+FEnpquZy4BQIMpN4vY7SLWqtIOE/FEwZq1TDpGPmoOcIBickKLbaEno8wphZWLSX3u7/gw38J4UH1Rlh+vRGWX2+E5dcbYfn1+gn/D9EFdI0ijh27AAAAAElFTkSuQmCC'/>
                    </div>
                    <div className='employee-info-container'>
                        <div className='employee-info-top'>
                            <h2 className='employee-name'>{empName}</h2>
                            {terminationDate === null ? (
                                <div className='employee-btn-container'>
                                <button className='employee-btn-update' onClick={() => openModal('updateEmp')}>정보 수정</button>
                                <button className='employee-btn-terminate' onClick={() => openModal('terminateEmp')}>퇴사</button>
                            </div>
                                ) : (
                            <div></div>
                                )}
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
                                <div className='employee-info2'>{new Intl.NumberFormat('ko-KR').format(salary)}</div>
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
                    closeModal={closeModal}
                />}
            </Modal>
        </div>
    );
}

export default EmployeeInfo;
