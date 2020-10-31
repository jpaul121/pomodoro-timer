import {
  DEFAULT_BREAK,
  DEFAULT_SESSION,
  MINUTE_MS,
} from '../constants'

import { createSlice } from '@reduxjs/toolkit'

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    breakLength: DEFAULT_BREAK,
    inSession: true,
    sessionLength: DEFAULT_SESSION,
  },
  reducers: {
    decrementBreak(state) {
      state['breakLength'] -= MINUTE_MS
    },
    incrementBreak(state) {
      state['breakLength'] += MINUTE_MS
    },
    decrementSession(state) {
      state['sessionLength'] -= MINUTE_MS
    },
    incrementSession(state) {
      state['sessionLength'] += MINUTE_MS
    },
    switchMode(state) {
      state['switchMode'] = !state['switchMode']
    },
  }
})

export const {
  decrementBreak,
  incrementBreak,
  decrementSession,
  incrementSession,
  switchMode,
} = timerSlice.actions

export default timerSlice.reducer