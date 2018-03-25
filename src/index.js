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

//class TimeDisplayer extends React.Component {
//  render() {
//    return (
//      <h2> {setInterval(count, 1000)} </h2>
//    );
//  }
//}

class TimeController extends React.Component {
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

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {counter: 0};
  }
  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000)
  }
  // why is props taken in as an argument if its not needed?
  tick() {
    this.setState((prevState, props) => ({
      counter: prevState.counter + 1
    }))
  }
  render() {
    return (
      <div>
        {this.state.counter}
        <TimeController />
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
