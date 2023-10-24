import React, { useState } from "react"; 
import { toast } from "react-hot-toast";
import axios from "axios";

function ModifyEmployeeModal({ employeeSeq, onUpdate, employeeData }) {
  const accesstoken = localStorage.getItem("accesstoken");
  const [gender, setGender] = useState(employeeData.gender);
  const [empName, setEmpName] = useState(employeeData.empName);
  const [phoneNumber, setPhoneNumber] = useState(employeeData.phoneNumber);
  const [birthDate, setBirthDate] = useState(employeeData.birthDate);
  const [hireDate, setHireDate] = useState(employeeData.hireDate);
  const [salary, setSalary] = useState(employeeData.salary);
  

  //직원 정보를 수정
  const updateEmployee = () => {
    const formatDate = (dateString) => {
      if (dateString.length === 8) {
        return `${dateString.substring(0, 4)}-${dateString.substring(
          4,
          6
        )}-${dateString.substring(6, 8)}`;
      }
      return dateString;
    };

    const employeeData = {
      empName,
      birthDate: formatDate(birthDate),
      gender,
      phoneNumber,
      salary,
      hireDate: formatDate(hireDate),
      employeeSeq,
    };

    axios
      .post("http://54.180.60.149:3000/updateEmployee", employeeData, {
        headers: { accessToken: `Bearer ${accesstoken}` },
      })
      .then((res) => {
        if (res.data === "YES") {
          console.log("직원 수정 성공");
          onUpdate();
          toast.success("직원 정보 수정이 완료되었습니다");
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log("직원 수정 실패");
        toast.error("직원 정보 수정에 실패했습니다");
      });
  };

  return (
    <div className="addemployeemodal">
      <div className="regi-content">
        <div className="form-row">
          <div className="input-container">
            <input
              className="input-text"
              value={empName}
              onChange={(e) => setEmpName(e.target.value)}
              required
            />
            <label className="label-helper" htmlFor="id">
              <span>이름</span>
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="input-birth-container">
            <div className="input-container">
              <input
                type="text"
                className="input-birth"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
              <label className="label-helper" htmlFor="branchName">
                <span>생년월일</span>
              </label>
            </div>

            <div className="input-gender">
              <input
                id="gender-male"
                type="radio"
                name="gender"
                value="남성"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "남성"}
              />
              <label htmlFor="gender-male">남성</label>
              <input
                id="gender-female"
                type="radio"
                name="gender"
                value="여성"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "여성"}
              />
              <label htmlFor="gender-female">여성</label>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="input-container">
            <input
              type="text"
              className="input-text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <label className="label-helper" htmlFor="repreName">
              <span>연락처 ex.01012345678</span>
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="input-container">
            <input
              type="text"
              className="input-text"
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
              required
            />
            <label className="label-helper" htmlFor="repreName">
              <span>고용 날짜</span>
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="input-container">
            <input
              type="text"
              className="input-text"
              value={salary}
              onChange={(e) => setSalary(e.target.value ? parseInt(e.target.value) : 0)}
              required
            />
            <label className="label-helper" htmlFor="repreName">
              <span>시급</span>
            </label>
          </div>
        </div>

        <div className="btn-container">
          <button className="regi-btn" onClick={updateEmployee}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModifyEmployeeModal;
