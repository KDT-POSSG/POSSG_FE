import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './styles/index.scss';

import PrivateRoutes from './components/PrivateRoutes';

import Header from './components/layout/Header';

import Register from './pages/Register';
import Inventory from './pages/Inventory';
import Employees from './pages/Employees';
import EmployeeInfo from './pages/EmployeeInfo';
import Payment from './pages/Payment';
import Paymentlist from './pages/Paymentlist';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Stock from './pages/Stock';
import MyPage from './pages/Mypage';
import UpdateMyPage from './components/convenience/UpdateMyPage';
import FindId from './components/convenience/FindId';
import Home from './pages/Home';
import FindPw from './components/convenience/FindPw';
import Order from './pages/Order';
import OrderDetail from './pages/OrderDetail';
import RegisterCustomer from './components/customer/RegisterCustomer';
import AddCost from './components/analysis/AddCost';
import OrderCart from './pages/OrderCart';
import Analysis from './pages/Analysis';
import SalesReport from './components/analysis/SalesReport';
import DailySales from './components/analysis/DailySales';
import MonthlySales from './components/analysis/MonthlySales';
import Delivery from './pages/Delivery';
import Cost from './components/analysis/Cost';
import YearSales from './components/analysis/YearSales';
import DeliveryDetail from './components/delivery/DeliveryDetail';
import DeliveryList from './components/delivery/DeliveryList';
import UpdateCost from './components/analysis/UpdateCost';
import ImcomeReport from './components/analysis/ImcomeReport';
import MonthlyImcome from './components/analysis/MonthlyImcome';
import YearImcome from './components/analysis/YearImcome';
import { RecoilRoot } from 'recoil';
import HomeKiosk from 'pages/HomeKiosk';
import PosRoutes from 'components/PosRoutes';
import ProductScroll from 'pages/ProductScroll';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Toaster toastOptions={{ className: 'common-toast' }} />
        {/* <Header /> */}
        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/findId' element={<FindId />} />
          <Route path='/findPw' element={<FindPw />} />

          <Route element={<PrivateRoutes />}>

            <Route element={<PosRoutes />}>
              
              <Route path='/' element={<Home />} />
              <Route path='/myPage' element={<MyPage />} />
              <Route path='/updateMyPage' element={<UpdateMyPage />} />
              <Route path='/paymentlist' element={<Paymentlist />} />
              <Route path='/inventory' element={<Inventory />} />
              <Route path='/stock' element={<Stock />} />
              <Route path='/ordercart' element={<OrderCart />} />
              <Route path='/order' element={<Order />}/>
              <Route path='/order/:callRef' element={<OrderDetail />} />
              <Route path='/delivery' element={<Delivery />}>
                <Route index element={<DeliveryList />} />
                <Route path=':ref' element={<DeliveryDetail />} />
              </Route>
              <Route path='/analysis' element={<Analysis />} />
              <Route path='/cost' element={<Cost />} />
              <Route path='/addCost' element={<AddCost />} />
              <Route path='/salesReport' element={<SalesReport />}>
                <Route index element={<DailySales />} />
                <Route path='daily' element={<DailySales />} />
                <Route path='monthlySales' element={<MonthlySales />} />
                <Route path='yearSales' element={<YearSales />} />
              </Route>
              <Route path='/updateCost' element={<UpdateCost />} />
              <Route path='/imcomeReport' element={<ImcomeReport />}>
                <Route index element={<MonthlyImcome />} />
                <Route path='monthlyImcome' element={<MonthlyImcome />} />
                <Route path='yearImcome' element={<YearImcome />} />
              </Route>
              <Route path='/employees' element={<Employees />}/>
              <Route path='/employeeInfo/:employeeSeq' element={<EmployeeInfo />} />
              <Route path='/customerRegister' element={<RegisterCustomer />} />
            </Route>

            <Route path='/kiosk' element={<HomeKiosk />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/product' element={<ProductList />} />
            <Route path='/producttest' element={<ProductScroll />} />

          </Route>
          
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
