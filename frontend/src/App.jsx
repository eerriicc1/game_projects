// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HomePage from './pages/HomePage';
import ReversiPage from './games/reversi/ReversiPage';

export default function App() {
  return (
    <>
      <Dashboard />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reversi" element={<ReversiPage />} />
      </Routes>
    </>
  );
}

