import React from 'react'
import { Button } from 'reactstrap'

class ModeSelector extends React.Component {
  render() {
    return (
      <div class='button-row'>
        <Button color={this.props.durationName === 'pomodoro' ? 'primary' : 'secondary'}
                onClick={(e) => this.props.onDurationChange('pomodoro')}>
          Pomodoro
        </Button> {' '}
        <Button color={this.props.durationName === 'shortBreak' ? 'primary' : 'secondary'}
                onClick={(e) => this.props.onDurationChange('shortBreak')}>
          Short Break
        </Button> {' '}
        <Button color={this.props.durationName === 'longBreak' ? 'primary' : 'secondary'}
                onClick={(e) => this.props.onDurationChange('longBreak')}>
          Long Break
        </Button>
      </div>
    )
  }
}

export default ModeSelector
