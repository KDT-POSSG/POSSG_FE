import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AddEmployeeModal({ onAdd }) {
  const accesstoken = localStorage.getItem("accesstoken");
  const convSeq = localStorage.getItem("convSeq");
  const [empName, setEmpName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("남성");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [salary, setSalary] = useState(0);

  // 추가될 직원 정보 전송
  const handleSubmit = () => {
    //날짜 포맷
    const formatDate = (dateString) => {
      if (dateString.length === 8) {
        return `${dateString.substring(0, 4)}-${dateString.substring(
          4,
          6
        )}-${dateString.substring(6, 8)}`;
      }
      return dateString;
    };

    //직원 정보 json
    const employeeData = {
      empName,
      convSeq,
      birthDate: formatDate(birthDate),
      gender,
      phoneNumber,
      hireDate: formatDate(hireDate),
      salary,
    };

    axios
      .post("http://54.180.60.149:3000/addemployee", employeeData, {
        headers: { accessToken: `Bearer ${accesstoken}` },
      })
      .then((response) => {
        console.log("추가할 직원의 정보 전송 성공");
        onAdd();
        toast.success("직원 등록이 완료되었습니다");
      })
      .catch((error) => {
        console.log("데이터 전송 실패", error);
        toast.error("직원 등록에 실패하였습니다");
      });
  };

  return (
    <div className="addemployeemodal">
      <div className="regi-content">
        <div className="form-row">
          <div className="input-container">
            <input
              className="input-text"
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
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
              <label className="label-helper" htmlFor="branchName">
                <span>생년월일 (8자리 입력)</span>
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
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <label className="label-helper" htmlFor="repreName">
              <span>연락처 ex) 01012345678</span>
            </label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-container">
            <input
              type="text"
              className="input-text"
              onChange={(e) => setHireDate(e.target.value)}
              required
            />
            <label className="label-helper" htmlFor="repreName">
              <span>고용 날짜 (8자리 입력)</span>
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="input-container">
            <input
              type="text"
              className="input-text"
              onChange={(e) => setSalary(parseInt(e.target.value))}
              required
            />
            <label className="label-helper" htmlFor="repreName">
              <span>시급</span>
            </label>
          </div>
        </div>
        <div className="btn-container">
          <button className="regi-btn" onClick={handleSubmit}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEmployeeModal;
