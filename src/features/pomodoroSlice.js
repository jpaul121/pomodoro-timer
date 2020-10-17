import {
  DEFAULT_BREAK,
  DEFAULT_SESSION,
  DOWN,
  MINUTE_MS,
  UP,
} from '../constants'

import { createSlice } from '@reduxjs/toolkit'
import { roundMilliseconds } from '../helpers'

export const pomodoroSlice = createSlice({
  name: 'pomodoro',
  initialState: {
    DEFAULT_BREAK,
    DEFAULT_SESSION,
    inSession: true,
  },
  reducers: {
    decrementBreak(state) {
      state['breakLength']  = state['breakLength'] % MINUTE_MS === 0
        ? state['breakLength'] - MINUTE_MS
        : roundMilliseconds(state['breakLength'], DOWN)
    },
    incrementBreak(state) {
      state['breakLength'] = state['breakLength'] % MINUTE_MS === 0
        ? state['breakLength'] + MINUTE_MS
        : roundMilliseconds(state['breakLength'], UP)
    },
    decrementSession(state) {
      state['sessionLength'] = state['sessionLength'] % MINUTE_MS === 0
      ? state['sessionLength'] - MINUTE_MS
      : roundMilliseconds(state['sessionLength'], DOWN)
    },
    incrementSession(state) {
      state['sessionLength'] = state['sessionLength'] % MINUTE_MS === 0
      ? state['sessionLength'] + MINUTE_MS
      : roundMilliseconds(state['sessionLength'], UP)
    },
    switchMode(state) {
      state['inSession'] = !state['inSession']
    }
  }
})

export const {
  decrementBreak,
  incrementBreak,
  decrementSession,
  incrementSession,
  switchMode,
} = pomodoroSlice.actions

export default pomodoroSlice.reducer