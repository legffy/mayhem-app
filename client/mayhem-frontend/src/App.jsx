import { useState } from 'react'
import Front from './Front';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import Layout from './Layout';
import PrivateRoute from './PrivateRoute';
import { Routes, Route } from "react-router-dom";
import GoogleAuthRedirect from './components/GoogleAuthRedirect';

function App() {
  return (
    <div style={{ fontFamily: "'Roboto Mono', monospace" }}>
    <Routes>
      <Route path="/front" element={<Front/>} />
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/login" element={<LoginPage/>} />
       <Route element={<PrivateRoute />}>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="profile/:id" element={<ProfilePage />} />
    </Route>
  </Route>
      <Route path="/auth/google/success" element={<GoogleAuthRedirect />} />
    </Routes>
    </div>
  );
}
export default App
