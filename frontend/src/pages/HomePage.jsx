import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home-page">
      <h1>My Games Website</h1>
      <nav>
        <ul>
          <li><Link to="/reversi">Reversi</Link></li>
        </ul>
      </nav>
    </div>
  );
}
