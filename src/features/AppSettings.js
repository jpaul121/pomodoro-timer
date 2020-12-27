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
        <h3 className={styles['label']}>
          session
        </h3>
        <button className={styles['up']} onClick={() => dispatch(incrementSession())}>
          <i className="fas fa-caret-up fa-3x"></i>
        </button>
        <h4 className={styles['time']}>
          {sessionLength}
        </h4>
        <button className={styles['down']} onClick={() => dispatch(decrementSession())}>
          <i className="fas fa-caret-down fa-3x"></i>
        </button>
      </div>
      <div className={styles['break']}>
        <h3 className={styles['label']}>
          break
        </h3>
        <button className={styles['up']} onClick={() => dispatch(incrementBreak())}>
          <i className="fas fa-caret-up fa-3x"></i>
        </button>
        <h4 className={styles['time']}>
          {breakLength}
        </h4>
        <button className={styles['down']} onClick={() => dispatch(decrementBreak())}>
          <i className="fas fa-caret-down fa-3x"></i>
        </button>
      </div>
    </div>
  );
}