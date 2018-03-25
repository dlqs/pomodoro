import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ModeSelector extends React.Component {
  render() {
    return (
      <div>
        <button type='button'> Pomodoro </button>
        <button type='button'> Short </button>
        <button type='button'> Long </button>
      </div>
    )
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {counter: 0};
    this.pauseTimer = this.pauseTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }
  componentDidMount() {
    this.startTimer();
  }
  startTimer() {
    this.timer = setInterval(() => this.tick(), 1000)
  }
  pauseTimer() {
    clearInterval(this.timer);
  }
  resetTimer() {
    this.setState(prevState => ({
      counter: 0
    }))
  }
  tick() {
    this.setState((prevState) => ({
      counter: prevState.counter + 1
    }))
  }
  render() {
    return (
      <div>
        <h2>
          {this.state.counter}
        </h2>
        <button onClick={this.startTimer}> Start </button>
        <button onClick={this.pauseTimer}> Pause </button>
        <button onClick={this.resetTimer}> Reset </button>
      </div>
    )
  }
}

class TimerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {duration: "900"};
  }

  render() {
    return (
      <div>
        <ModeSelector />
        <Timer duration={this.state.duration} />
      </div>
    );
  }
}
class PomodoroContainer extends React.Component {
  render() {
    return (
      <div>
        <h1>Pomodoro!</h1>
        <TimerContainer />
      </div>
    );
  }
}

ReactDOM.render(<PomodoroContainer />, document.getElementById('container'))
