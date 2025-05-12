import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <nav className="dashboard">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/reversi">Reversi</Link></li>
      </ul>
    </nav>
  );
}