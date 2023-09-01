import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import menuDatas from '../../assets/datas/menuDatas.json';
import logo from '../../assets/svg/possg_logo.svg';

function Menu() {

  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div onClick={handleMenu}>

      <span className="material-symbols-rounded">menu</span>

      {
        isOpen ? 
        <div className='header-menu-container'>
          <div className='header-menu'>

            <div className='logo-container'>
              <div>
                <img src={logo} alt="POSSG 로고" height="100%" />
              </div>
              <div>
                <span className="material-symbols-rounded close-btn">close</span>
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
                  <Link to={item.link}>
                    <li>{item.name}</li>
                  </Link>
                  <hr />
                </React.Fragment>
                :
                <React.Fragment key={item.id}>
                  <Link to={item.link}>
                    <li>{item.name}</li>
                  </Link>
                </React.Fragment>
              ))
            }
            </ul>

            <hr />
            <div className='header-menu-logout'>
              로그아웃
            </div>

          </div>
        </div>
        :
        <></>
      }

    </div>
  )
}

export default Menu;