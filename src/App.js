import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';

import './styles/index.scss';
import Register from './components/convenience/Register';
import Inventory from './pages/Inventory';
import Employees from './pages/Employees';
import Payment from './pages/Payment';
import ProductList from 'pages/ProductList';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Header />
      <Routes>
        <Route path='/payment' element={<Payment />} />
        <Route path='/product' element={<ProductList />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
