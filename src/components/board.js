import React from "react";
import Square from "./square";

const Board = (props) => {

    let board = []
    for (let row = 0; row < 3; row++) {
        let rows = []
        for (let col = 0; col < 3; col++) {
            let squareId = (row * 3 + col);
            rows.push(
                <Square
                    key={squareId}
                    value={props.squares[squareId]}
                    onClick={() => props.onClick(squareId)}
                />)
        }
        board.push(<div key={row} className="board-row">{rows}</div>)
    }

    return (
        <div>
            {board}
        </div>
    );
}

export default Board