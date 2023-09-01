import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';

import './styles/index.scss';
import Register from './components/convenience/Register';
import Inventory from './pages/Inventory';
import Employees from './pages/Employees';
import Payment from './pages/Payment';
import './styles/layout/FullScreenDiv.css'
import ProductList from 'pages/ProductList';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path='/payment' element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
