const Square = props => {
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