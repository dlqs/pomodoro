import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// lengths of pomodoro, long break, short break respectively
const durations = new Map();
durations.set('pomodoro', 7);
durations.set('longBreak', 6);
durations.set('shortBreak', 5);
// Ratio of short breaks to long breaks
const shortToLongRatio = 4;

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
    this.props.onDurationChange('pomodoro');
  }
  changeToLongBreak() {
    this.props.onDurationChange('longBreak');
  }
  changeToShortBreak() {
    this.props.onDurationChange('shortBreak');
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
  getTimeString() {
    const minutes = "0" + Math.floor(this.props.counter / 60);
    const seconds = "0" + (this.props.counter - 60 * minutes);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
  }
  render() {
    return (
      <h2>
        {this.getTimeString()}
      </h2>
    )
  }
}

class TimerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      durationName : 'pomodoro',
      counter: durations.get('pomodoro'),
      numShortBreaks: 0
    };
    this.pauseTimer = this.pauseTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
  }
  componentDidMount() {
    this.startTimer();
  }
  handleModeChange(name) {
    this.setState(prevState => ({
      durationName: name,
      counter: durations.get(name)
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
      counter: durations.get(this.state.durationName)
    }))
  }
  tick() {
    if (this.state.counter <= 0) {
      if (this.state.durationName === 'pomodoro') {
          if (this.state.numShortBreaks < shortToLongRatio) {
            this.handleModeChange('shortBreak');
            this.setState(prevState =>
              ({numShortBreaks: prevState.numShortBreaks + 1}));
            } else {
            this.handleModeChange('longBreak');
            this.setState(prevState =>
              ({numShortBreaks: 0}));
            }
      } else {
        // change from break to pomo
        this.handleModeChange('pomodoro');
      }
    }
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
