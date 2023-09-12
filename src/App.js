import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './styles/index.scss';

import Header from './components/layout/Header';

import Register from './components/convenience/Register';
import Inventory from './pages/Inventory';
import Employees from './pages/Employees';
import EmployeeInfo from './components/employees/EmployeeInfo';
import Payment from './pages/Payment';
import Paymentlist from './pages/Paymentlist';
import ProductList from 'pages/ProductList';
import Login from 'components/convenience/Login';
import Stock from 'pages/Stock';

import AttendaceCheck from './components/employees/AttendanceCheck';
import MyPage from 'components/convenience/Mypage';
import UpdateMyPage from 'components/convenience/UpdateMyPage';
import FindId from 'components/convenience/FindId';
import Home from 'pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Header />
      <Routes>
        {/* <Route path='/' element={<AttendaceCheck />} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/paymentlist' element={<Paymentlist />} />
        <Route path='/product' element={<ProductList />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/employees/' element={<Employees />}/>
        <Route path='/employeeInfo/:employeeSeq' element={<EmployeeInfo />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/stock' element={<Stock />} />
        <Route path='/myPage' element={<MyPage />} />
        <Route path='/updateMyPage' element={<UpdateMyPage />} />
        <Route path='/findId' element={<FindId />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
