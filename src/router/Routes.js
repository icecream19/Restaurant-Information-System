import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from '../components/pages/Homepage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;