import React from "react";
import Square from "./square";
  
  class Board extends React.Component {

    renderSquare(i) {
      return (
        <Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />
        );
    }

    render() {
      let board = []
      for ( let row = 0; row < 3; row++){
        let rows = []
        for ( let col = 0; col < 3 ; col ++){
          let squareId = (row*3+col);
          rows.push(this.renderSquare(squareId))
        }
        board.push(<div key={row} className="board-row">{rows}</div>)
      }

      return (
        <div>
          {board}
        </div>
      );
    }
  }