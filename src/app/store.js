import { configureStore } from '@reduxjs/toolkit'
import reducer from '../features/timerSlice'

const store = configureStore({
  reducer: reducer
})

export default store