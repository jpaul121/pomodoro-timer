import {
  decrementBreak,
  decrementSession,
  incrementBreak,
  incrementSession,
} from './timerSlice'
import {
  useDispatch,
  useSelector,
} from 'react-redux'

import React from 'react'
import { getTimerMinutes } from '../helpers'
import styles from './AppSettings.module.css'

export default function AppSettings() {
  const dispatch = useDispatch()
  
  let breakLength = useSelector(state => state['breakLength'])
  breakLength = getTimerMinutes(breakLength)
  
  let sessionLength = useSelector(state => state['sessionLength'])
  sessionLength = getTimerMinutes(sessionLength)

  return (
    <div className={styles['settings']}>
      <div className={styles['session']}>
        <h3 className={styles['sessionLabel']}>
          session
        </h3>
        <button 
          className={styles['incrementSession']} 
          id='sessionUp'
          onClick={() => dispatch(incrementSession())}
          >
          up
        </button>
        <h4 className={styles['sessionTime']}>
          {sessionLength}
        </h4>
        <button 
          className={styles['decrementSession']} 
          id='sessionDown'
          onClick={() => dispatch(decrementSession())}
          >
          down
        </button>
      </div>
      <div className={styles['break']}>
        <h3 className={styles['breakLabel']}>
          break
        </h3>
        <button 
          className={styles['incrementBreak']} 
          id='breakUp'
          onClick={() => dispatch(incrementBreak())}
          >
          up
        </button>
        <h4 className={styles['breakTime']}>
          {breakLength}
        </h4>
        <button 
          className={styles['decrementBreak']} 
          id='breakDown'
          onClick={() => dispatch(decrementBreak())}
          >
          down
        </button>
      </div>
    </div>
  );
}