import "./App.css";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Game() {
  //const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setCurrentMove(nextHistory.length - 1);

    //setXIsNext(!xIsNext);
    setHistory(nextHistory);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    //setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, index) => {
    let description = "Jump to begin game";
    if (index > 0) {
      description = "Jump to move # " + index;
    }

    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleSquareClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const updateSquare = squares.slice();
    if (xIsNext) {
      updateSquare[i] = "X";
    } else {
      updateSquare[i] = "O";
    }

    onPlay(updateSquare);
  }

  let status;
  const winner = calculateWinner(squares);
  if (winner) {
    status = "Winner is : " + winner;
  } else {
    status = "Next Player is : " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="button-row">
        <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
      </div>
      <div className="button-row">
        <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
      </div>
      <div className="button-row">
        <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
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
  return null;
}
