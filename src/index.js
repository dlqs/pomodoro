import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class PomodoroContainer extends React.Component {
  render() {
    return <h1>Pomodoro!</h1>;
  }
}
ReactDOM.render(<PomodoroContainer />, document.getElementById('container'))
