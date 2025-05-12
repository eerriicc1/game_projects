// src/games/reversi/MoveHistory.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default function MoveHistory({ moves, currentIndex, historyLength, onStart, onPrev, onNext, onEnd }) {
  const blackMoves = moves.filter(m => m.player === 1).map(m => m.notation);
  const whiteMoves = moves.filter(m => m.player === -1).map(m => m.notation);

  return (
    <div className="moves-panel">
      <h3>Move History</h3>
      <div className="moves-columns">
        <div className="moves-column">
          <h4>Black</h4>
          <ol>{blackMoves.map((n, i) => <li key={i}>{n}</li>)}</ol>
        </div>
        <div className="moves-column">
          <h4>White</h4>
          <ol>{whiteMoves.map((n, i) => <li key={i}>{n}</li>)}</ol>
        </div>
      </div>
    </div>
  );
}

MoveHistory.propTypes = {
  moves: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
  historyLength: PropTypes.number.isRequired,
  onStart: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
};
