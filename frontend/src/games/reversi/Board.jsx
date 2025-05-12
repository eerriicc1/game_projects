// src/games/reversi/Board.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default function Board({ board, onCellClick, validMoves, showMoves }) {
  return (
    <div className="board-container">
      <div className="board-header">
        <div className="corner-empty" />
        {['a','b','c','d','e','f','g','h'].map(letter => (
          <div key={letter} className="label-cell">{letter}</div>
        ))}
      </div>
      <div className="board-body">
        {board.map((row, r) => (
          <div key={r} className="board-row">
            <div className="label-cell">{r + 1}</div>
            {row.map((cell, c) => {
              const isValid = showMoves && validMoves.some(([vr, vc]) => vr === r && vc === c);
              return (
                <div
                  key={c}
                  className={`board-cell ${isValid ? 'highlight' : ''}`}
                  onClick={() => onCellClick(r, c)}
                >
                  {cell === 1 && <div className="piece black" />}
                  {cell === -1 && <div className="piece white" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  onCellClick: PropTypes.func.isRequired,
  validMoves: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  showMoves: PropTypes.bool.isRequired,
};