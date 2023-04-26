import React from 'react';
import Nav from './components/Navbar';
import Timer from './components/Timer';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Settings from './Settings';
import Test from './Test';
import Qr from './QrReader';
import Login from './Login';

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/test" element={<Test />} />
        <Route path="/qr" element={<Qr />} />
      </Routes>
    </div>
  );
};

export default App;
