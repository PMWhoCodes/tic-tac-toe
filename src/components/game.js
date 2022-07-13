import { useState } from "react";
import Board from "./board";

const Game = () => {

    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }])
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true)

    const handleClick = (i) => {
        const timeInHistory = history.slice(0, stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(timeInHistory.concat([{
            squares: squares,
            row: Math.floor(i / 3) + 1,
            column: i % 3 + 1
        }])
        );
        setStepNumber(history.length);
        setXIsNext(!xIsNext)
    }

    const jumpTo = (step) => {
        setXIsNext(step % 2 === 0);
        setStepNumber(step)
    }

    const reset = () => {
        setHistory([{ squares: Array(9).fill(null) }]);
        setStepNumber(0);
        setXIsNext(true)
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
        const desc = move ?
            `Go to move #${move} (${history[move].row},${history[move].column})` :
            'Go to game start';
        return (
            <li key={move} >
                <button
                    className={move === stepNumber ? 'bold' : ''}
                    onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = 'Winner ' + winner;
    } else {
        status = 'Next player ' + (xIsNext ? 'X' : 'O')
    }
    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ul>{moves}</ul>
                <button className="reset" onClick={() => reset() }>Reset</button>
            </div>
        </div>
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

export default Game