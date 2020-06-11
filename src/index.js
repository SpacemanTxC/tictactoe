// import to use react
import React from 'react';
import ReactDOM from 'react-dom';
//import for css file
import './index.css';


//Components for Game, Board, & Square

//Class to create squares with X
//Replace class with function that will return props
function Square(props){
  return(
    <button className="square" onClick={props.onClick}>
    {props.value}
    </button>
  );
}
//Declair a winner
function calculateWinner(squares){
  //Each comb of winner
  const lines =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // for loop to feed props to new array
  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    //if statement to check correct winner
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}
// Class Board
class Board extends React.Component {
  // Constructor to create the board as Array
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  //State of square changes to X on click
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({squares: squares,
    xIsNext: !this.state.xIsNext,
  });
  }
  // Render each square
  renderSquare(i){
    return (
      <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
      />
    );
  }
  // render the total squares
  render() {
    // gives winner var
    const winner = calculateWinner(this.state.squares);
    let status;
    //if statement to print winner or give next turn state
    if (winner){
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

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

// Class for Game
class Game extends React.Component {
  render(){
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>

    );
  }
}

// ******************************************************
// Connect to html to display
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
