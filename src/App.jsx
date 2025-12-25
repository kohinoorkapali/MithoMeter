
import './App.css';
import { useState } from 'react'
import LandingPage from './components/LandingPage/Landingpage';
import {Login} from './components/Login/Login';
import {Register} from './components/Register/Register';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
