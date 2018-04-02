import React from 'react'
import TimerController from './TimerController'
import ModeSelector from './ModeSelector'
import Timer from './Timer'
import durations from './config.js'
import shortToLongRatio from './config.js'
import timerApp from './reducers'

class TimerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      durationName : 'pomodoro',
      counter: durations.get('pomodoro'),
      numShortBreaks: 0,
      isTiming: false,
    };
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
        <TimerController
          onReset={this.resetTimer}
          onClick={this.toggleStart}
          isTiming={this.state.isTiming}
        />
      </div>
    );
  }
}

export default TimerContainer
