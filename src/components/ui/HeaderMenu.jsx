import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from 'store/apis/base';
import menuDatas from '../../assets/datas/menuDatas.json';
import logo from '../../assets/svg/possg_logo.svg';
import Modal from 'components/ui/Modal';

function HeaderMenu() {

  const menuStyle = {
    content: {
      width: '20rem',
      height: '100vh',
      minHeight: '100vh',
      borderRadius: '0',
      top: '0',
      left: '0',
      transform: 'translate(0, 0)',
      padding: '0',
      backgroundColor: '#fff',
      paddingBottom: '3.5rem',
    },
  };

  const accesstoken = localStorage.getItem("accesstoken");
  const refreshtoken = localStorage.getItem("refreshtoken");
  const branchName = localStorage.getItem("branchName");

  const navi = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpen = () => {
    setIsModalOpen(true);
  }

  const modalClose = () => {
    setIsModalOpen(false);
  }

  const handleLogout = () => {

    modalClose();

    axios.get(`${baseURL}/logout`, {
        headers: {
          accessToken: `Bearer ${accesstoken}`, 
          refreshToken: `${refreshtoken}`, 
        }
      })
      .then((res)=>{
        if(res.status === 200){
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("refreshtoken");
          localStorage.removeItem("convSeq");
          localStorage.removeItem("branchName");
          navi("/login");
        }
        else{
          console.log("로그아웃 실패");
        }
      })
      .catch((err)=>{
        console.log(err);
      })
  }
  
  return (
    <div className='menu-container'>

      <span className="material-symbols-rounded menu-icon" onClick={modalOpen}>menu</span>

      <Modal isOpen={isModalOpen} onClose={modalClose} style={menuStyle}>

        <div className='menu-left'>

          <div className='logo-container'>
            <img src={logo} alt="POSSG 로고" width="100%" />
          </div>

          <Link to={"/myPage"} onClick={modalClose}>
            <div className='menu-branch'>
              <span>{branchName}</span>
              <span className="material-symbols-rounded">chevron_right</span>
            </div>
          </Link>
          <hr />

          <ul>
          {
            menuDatas.map((item) => (
              item.id === 3 || item.id === 9 ? 
              <React.Fragment key={item.id}>
                <Link to={item.link} onClick={modalClose}>
                  <li className='menu-name'>{item.name}</li>
                </Link>
                <hr />
              </React.Fragment>
              :
              <React.Fragment key={item.id}>
                <Link to={item.link} onClick={modalClose}>
                  <li className='menu-name'>{item.name}</li>
                </Link>
              </React.Fragment>
            ))
          }
          </ul>

          <hr />
          <div className='header-menu-logout'>
            <button onClick={handleLogout}>로그아웃</button>
          </div>

        </div>

      </Modal>
    </div>
  )
}

export default HeaderMenu;