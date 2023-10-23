import React, { useState } from "react";
import Modal from "../ui/Modal";
import Attendace from "./Attendance";
import LeaveWork from "./LeaveWork";

function AttendanceCehck() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [workType, setWorkType] = useState(null);

  //모달 열고 닫기 (타입으로 구분)
  const openModal = (type) => {
    setWorkType(type);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="home-attendance-container">
      <button
        className="attendance-btn attendance-start"
        onClick={() => openModal("attendance")}
      >
        <span className="tossface">⏳&nbsp;</span>출근
      </button>
      <button
        className="attendance-btn attendance-end"
        onClick={() => openModal("leavework")}
      >
        퇴근<span className="tossface">&nbsp;⌛️</span>
      </button>

      <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        style={{ content: { width: "25rem", height: "13rem" } }}
      >
        {workType === "attendance" && <Attendace onClose={closeModal} />}
        {workType === "leavework" && <LeaveWork onClose={closeModal} />}
      </Modal>
    </div>
  );
}

export default AttendanceCehck;
