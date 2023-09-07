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
    axios.post('http://10.10.10.152:3000/addemployee', employeeData)
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
    <div className="addemployeemodal">
    <div className="regi-content">
                
                    <div className="form-row">
                        <div className="input-container">
                            <input className="input-text" onChange={(e) => setEmpName(e.target.value)} placeholder='이름' required />
                            <label className="label-helper"><span class="material-symbols-rounded">person</span></label>
                            
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" onChange={(e) => setConvSeq(parseInt(e.target.value))} required />
                            <label className="label-helper"><span>지점 번호</span></label>
                           
                        </div>
                    </div>
                    
                    <div className="form-row">
                      <div className='input-birth-container'>
                        <div className="input-container">
                            <input type="text" className="input-text" onChange={(e) => setBirthDate(e.target.value)} required />
                            <label className="label-helper"><span>생년월일 (8자리 입력)</span></label>
                        </div>
                        <div className="input-gender">
                          <input type="radio" vlaue="남성" onChange={(e) => setGender(e.target.value)} checked={gender === "남성"}/>
                          <label htmlFor="gender-male">남성</label>
                          <input type="radio" vlaue="여성" onChange={(e) => setGender(e.target.value)} checked={gender === "여성"} />
                          <label htmlFor="gender-female">여성</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" onChange={(e) => setPhoneNumber(e.target.value)} required />
                            <label className="label-helper"><span>연락처 ex.01056852833</span></label>
                            
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" onChange={(e) => setHireDate(e.target.value)} required />
                            <label className="label-helper"><span>고용 날짜 (8자리 입력)</span></label>
                            
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-container">
                            <input type="text" className="input-text" onChange={(e) => setSalary(parseInt(e.target.value))} required />
                            <label className="label-helper"><span>시급</span></label>
                            
                        </div>
                    </div>

                    
                   
                    
               

                        <div className="btn-container">
                            <button className="regi-btn" onClick={ handleSubmit } >저장</button>
                            {/* <input className="regi-btn" type="submit" value="회원가입" disabled={!formIsValid} /> */}
                        </div>
                
            </div>
            </div>
  );
}

export default AddEmployeeModal;
