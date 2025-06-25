import { useState } from 'react'
import Front from './Front';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';
import { Routes, Route } from "react-router-dom";
import GoogleAuthRedirect from './components/GoogleAuthRedirect';

function App() {
  return (
    <div style={{ fontFamily: "'Roboto Mono', monospace" }}>
    <Routes>
      <Route path="/" element={<Front/>} />
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/auth/google/success" element={<GoogleAuthRedirect />} />
    </Routes>
    </div>
  );
}
export default App
