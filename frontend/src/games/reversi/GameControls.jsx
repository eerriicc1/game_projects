// src/games/reversi/GameControls.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default function GameControls({ blackCount, whiteCount, currentPlayer, showMoves, onRestart, onToggleMoves }) {
  return (
    <div className="game-controls">
      <div className="score">Black: {blackCount} | White: {whiteCount}</div>
      <div className="turn">Turn: {currentPlayer === 1 ? 'Black' : 'White'}</div>
      <button className="btn restart" onClick={onRestart}>Restart</button>
      <button className="btn toggle" onClick={onToggleMoves}>{showMoves ? 'Hide Moves' : 'Show Moves'}</button>
    </div>
  );
}

GameControls.propTypes = {
  blackCount: PropTypes.number.isRequired,
  whiteCount: PropTypes.number.isRequired,
  currentPlayer: PropTypes.number.isRequired,
  showMoves: PropTypes.bool.isRequired,
  onRestart: PropTypes.func.isRequired,
  onToggleMoves: PropTypes.func.isRequired,
};