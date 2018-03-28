import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { Button } from 'reactstrap';

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
  }
  getColor(durationName) {
    if (this.props.durationName === durationName) {
      return 'primary'
    }
    return 'secondary'
  }
  render() {
    return (
      <div>
        <Button color={this.getColor('pomodoro')}
                onClick={(e) => this.props.onDurationChange('pomodoro')}>
          Pomodoro
        </Button> {' '}
        <Button color={this.getColor('shortBreak')}
                onClick={(e) => this.props.onDurationChange('shortBreak')}>
          Short Break
        </Button> {' '}
        <Button color={this.getColor('longBreak')}
                onClick={(e) => this.props.onDurationChange('longBreak')}>
          Long Break
        </Button>
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
      numShortBreaks: 0,
      isTiming: false,
      buttonText: "Pause"
    };
    //this.pauseTimer = this.pauseTimer.bind(this);
    //this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleStart = this.toggleStart.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
  }
  componentDidMount() {
    this.toggleStart();
  }
  handleModeChange(name) {
    this.setState(prevState => ({
      durationName: name,
      counter: durations.get(name)
    }))
  }
  toggleStart() {
    if (this.state.isTiming === false) {
      // starts the timer
      this.timer = setInterval(() => this.tick(), 1000)
      this.setState(prevState => ({
        isTiming: !prevState.isTiming,
        buttonText: "Pause"
      }))
    } else {
      // pauses the timer
      clearInterval(this.timer);
      this.setState(prevState => ({
        isTiming: !prevState.isTiming,
        buttonText: "Start"
      }))
    }
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
  render()   {
    return (
      <div>
        <ModeSelector
          durationName={this.state.durationName}
          onDurationChange={this.handleModeChange}
        />
        <Timer counter={this.state.counter} />
        <Button onClick={this.toggleStart}> { this.state.buttonText } </Button>
        {' '}
        <Button onClick={this.resetTimer}> Reset </Button>
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
