import {
  MINUTE_MS,
  SECOND_MS,
  UP,
} from './constants'

export function roundMilliseconds(n, direction) {
  return (
    direction === UP
      ? Math.ceil(n / MINUTE_MS) * MINUTE_MS
      : Math.floor(n / MINUTE_MS) * MINUTE_MS
  );
}

export const timerMixin = {
  startTimer: function() {
    return setInterval(() => {
      this.setState(state => {
        return {
          currentTime: state.currentTime - SECOND_MS
        };
      })
    }, SECOND_MS)
  },
  stopTimer: function(timer) {
    return clearInterval(timer)
  },
}