import React from 'react';
import Nav from './components/Navbar';
import Timer from './components/Timer';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Settings from './Settings';
import Test from './Test';
import Qr from './QrReader';
import Login from './Login';
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query';
import Dropdown from './Dropdown';

// const queryClient = new QueryClient();

const App = () => {
  return (
    // <QueryClientProvider client={queryClient}>
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/test" element={<Test />} />
        <Route path="/qr" element={<Qr />} />
        <Route path="/dropdown" element={<Dropdown />} />
      </Routes>
    </>
    // </QueryClientProvider>
  );
};

export default App;
