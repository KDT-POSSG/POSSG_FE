import React, { useState } from 'react';
import axios from 'axios';

function AddEmployeeModal({onAdd}) {
  // 각 입력 필드에 대한 상태를 설정합니다.
  const [empName, setEmpName] = useState('');
  const [convSeq, setConvSeq] = useState(0);
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('남성');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [salary, setSalary] = useState(0);

  // 제출 버튼을 누를 때 실행될 함수입니다.
  const handleSubmit = () => {

    const formatDate = (dateString) => {
      if (dateString.length === 8) {
        return `${dateString.substring(0, 4)}-${dateString.substring(4, 6)}-${dateString.substring(6, 8)}`;
      }
      return dateString;
    };

    // 입력한 정보를 JSON 형식으로 만듭니다.
    const employeeData = {
     empName,
      convSeq,
      birthDate: formatDate(birthDate),
      gender,
      phoneNumber,
      hireDate: formatDate(hireDate),
      salary
    };

    // axios를 사용하여 서버에 데이터를 전송합니다.
    axios.post('http://10.10.10.90:3000/addemployee', employeeData)
      .then(response => {
        // 성공적으로 데이터를 보냈을 경우 실행될 코드
        console.log('데이터 성공적으로 전송', response);
        onAdd();
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
        <input type="text" placeholder="이름" onChange={(e) => setEmpName(e.target.value)} />
        <input type="number" placeholder="convSeq" onChange={(e) => setConvSeq(parseInt(e.target.value))} />
        <input placeholder="생년월일 ex)19980123" onChange={(e) => setBirthDate(e.target.value)} />
        <div>
          <label>
            <input 
              type="radio" 
              value="남성" 
              checked={gender === "남성"} 
              onChange={(e) => setGender(e.target.value)}
            />
            남성
          </label>
          <label>
            <input 
              type="radio" 
              value="여성" 
              checked={gender === "여성"} 
              onChange={(e) => setGender(e.target.value)}
            />
            여성
          </label>
        </div>
        <input type="tel" placeholder="전화번호" onChange={(e) => setPhoneNumber(e.target.value)} />
        <input placeholder="고용일 ex)20230901" onChange={(e) => setHireDate(e.target.value)} />
        <input placeholder="급여"  onChange={(e) => setSalary(parseInt(e.target.value))} />
      </form>
      <button onClick={ handleSubmit }>직원 추가하기</button>
    </div>
  );
}

export default AddEmployeeModal;
