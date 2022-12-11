import React from "react";
import Square from "./Square";

/**
 * 类组件
 */
class Board extends React.Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i: any) {
        const squares = this.state.squares.slice();

        squares[i] = this.state.xIsNext ? '⭕️':'❌'
        this.setState({squares: squares,
            xIsNext: !this.state.xIsNext,
        });

    }

    renderSquare(i: any) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
    }

    render() {
        const status = 'Next player: ' + (this.state.xIsNext ? '️⭕':'❌');

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;