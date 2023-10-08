import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import menuDatas from '../../assets/datas/menuDatas.json';
import logo from '../../assets/svg/possg_logo.svg';
import axios from 'axios';
import Modal from 'components/Modal';

function HeaderMenu() {

  const accesstoken = localStorage.getItem("accesstoken");
  const navi = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  }

  const handleLogout = () => {

    axios.get("http://10.10.10.205:3000/logout", {
        headers: {
          accessToken: `Bearer ${accesstoken}`, 
        }
      })
      .then((res)=>{
        if(res.status===200){
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("convSeq");
          localStorage.removeItem("branchName");
          navi("/login");
        }else{
          console.log("로그아웃 실패");
        }
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  // useEffect(() => {
  //   if(isOpen) {
  //     document.body.style= `overflow: hidden`;
  //     return () => document.body.style = `overflow: auto`;
  //   }
  // }, [isOpen])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpen = () => {
    setIsModalOpen(true);
  }

  const modalClose = () => {
    setIsModalOpen(false);
  }

  const menuStyle = {
    content: {
      width: '22.5rem',
      height: '100vh',
      borderRadius: '0',
      top: '0',
      left: '0',
      transform: 'translate(0, 0)',
      // top: '50%',
      // left: '50%',
      // right: 'auto',
      // bottom: 'auto',
      // marginRight: '-50%',
    },
  };
  
  return (
    <div className='menu-container'>

      <span className="material-symbols-rounded menu-icon" onClick={modalOpen}>menu</span>

      <Modal isOpen={isModalOpen} onClose={modalClose} style={menuStyle}>
        {/* <div className={isOpen ? 'menu-left' : 'menu-left menu-left-nonview'}> */}
        <div>

          <div className='logo-container'>
            <div>
              <img src={logo} alt="POSSG 로고" height="100%" />
            </div>
          </div>

          <div>
            센텀시티점
            <br /><br />
          </div>
          <hr />

          <ul>
          {
            menuDatas.map((item) => (
              item.id === 3 || item.id === 9 ? 
              <React.Fragment key={item.id}>
                <Link to={item.link} onClick={handleMenu}>
                  <li>{item.name}</li>
                </Link>
                <hr />
              </React.Fragment>
              :
              <React.Fragment key={item.id}>
                <Link to={item.link} onClick={handleMenu}>
                  <li>{item.name}</li>
                </Link>
              </React.Fragment>
            ))
          }
          </ul>

          <hr />
          <div className='header-menu-logout'>
            <button onClick={handleLogout}>로그아웃</button>
            <Link to="/login">&nbsp;&nbsp;&nbsp;&nbsp;로그인</Link>
            <Link to="/register">&nbsp;&nbsp;&nbsp;&nbsp;회원가입</Link>
          </div>

        </div>
      </Modal>

      {/* <div className={isOpen ? 'menu-back' : 'menu-back menu-back-nonview'}>
      </div> */}

      <div className={isOpen ? 'menu-left' : 'menu-left menu-left-nonview'}>

        <div className='logo-container'>
          <div>
            <img src={logo} alt="POSSG 로고" height="100%" />
          </div>
          <div>
            <span className="material-symbols-rounded close-btn" onClick={handleMenu}>close</span>
          </div>
        </div>

        <div>
          센텀시티점
          <br /><br />
        </div>
        <hr />

        <ul>
        {
          menuDatas.map((item) => (
            item.id === 3 || item.id === 9 ? 
            <React.Fragment key={item.id}>
              <Link to={item.link} onClick={handleMenu}>
                <li>{item.name}</li>
              </Link>
              <hr />
            </React.Fragment>
            :
            <React.Fragment key={item.id}>
              <Link to={item.link} onClick={handleMenu}>
                <li>{item.name}</li>
              </Link>
            </React.Fragment>
          ))
        }
        </ul>

        <hr />
        <div className='header-menu-logout'>
          <button onClick={handleLogout}>로그아웃</button>
          <Link to="/login">&nbsp;&nbsp;&nbsp;&nbsp;로그인</Link>
          <Link to="/register">&nbsp;&nbsp;&nbsp;&nbsp;회원가입</Link>
        </div>
      </div>
    </div>
  )
}

export default HeaderMenu;