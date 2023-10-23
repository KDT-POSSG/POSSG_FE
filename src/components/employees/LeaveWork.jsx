import { useState } from "react";
import { toast } from "react-hot-toast";
import React from "react";
import axios from "axios";

function LeaveWork({ onClose }) {
  const accesstoken = localStorage.getItem("accesstoken");
  const [employeeSeq, setEmployeeSeq] = useState(0);
  const [leavework, setLeaveWork] = useState("");

  const handleclickLeaveWork = () => {
    axios
      .post("http://54.180.60.149:3000/leavework", null, {
        params: { employeeSeq: employeeSeq },
        headers: { accessToken: `Bearer ${accesstoken}` },
      })
      .then((res) => {
        if (res.data === "YES") {
          setLeaveWork(res.data.leavework);
          console.log("퇴근 성공");
          toast.success("퇴근 성공! 수고하셨습니다");
        } else if (res.data === "ALREADY CHECK") {
          toast.error("출근을 먼저 해주세요");
        } else {
          console.log(res.data);
        }
        onClose();
      })
      .catch((err) => {
        console.log("Error Response:", err.response);
        console.log("퇴근 실패");
        toast.error("퇴근에 실패했습니다");
      });
  };

  return (
    <div className="attendancecheck-container">
      <div className="attendancecheck">
        <div className="attendancecheck-title">퇴근</div>
        <div className="attendancecheck-subtitle">
          직원 번호를 입력해 주세요
        </div>
        <div>
          <input
            className="attendancecheck-input"
            placeholder="직원번호"
            onChange={(e) => setEmployeeSeq(parseInt(e.target.value))}
          />
          <button
            className="attendancecheck-btn"
            onClick={handleclickLeaveWork}
          >
            퇴근
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeaveWork;
