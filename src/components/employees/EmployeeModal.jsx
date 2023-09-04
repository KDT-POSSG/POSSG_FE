import React, { useState } from 'react';
import axios from 'axios';

function EmployeeModal() {
  // 각 입력 필드에 대한 상태를 설정합니다.
  const [empName, setEmpName] = useState('');
  const [convSeq, setConvSeq] = useState(0);
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [salary, setSalary] = useState(0);

  // 제출 버튼을 누를 때 실행될 함수입니다.
  const handleSubmit = () => {
    
    // 입력한 정보를 JSON 형식으로 만듭니다.
    const employeeData = {
      empName,
      convSeq,
      birthDate,
      gender,
      phoneNumber,
      hireDate,
      salary
    };

    // axios를 사용하여 서버에 데이터를 전송합니다.
    axios.post('http://10.10.10.90:3000/addemployee', employeeData)
      .then(response => {
        // 성공적으로 데이터를 보냈을 경우 실행될 코드
        console.log('데이터 성공적으로 전송', response);
      })
      .catch(error => {
        // 데이터 전송에 실패했을 경우 실행될 코드
        console.log('데이터 전송 실패', error);
      });
  };

  return (
    <div>
      <h1>직원 모달</h1>
      <form>
        <input type="text" placeholder="이름" value={empName}  onChange={(e) => setEmpName(e.target.value)} />
        <input type="number" placeholder="convSeq"  onChange={(e) => setConvSeq(parseInt(e.target.value))} />
        <input placeholder="생년월일(예: 980123)"  onChange={(e) => setBirthDate(e.target.value)} />
        <input type="text" placeholder="성별"  onChange={(e) => setGender(e.target.value)} />
        <input type="tel" placeholder="전화번호"  onChange={(e) => setPhoneNumber(e.target.value)} />
        <input placeholder="고용일(예: 20230101)"  onChange={(e) => setHireDate(e.target.value)} />
        <input placeholder="급여"  onChange={(e) => setSalary(parseInt(e.target.value))} />
      </form>
      <button onClick={ handleSubmit }>제출</button>
    </div>
  );
}

export default EmployeeModal;
