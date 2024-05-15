import './App.css';
import React, { useState } from 'react';

const initialBoard = Array(9).fill(null);

const App = () => {
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] !== 'X' && squares[i] !== 'O') {
        return null;
      }
    }
    return '_';
  };

  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (winner || board[index]) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (row, col) => {
    const index = row * 3 + col;
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index] ? board[index] : "_"}
      </button>
    );
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setXIsNext(true);
  };

  const status = winner === 'X' || winner === 'O'
    ? `Winner: ${winner}`
    : (winner === '_' ? 'Draw' : `Next player: ${xIsNext ? 'X' : 'O'}`);

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {[0, 1, 2].map(row => (
          <div className="board-row" key={row}>
            {[0, 1, 2].map(col => renderSquare(row, col))}
          </div>
        ))}
      </div>
      <div className="status">{status}</div>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default App;
