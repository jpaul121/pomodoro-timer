import { configureStore } from '@reduxjs/toolkit'
import reducer from '../features/pomodoroSlice'

const store = configureStore({
  reducer: reducer
})

export default store