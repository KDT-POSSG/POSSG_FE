import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import Header from './components/layout/Header';

import './styles/index.scss';

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
