
import './App.css';
import { useState } from 'react'
import logo from './assets/Logo.png'
import LandingPage from './components/LandingPage/Landingpage';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App
