// import to use react
import React from 'react';
import ReactDOM from 'react-dom';
//import for css file
import './index.css';


//Components for Game, Board, & Square

//Class to create squares with X
//Replace class with function that will return props
function Square(props) {
  return ( <
    button className = "square"
    onClick = {
      props.onClick
    } > {
      props.value
    } <
    /button>
  );
}

// Class Board
class Board extends React.Component {
  // Render each square
  renderSquare(i) {
    return ( <
      Square value = {
        this.props.squares[i]
      }
      onClick = {
        () => this.props.onClick(i)
      }
      />
    );
  }
  // render the total squares
  render() {
    return ( <
      div >
      <
      div className = "board-row" > {
        this.renderSquare(0)
      } {
        this.renderSquare(1)
      } {
        this.renderSquare(2)
      } <
      /div> <
      div className = "board-row" > {
        this.renderSquare(3)
      } {
        this.renderSquare(4)
      } {
        this.renderSquare(5)
      } <
      /div> <
      div className = "board-row" > {
        this.renderSquare(6)
      } {
        this.renderSquare(7)
      } {
        this.renderSquare(8)
      } <
      /div> <
      /div>
    );
  }
}

// Class for Game
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      //used to count number of steps taken in game
      stepNumber:0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    //map state moves
    const moves = history.map((steps, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
      <button onClick={() => this.jumpTo(move)}>{desc}</button>
      </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return ( <
      div className = "game" >
      <
      div className = "game-board" >
      <
      Board squares = {
        current.squares
      }
      onClick = {
        (i) => this.handleClick(i)
      }
      /> <
      /div> <
      div className = "game-info" >
      <
      div > {
        status
      } < /div> <
      ol > {
        moves } < /ol> <
      /div> <
      /div>

    );
  }
}

// ******************************************************
// Connect to html to display
ReactDOM.render( <
  Game / > ,
  document.getElementById('root')
);

//Declair a winner
function calculateWinner(squares) {
  //Each comb of winner
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
  // for loop to feed props to new array
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    //if statement to check correct winner
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
