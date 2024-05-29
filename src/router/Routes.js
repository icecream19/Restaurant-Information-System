import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Checkout from '../components/pages/Checkout';
import Homepage from '../components/pages/Homepage';
import Manage from '../components/pages/Manage';
import Navbar from '../components/Elements/Navbar';
import Order from '../components/pages/Order';
import OrderStatus from '../components/pages/OrderStatus';

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/order" element={<Order />} />
        <Route path="/orderstatus" element={<OrderStatus />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

