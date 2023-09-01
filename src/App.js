import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import Header from './components/layout/Header';

import './styles/index.scss';
import Register from './components/convenience/Register';
import Inventory from './pages/Inventory';
import Employees from './pages/Employees';
import Payment from './pages/Payment';
import './styles/layout/FullScreenDiv.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
