import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { ACCESS_TOKEN, baseURL } from 'store/apis/base';
import { EventSourcePolyfill } from 'event-source-polyfill';
import toast from 'react-hot-toast';

function HeaderAlarm() {

  const alarmStyle = {
    content: {
      width: '22.5rem',
      height: '100vh',
      minHeight: '100vh',
      borderRadius: '0',
      top: '0',
      left: 'calc(100% - 22.5rem)',
      transform: 'translate(0, 0)',
      padding: '0',
      backgroundColor: '#fff',
    },
  };

  const accessToken = localStorage.getItem("accesstoken");
  const currentDate = new Date();

  const [alarmList, setAlarmList] = useState([]);
  const [isAlarm, setIsAlarm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {

    const eventSource = new EventSourcePolyfill(`${baseURL}/notifications`, {
      headers: {
        accessToken: `Bearer ${accessToken}`,
      },
      heartbeatTimeout: 120000,
    });

    eventSource.onmessage = function(event) {

      const product = JSON.parse(event.data);
      console.log("product >> ", product);
      console.log("onmessage 들어옴");

      setAlarmList(product);
      setIsAlarm(true);

      toast('알림이 있습니다', {
        icon: <span className="tossface">🔔</span>,
      });
    };

    eventSource.onerror = function(error) {
      console.error("SSE Error >> ", error);
      eventSource.close();
    };
    
  }, []);

  const handleExpirationDate = (productDate) => {
    
    const expirationDate = new Date(productDate);

    if(expirationDate < currentDate) {
      return "지났습니다";
    }
    else {
      return "임박했습니다";
    }
  }

  const modalOpen = () => {
    setIsModalOpen(true);
    setIsAlarm(false);
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

        <div className='alarm-container'>

          <div className='tossface alarm-icon'>🔔</div>

          <div>
            {
              alarmList && alarmList.map((item) => (
                <div key={item.productSeq} className='alarm-item'>
                  <div className='alarm-item-date'>
                    <span className='date-left'>상품유통기한</span>
                    <span className='date-right'>{item.expirationDate}</span>
                  </div>
                  <div>
                    '{item.productName}' 상품의 유통기한이 {handleExpirationDate(item.expirationDate)}
                  </div>
                </div>
              ))
            }
          </div>

        </div>

      </Modal>
    </div>
  )
}

export default HeaderAlarm;