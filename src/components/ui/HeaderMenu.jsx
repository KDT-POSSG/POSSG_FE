import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import menuDatas from '../../assets/datas/menuDatas.json';
import logo from '../../assets/svg/possg_logo.svg';
import axios from 'axios';

function HeaderMenu() {
  const accesstoken = localStorage.getItem("accesstoken");
  const navi = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  }

  const handleLogout = () => {
    console.log("dd")
    axios.get("http://10.10.10.205:3000/logout",
        {
            headers: {
                accessToken: `Bearer ${accesstoken}`, 
                Authorization: `Bearer ${accesstoken}`
            }
        }
        )
        .then((res)=>{
          console.log("res >>> ", res);
            if(res.data==="YES"){
                console.log("로그아웃 성공");
                localStorage.removeItem("accessToken");
                navi("/login");
            }else{
                console.log("로그아웃 실패")
            }
        })
        .catch((err)=>{
          console.error("캐치 에러")
            console.log(err)
        })
  }

  return (
    <div className='menu-container'>

      <span className="material-symbols-rounded menu-icon" onClick={handleMenu}>menu</span>

      <div className={isOpen ? 'menu-back' : 'menu-back menu-back-nonview'}>
      </div>

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
            item.id === 5 || item.id === 7 ? 
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
        </div>
      </div>

      <button onClick={handleLogout}>로그아웃테스트</button>

    </div>
  )
}

export default HeaderMenu;