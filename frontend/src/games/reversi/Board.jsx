// src/games/reversi/Board.jsx
import React, { useState, useEffect } from 'react';
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
  board[3][3] = WHITE;
  board[4][4] = WHITE;
  board[3][4] = BLACK;
  board[4][3] = BLACK;
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
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Count pieces
  const countPieces = (b) => {
    let blackCount = 0, whiteCount = 0;
    b.forEach(row => row.forEach(cell => {
      if (cell === BLACK) blackCount++;
      if (cell === WHITE) whiteCount++;
    }));
    return [blackCount, whiteCount];
  };

  // Get all valid moves for a player
  const getValidMoves = (b, player) => {
    const moves = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (b[r][c] === EMPTY && getFlippable(b, r, c, player).length > 0) {
          moves.push([r, c]);
        }
      }
    }
    return moves;
  };

  // Handle pass and win conditions
  useEffect(() => {
    const [blackCount, whiteCount] = countPieces(board);
    // Capture all pieces
    if (blackCount === 0 || whiteCount === 0) {
      setGameOver(true);
      setWinner(blackCount > whiteCount ? 'Black' : 'White');
      return;
    }
    // Check valid moves for current player
    const moves = getValidMoves(board, currentPlayer);
    if (moves.length === 0) {
      const oppMoves = getValidMoves(board, -currentPlayer);
      if (oppMoves.length > 0) {
        setCurrentPlayer(-currentPlayer); // pass turn
      } else {
        // No moves for either => end by count
        setGameOver(true);
        if (blackCount > whiteCount) setWinner('Black');
        else if (whiteCount > blackCount) setWinner('White');
        else setWinner('Draw');
      }
    }
  }, [board, currentPlayer]);

  const handleCellClick = (row, col) => {
    if (gameOver || board[row][col] !== EMPTY) return;
    const flips = getFlippable(board, row, col, currentPlayer);
    if (flips.length === 0) return;

    const newBoard = board.map(r => r.slice());
    newBoard[row][col] = currentPlayer;
    flips.forEach(([r, c]) => newBoard[r][c] = currentPlayer);
    setBoard(newBoard);
    setCurrentPlayer(-currentPlayer);
  };

  const resetGame = () => {
    setBoard(initializeBoard());
    setCurrentPlayer(BLACK);
    setGameOver(false);
    setWinner(null);
  };

  const [blackCount, whiteCount] = countPieces(board);

  if (gameOver) {
    return (
      <div className="game-over">
        <h2>Game Over</h2>
        <p>Winner: {winner}</p>
        <p>Score — Black: {blackCount} | White: {whiteCount}</p>
        <button onClick={resetGame}>Restart</button>
      </div>
    );
  }

  return (
    <div>
      <div className="game-info">
        <p>Black: {blackCount} | White: {whiteCount}</p>
        <p>Current Turn: {currentPlayer === BLACK ? 'Black' : 'White'}</p>
        <button onClick={resetGame}>Reset Board</button>
      </div>
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
    </div>
  );
}