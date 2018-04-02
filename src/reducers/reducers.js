import { TOGGLE_TIMER } from '../actions'
import durations from '../components/config.js'

const initialState = {
  durationName = 'pomodoro',
  counter: durations.get('pomodoro'),
  numShortBreaks: 0,
  isTiming: false;
}

function timerApp(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_TIMER:
      return Object.assign({}, state, {
        isTiming: !state.isTiming
      })
  }
}

export default timerApp
