import React from 'react';
import { Link } from 'react-router-dom';
import menuDatas from '../../assets/datas/menuDatas.json';

function HomeItem({ item }) {

  const handleLink = (seq) => {
    for (let i = 0; i < menuDatas.length; i++) {
      if(seq === menuDatas[i].id) {
        return menuDatas[i].link;
      }
    }
  }
  
  return (
    <Link to={handleLink(item.seq)}>
      <div className='home-item'>{item.pageName}</div>
    </Link>
  )
}

export default HomeItem;