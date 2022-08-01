import * as React from "react";

type SquareProps = {
    modifier: string;
    onClick: () => void;
    value: string;
};

const Square = ( props : SquareProps) => {
    return (
        <button
            className={"square " + props.modifier}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

export default Square;