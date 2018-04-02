import React from 'react'
import { Button } from 'reactstrap'

class TimerController extends React.Component {
  render() {
    return (
      <div class='button-row'>
        <Button color={this.props.isTiming ? 'info' : 'success'}
                onClick={(e) => this.props.onClick()}>
          {this.props.isTiming ? "Pause" : "Start"}
        </Button> {' '}
        <Button color='warning'
                onClick={(e) => this.props.onReset()}>
          Reset
        </Button>
      </div>
    )
  }
}

export default TimerController
