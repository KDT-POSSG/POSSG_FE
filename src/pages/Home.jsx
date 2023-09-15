import React, { useEffect, useState } from 'react';
import homeMenuDatas from '../assets/datas/homeMenuDatas'
import HomeItem from 'components/home/HomeItem';
import HomeItemEdit from 'components/home/HomeItemEdit';
import axios from 'axios';

function Home() {

  const [homeMenu, setHomeMenu] = useState();

  useEffect(() => {

    setHomeMenu(homeMenuDatas);

    // axios.get("http://10.10.10.81:3000//favoritePageList", {
    //     params: {
    //       convSeq: 1
    //     }
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setHomeMenu(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   })

  }, []);

  return (
    <div className='home-page'>
      
      <div className='home-container'>
        {
          homeMenuDatas && homeMenuDatas.map((item) => (
            item.favoriteEnable === "enable" ?
            (<HomeItem key={item.seq} item={item} />)
            :
            (<React.Fragment key={item.seq}></React.Fragment>)
          ))
        }
        <HomeItemEdit />
      </div>

    </div>
  )
}

export default Home;