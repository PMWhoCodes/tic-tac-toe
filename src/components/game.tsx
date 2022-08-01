import * as React from "react";
import { useState } from "react";
import Board from "./board";

type History = {
    squares: string[];
    row: number | undefined;
    column: number | undefined;
}

const Game = () => {

    const [history, setHistory] = useState([{ squares: Array(9).fill(null) , row: 0, column: 0 }])
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [isAscending, setIsAscending] = useState(true);
    // TODO # set game against machine const [isAgainstMachine, setIsAgainstMachine] = useState(false);

    const handleClick = (i) => {
        const timeInHistory = history.slice(0, stepNumber + 1);
        const current = history[history.length - 1];
        const squares: any[] = current.squares.slice();
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
        setHistory([{ squares: Array(9).fill(null) , row: 0, column: 0 }]);
        setStepNumber(0);
        setXIsNext(true)
    }

    const toggleOrder = () => {
        setIsAscending(!isAscending);
    }

    const current = history[stepNumber];
    const winnerLine = calculateWinner(current.squares);
    const winner: any = (
        winnerLine == null ?
            null :
            current.squares[winnerLine[0]]
    );

    const moves: React.ReactElement[] = history.map((step, move) => {
        const desc = move ?
            `Go to move #${move} (${history[move].row},${history[move].column})` :
            'Go to game start';
        return (
            <li key={move} >
                <button
                    className={move === stepNumber ? 'bold-moves' : 'moves'}
                    onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = 'Winner ' + winner;
    } else if(moves.length -1 === current.squares.length) {
        status = `It's a draw`
    }
    else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O')
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    winnerLine={winnerLine}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div className="status">{status}</div>
                <button className="toggle" onClick={() => toggleOrder()}>Toggle order</button>
                <ul>{isAscending ? moves : moves.reverse()}</ul>
                <button className="reset" onClick={() => reset()}>Reset</button>
                <button className="reset">Play against machine</button>
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
            return [a, b, c];
        }
    }
    return null;
}

export default Game