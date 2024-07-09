import React, { useState, useEffect } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    checkWin();
    checkTie();

    // Switch player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }, [board]);

  const handleClick = (index) => {
    if (!board[index] && !winner) {
      const boardCopy = [...board];
      boardCopy[index] = currentPlayer;
      setBoard(boardCopy);
    }
  };

  const checkWin = () => {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of winLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
  };

  const checkTie = () => {
    if (board.every(cell => cell) && !winner) {
      setWinner('Tie');
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="game">
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className={`cell ${winner ? 'winner' : ''}`} onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      {winner && <div className="winner-message">{winner === 'Tie' ? 'Tie!' : `Winner: ${winner}`}</div>}
      <button className="reset-button" onClick={resetGame}>Reset</button>
    </div>
  );
}

export default App;