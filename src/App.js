import React from 'react';
import './styles/index.scss';
import Inventory from './pages/Inventory';
import Employees from './pages/Employees';
import Payment from './pages/Payment';
import './styles/layout/FullScreenDiv.css'



function App() {
  return (
    <div className='full-screen-div'>
      <Inventory />
      {/* <Employees /> */}
      {/* <Payment/> */}
    </div>
  );
}

export default App;
