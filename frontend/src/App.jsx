// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReversiPage from './games/reversi/ReversiPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reversi" element={<ReversiPage />} />
      </Routes>
    </BrowserRouter>
  );
}
