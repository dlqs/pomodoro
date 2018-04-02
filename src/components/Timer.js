import React from 'react'

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

export default Timer
