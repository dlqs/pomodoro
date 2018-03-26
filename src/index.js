import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const durations = {
  pomodoro: 1500,
  shortBreak: 300,
  longBreak: 600
}
class ModeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.changeToPomodoro = this.changeToPomodoro.bind(this);
    this.changeToLongBreak = this.changeToLongBreak.bind(this);
    this.changeToShortBreak = this.changeToShortBreak.bind(this);
  }
  // Is there a way to pass arguments into buttons
  // So that don't have to create so many functions?
  changeToPomodoro() {
    this.props.onDurationChange(durations.pomodoro);
  }
  changeToShortBreak() {
    this.props.onDurationChange(durations.shortBreak);
  }
  changeToLongBreak() {
    this.props.onDurationChange(durations.longBreak);
  }
  render() {
    return (
      <div>
        <button type='button' onClick={this.changeToPomodoro}>
          Pomodoro
        </button>
        <button type='button' onClick={this.changeToShortBreak}>
          Short
        </button>
        <button type='button' onClick={this.changeToLongBreak}>
          Long
        </button>
      </div>
    )
  }
}

class Timer extends React.Component {
  render() {
    return (
      <h2>
        {this.props.counter}
      </h2>
    )
  }
}

class TimerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: durations.pomodoro,
      counter: durations.pomodoro
    };
    this.pauseTimer = this.pauseTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
  }
  componentDidMount() {
    this.startTimer();
  }
  handleModeChange(duration) {
    this.setState(prevState => ({
      counter: duration,
      duration: duration
    }))
  }
  startTimer() {
    this.timer = setInterval(() => this.tick(), 1000)
  }
  pauseTimer() {
    clearInterval(this.timer);
  }
  resetTimer() {
    this.setState(prevState => ({
      counter: this.state.duration
    }))
  }
  tick() {
    this.setState((prevState) => ({
      counter: prevState.counter - 1
    }))
  }
  render() {
    return (
      <div>
        <ModeSelector onDurationChange={this.handleModeChange}/>
        <Timer counter={this.state.counter} />
        <button onClick={this.startTimer}> Start </button>
        <button onClick={this.pauseTimer}> Pause </button>
        <button onClick={this.resetTimer}> Reset </button>
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
