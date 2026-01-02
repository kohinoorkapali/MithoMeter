
import './App.css';
import LandingPage from './components/LandingPage/Landingpage';
import {Login} from './components/Login/Login';
import {Register} from './components/Register/Register';
import { BrowsePage } from './components/BrowsePage/BrowsePage.jsx';

import { AddPage } from './components/AddPage/AddPage.jsx';



import { Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/add" element={<AddPage/>} />
      </Routes>
  );
}

export default App;
