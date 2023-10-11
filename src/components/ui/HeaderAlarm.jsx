import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { ACCESS_TOKEN, baseURL } from 'store/apis/base';
import { EventSourcePolyfill } from 'event-source-polyfill';

function HeaderAlarm() {

  const alarmStyle = {
    content: {
      width: '20rem',
      height: '100vh',
      minHeight: '100vh',
      borderRadius: '0',
      top: '0',
      left: 'calc(100% - 20rem)',
      transform: 'translate(0, 0)',
      padding: '0',
    },
  };

  const accessToken = localStorage.getItem("accesstoken");

  const [alarmList, setAlarmList] = useState([]);
  const [isAlarm, setIsAlarm] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {

    const eventSource = new EventSourcePolyfill(`${baseURL}/notifications`, {
      headers: {
        accessToken: `Bearer ${accessToken}`, // 여기에 실제 토큰을 추가하세요.
    }});

    eventSource.onmessage = function(event) {
      const product = JSON.parse(event.data);
      console.log("event >> ", event);
      console.log("event.data >> ", event.data);
      console.log("product >> ", product);
    };

    eventSource.onerror = function(error) {
      console.error("SSE Error:", error);
    };
    
  }, []);

  const modalOpen = () => {
    setIsModalOpen(true);
  }

  const modalClose = () => {
    setIsModalOpen(false);
  }

  return (
    <div className='header-alarm'>
      <span className="material-symbols-rounded menu-icon" onClick={modalOpen}>
        notifications
      </span>
      <div className={isAlarm ? 'alarm-dot' : ''}></div>

      <Modal isOpen={isModalOpen} onClose={modalClose} style={alarmStyle}>
        알람입니다
      </Modal>
    </div>
  )
}

export default HeaderAlarm;