import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ModeSelector extends React.Component {
  render() {
    return (
      <div>
        <button type='button'> Pomodoro </button>
        <button type='button'> Short break </button>
        <button type='button'> Long break </button>
      </div>
    )
  }
}

class TimeDisplay extends React.Component {
  render() {
    return (
      <h2> {this.props.time} </h2>
    );
  }
}

class ModeController extends React.Component {
  render() {
    return (
      <div>
        <button type='button'> Start </button>
        <button type='button'> Stop </button>
        <button type='button'> Reset </button>
      </div>

    )
  }
}

// contains timer parts
class TimerContainer extends React.Component {
  render() {
    return (
      <div>
        <ModeSelector />
        <TimeDisplay time={Date.now()}/>
        <ModeController />
      </div>
    )
  }
}
// Contains the entirety of this example
class PomodoroContainer extends React.Component {
  render() {
    return (
      <div>
        <h1>Pomodoro!</h1>;
        <TimerContainer />
      </div>
    );
  }
}

ReactDOM.render(<PomodoroContainer />, document.getElementById('container'))
