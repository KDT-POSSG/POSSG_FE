import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

function TerminateEmployeeModal({ employeeSeq, empName }) {
  const accesstoken = localStorage.getItem("accesstoken");
  const navigate = useNavigate();
  const [terminateemployee, setTerminateEmployee] = useState(""); // 퇴사 직원 번호

  // 직원을 퇴사 처리
  const handleTerminate = () => {
    axios
      .post("http://54.180.60.149:3000/terminateEmployee", null, {
        params: { employeeSeq: employeeSeq },
        headers: { accessToken: `Bearer ${accesstoken}` },
      })
      .then((res) => {
        setTerminateEmployee(res.data.terminateemployee);
        console.log("직원 퇴사 성공");
        toast.success("직원 퇴사가 완료되었습니다");
        navigate("/employees");
      })
      .catch((err) => {
        console.log(err);
        console.log("직원 퇴사 실패");
        toast.error("직원 퇴사에 실패했습니다");
      });
  };

  return (
    <div className="terminateemployeemodal">
      <div className="terminate-container">
        <div className="terminate-title">직원 퇴사</div>
        <div className="terminate-msg">
          직원 번호 {employeeSeq}번 {empName}님을 퇴사 처리하시겠습니까?
        </div>
        <button className="terminate-btn" onClick={handleTerminate}>
          확인
        </button>
      </div>
    </div>
  );
}

export default TerminateEmployeeModal;
