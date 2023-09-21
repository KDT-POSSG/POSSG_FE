import React, { useEffect, useState } from 'react';
import HomeItem from 'components/home/HomeItem';
import HomeItemEdit from 'components/home/HomeItemEdit';
import axios from 'axios';
import AttendanceCehck from 'components/employees/AttendanceCheck';

function Home() {

  const [isChange, setIsChange] = useState(false);
  const [homeMenu, setHomeMenu] = useState([]);

  useEffect(() => {

    axios.get("http://10.10.10.196:3000/favoritePageList", {
        params: {
          convSeq: 1
        }
      })
      .then((response) => {
        console.log(response.data);
        setHomeMenu(response.data);
      })
      .catch((error) => {
        console.error(error);
      })

  }, [isChange]);

  return (
    <div className='home-page'>
      
      <div className='home-container'>
        {
          homeMenu && homeMenu.map((item) => (
            item.favoriteEnable === "enable" ?
            (<HomeItem key={item.seq} item={item} />)
            :
            (<React.Fragment key={item.seq}></React.Fragment>)
          ))
        }
        <HomeItemEdit homeMenu={homeMenu} isChange={isChange} setIsChange={setIsChange} />
        파이프라인 테스트
      </div>

    </div>
  )
}

export default Home;