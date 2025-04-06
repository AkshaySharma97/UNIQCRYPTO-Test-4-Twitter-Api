import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import OTP from './components/OTP';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;