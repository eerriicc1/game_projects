// src/games/reversi/ReversiPage.jsx
import React from 'react';
import Board from './Board';
import './styles.css';

export default function ReversiPage() {
  return (
    <div className="reversi-page">
      <h1>Reversi</h1>
      <Board />
    </div>
  );
}
