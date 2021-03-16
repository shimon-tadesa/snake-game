import React, { Component } from "react";
import Snake from "./Snake";
import Food from "./Food";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const MyState = {
  food: getRandomCoordinates(),
  speed: 100,
  direction: "RIGHT",
  snakeDots: [
    [0, 0],
    [2, 0]
  ]
}

class App extends Component {
  state = MyState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
    console.log("play now");
  }

  componentDidUpdate() {
    this.checkIfOutOfBorder();
    this.checkIfSnakeCollapsed();
    this.checkIfSnakeEat();
  }

  onKeyDown = e => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "TOP" });
        break;

      case 40:
        this.setState({ direction: "DOWN" });
        break;

      case 37:
        this.setState({ direction: "LEFT" });
        break;

      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      case 41:
      default:
       console.log('error code');
    }
  };




  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "TOP":
        head = [head[0], head[1] - 2];
        break;
      default:
        console.log("error");
    }
    dots.push(head);
    dots.shift();
    this.setState({ snakeDots: dots });
  };

  
  checkIfSnakeCollapsed() {
    let snake = [...this.state.snakeDots]
    let head = snake[snake.length - 1]
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
       
      }
    })
  }
  
  checkIfSnakeEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({food : getRandomCoordinates()})
      this.SnakeGrowing();
      this.increseSpeed();
    }
  }
  
  SnakeGrowing() {
    let NewSnake = [...this.state.snakeDots];
    NewSnake.unshift([])
    this.setState({ snakeDots: NewSnake })
  }
  
  increseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  checkIfOutOfBorder() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }
  
  onGameOver() {
    alert(`Game Over Snake Length is${this.state.snakeDots.length}`);
    this.setState(MyState);
  }

  render() {
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots} />
        <Food dot={this.state.food} />
      </div>
    );
  }
}

export default App;
