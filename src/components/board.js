import Square from "./square";

const Board = (props) => {

    let board = [];
    for (let row = 0; row < 3; row++) {
        let rows = []
        for (let col = 0; col < 3; col++) {
            let squareId = (row * 3 + col);
            let isWinner = false;
            if (props.winnerLine !== null){
                if (props.winnerLine.includes(squareId) === true){
                    isWinner = true;
                }
            }
            rows.push(
                <Square
                    key={squareId}
                    modifier={isWinner ? "winner" : ""}
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