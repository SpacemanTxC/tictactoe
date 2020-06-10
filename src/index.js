import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// create components

class Square extends React.Compnent {
  constructor(props) {
    super(props);
    this.state ={
      value: null,
    };
  }

  render() {
    return(
        <button
        className="square"
        onClick={() => this.setState({value: 'X'})}
        >
        {this.props.value}
        </button>
    );
  }
}
class Board extends React.Compnent {
  renderSquare(i){
    return <Square value={i} />;
  }
}

class Game extends React.Compnent {

}
