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

import Paymenttest from './pages/Paymenttest';

import Paymentlist from './pages/Paymentlist';
import ProductList from 'pages/ProductList';
import Login from 'components/convenience/Login';
import Stock from 'pages/Stock';

import AttendaceCheck from './components/employees/AttendanceCheck';
import MyPage from 'components/convenience/Mypage';
import UpdateMyPage from 'components/convenience/UpdateMyPage';
import FindId from 'components/convenience/FindId';
import Home from 'pages/Home';
import FindPw from 'components/convenience/FindPw';
import Order from 'pages/Order';
import OrderDetail from 'pages/OrderDetail';
import RegisterCustomer from 'components/customer/RegisterCustomer';
import AddCost from 'components/analysis/AddCost';
import OrderCart from 'pages/OrderCart';
import Analysis from 'components/analysis/Analysis';
import SalesReport from 'components/analysis/SalesReport';
import DailySales from 'components/analysis/DailySales';
import MonthlySales from 'components/analysis/MonthlySales';
import Delivery from 'pages/Delivery';
import Cost from 'components/analysis/Cost';
import YearSales from 'components/analysis/YearSales';
import DeliveryDetail from 'components/delivery/DeliveryDetail';
import DeliveryList from 'components/delivery/DeliveryList';
import PrivateRoutes from 'components/PrivateRoutes';
import UpdateCost from 'components/analysis/UpdateCost';
import ImcomeReport from 'components/analysis/ImcomeReport';

function App() {
  return (
    <BrowserRouter>
      <Toaster toastOptions={{ className: 'common-toast' }} />
      <Header />
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/findId' element={<FindId />} />
        <Route path='/findPw' element={<FindPw />} />

        {/* <Route element={<PrivateRoutes />}> */}
          {/* <Route element={<Header />} /> */}
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<ProductList />} />
          <Route path='/check' element={<AttendaceCheck />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/paymentlist' element={<Paymentlist />} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/employees' element={<Employees />}/>
          <Route path='/employeeInfo/:employeeSeq' element={<EmployeeInfo />} />
          <Route path='/stock' element={<Stock />} />
          <Route path='/myPage' element={<MyPage />} />
          <Route path='/updateMyPage' element={<UpdateMyPage />} />
          <Route path='/order' element={<Order />}/>
          <Route path='/order/:callRef' element={<OrderDetail />} />
          <Route path='/paymenttest' element={<Paymenttest />} />
          <Route path='/customerRegister' element={<RegisterCustomer />} />
          <Route path='/analysis' element={<Analysis />} />
          <Route path='/cost' element={<Cost />} />
          <Route path='/addCost' element={<AddCost />} />
          <Route path='/salesReport' element={<SalesReport />}>
            <Route index element={<DailySales />} />
            <Route path='daily' element={<DailySales />} />
            <Route path='monthlySales' element={<MonthlySales />} />
            <Route path='yearSales' element={<YearSales />} />
          </Route>
          <Route path='/ordercart' element={<OrderCart />} />
          <Route path='/delivery' element={<Delivery />}>
            <Route index element={<DeliveryList />} />
            <Route path=':ref' element={<DeliveryDetail />} />
          </Route>
          <Route path='/updateCost' element={<UpdateCost />} />
          <Route path='/imcomeReport' element={<ImcomeReport />} />
        {/* </Route> */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
