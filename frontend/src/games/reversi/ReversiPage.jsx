// src/games/reversi/ReversiPage.jsx
import React, { useState, useEffect } from 'react';
import Board from './Board';
import MoveHistory from './MoveHistory';
import GameControls from './GameControls';
import NavigationControls from './NavigationControls';
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
  const b = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(EMPTY));
  b[3][3] = BLACK; b[4][4] = BLACK; b[3][4] = WHITE; b[4][3] = WHITE;
  return b;
}

function getFlippable(board, r, c, player) {
  const opp = -player;
  return DIRECTIONS.reduce((all, [dr, dc]) => {
    const path = [];
    let rr = r + dr, cc = c + dc;
    while (
      rr >= 0 && rr < BOARD_SIZE &&
      cc >= 0 && cc < BOARD_SIZE &&
      board[rr][cc] === opp
    ) {
      path.push([rr, cc]); rr += dr; cc += dc;
    }
    if (
      rr >= 0 && rr < BOARD_SIZE &&
      cc >= 0 && cc < BOARD_SIZE &&
      board[rr][cc] === player
    ) return all.concat(path);
    return all;
  }, []);
}

export default function ReversiPage() {
  const [history, setHistory] = useState([initializeBoard()]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [moves, setMoves] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(BLACK);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showMoves, setShowMoves] = useState(true);

  const board = history[currentIndex];
  const validMoves = board.flatMap((row, r) =>
    row.map((cell, c) => (cell === EMPTY && getFlippable(board, r, c, currentPlayer).length > 0 ? [r, c] : null)).filter(Boolean)
  );
  const [bCount, wCount] = board.flat().reduce(
    ([b, w], cell) => [b + (cell === BLACK), w + (cell === WHITE)], [0, 0]
  );
  const wipeout = bCount === 0 || wCount === 0;

  useEffect(() => {
    if (wipeout) {
      setGameOver(true);
      setWinner(bCount > wCount ? 'Black' : 'White');
      return;
    }
    if (!validMoves.length && !gameOver) {
      const oppHasMove = board.flatMap((row, r) =>
        row.map((cell, c) => (cell === EMPTY && getFlippable(board, r, c, -currentPlayer).length > 0)).filter(Boolean)
      ).length > 0;
      if (oppHasMove) {
        setMoves(m => [...m, { player: currentPlayer, notation: 'pass' }]);
        setCurrentPlayer(-currentPlayer);
      } else {
        setGameOver(true);
        setWinner(bCount > wCount ? 'Black' : wCount > bCount ? 'White' : 'Draw');
      }
    }
  }, [board, currentPlayer, validMoves, wipeout, bCount, wCount, gameOver]);

  const recordMove = (notation, newBoard = board) => {
    setMoves(m => [...m, { player: currentPlayer, notation }]);
    setHistory(h => [...h.slice(0, currentIndex + 1), newBoard]);
    setCurrentIndex(idx => idx + 1);
  };

  const applyMove = (r, c) => {
    if (gameOver || currentIndex !== history.length - 1) return;
    const flips = getFlippable(board, r, c, currentPlayer);
    if (!flips.length) return;
    const newBoard = board.map(row => row.slice());
    newBoard[r][c] = currentPlayer;
    flips.forEach(([rr, cc]) => newBoard[rr][cc] = currentPlayer);
    recordMove(`${'abcdefgh'[c]}${r + 1}`, newBoard);
    setCurrentPlayer(-currentPlayer);
  };

  const resetGame = () => {
    setHistory([initializeBoard()]);
    setCurrentIndex(0);
    setMoves([]);
    setCurrentPlayer(BLACK);
    setGameOver(false);
    setWinner(null);
  };

  const goStart = () => {
    setCurrentIndex(0);
    setCurrentPlayer(BLACK);
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      const pi = currentIndex - 1;
      setCurrentIndex(pi);
      setCurrentPlayer(pi % 2 === 0 ? BLACK : WHITE);
    }
  };

  const goNext = () => {
    if (currentIndex < history.length - 1) {
      const ni = currentIndex + 1;
      setCurrentIndex(ni);
      setCurrentPlayer(ni % 2 === 0 ? BLACK : WHITE);
    }
  };

  const goEnd = () => {
    const li = history.length - 1;
    setCurrentIndex(li);
    setCurrentPlayer(li % 2 === 0 ? BLACK : WHITE);
  };

  const handleReview = () => {
    goStart();
    setGameOver(false);
  };

  return (
    <div className="reversi-page">
      <h1>Reversi</h1>
      <GameControls
        blackCount={bCount}
        whiteCount={wCount}
        currentPlayer={currentPlayer}
        showMoves={showMoves}
        onRestart={resetGame}
        onToggleMoves={() => setShowMoves(sm => !sm)}
      />
      <div className="board-wrapper">
        <Board
          board={board}
          onCellClick={applyMove}
          validMoves={validMoves}
          showMoves={showMoves}
        />
        <div className="history-wrapper">
          <MoveHistory moves={moves} />
          <NavigationControls
            onStart={goStart}
            onPrev={goPrev}
            onNext={goNext}
            onEnd={goEnd}
            disableStart={currentIndex === 0}
            disablePrev={currentIndex === 0}
            disableNext={currentIndex === history.length - 1}
            disableEnd={currentIndex === history.length - 1}
          />
        </div>
      </div>
      {gameOver && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Game Over</h2>
            <p>Winner: {winner}</p>
            <p>Score — Black: {wipeout ? (winner === 'Black' ? 64 : 0) : bCount} | White: {wipeout ? (winner === 'White' ? 64 : 0) : wCount}</p>
            <button className="modal-button" onClick={resetGame}>Restart</button>
            <button className="modal-button" onClick={handleReview}>Review</button>
          </div>
        </div>
      )}
    </div>
  );
}