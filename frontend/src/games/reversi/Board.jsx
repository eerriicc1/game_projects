// src/games/reversi/Board.jsx
import React, { useState } from 'react';
import './styles.css';

const BOARD_SIZE = 8;
const EMPTY = 0;
const BLACK = 1;
const WHITE = -1;
const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],          [0, 1],
  [1, -1],  [1, 0], [1, 1]
];

function initializeBoard() {
  const board = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(EMPTY)
  );
  board[3][3] = BLACK;
  board[4][4] = BLACK;
  board[3][4] = WHITE;
  board[4][3] = WHITE;
  return board;
}

function getFlippable(board, row, col, player) {
  const opponent = -player;
  const flips = [];

  DIRECTIONS.forEach(([dr, dc]) => {
    const positions = [];
    let r = row + dr, c = col + dc;
    while (
      r >= 0 && r < BOARD_SIZE &&
      c >= 0 && c < BOARD_SIZE &&
      board[r][c] === opponent
    ) {
      positions.push([r, c]);
      r += dr;
      c += dc;
    }
    if (
      r >= 0 && r < BOARD_SIZE &&
      c >= 0 && c < BOARD_SIZE &&
      board[r][c] === player
    ) {
      flips.push(...positions);
    }
  });

  return flips;
}

export default function Board() {
  const [board, setBoard] = useState(initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useState(BLACK);

  const handleCellClick = (row, col) => {
    if (board[row][col] !== EMPTY) return;
    const flips = getFlippable(board, row, col, currentPlayer);
    if (flips.length === 0) return;

    const newBoard = board.map(r => r.slice());
    newBoard[row][col] = currentPlayer;
    flips.forEach(([r, c]) => newBoard[r][c] = currentPlayer);

    setBoard(newBoard);
    setCurrentPlayer(-currentPlayer);
  };

  return (
    <div className="board">
      {board.map((rowArr, rowIdx) => (
        <div key={rowIdx} className="board-row">
          {rowArr.map((cell, colIdx) => (
            <div
              key={colIdx}
              className="board-cell"
              onClick={() => handleCellClick(rowIdx, colIdx)}
            >
              {cell === BLACK && <div className="piece black" />}
              {cell === WHITE && <div className="piece white" />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}