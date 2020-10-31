import {
  MINUTE_MS,
  MINUTE_S,
} from '../constants'
import {
  decrementBreak,
  decrementSession,
  incrementBreak,
  incrementSession,
} from './timerSlice'

import React from 'react'
import { connect } from 'react-redux'
import styles from './AppSettings.module.css'

export class AppSettings extends React.Component {
  render() {
    let breakLength = Math.floor(this.props.breakLength / MINUTE_MS) % MINUTE_S
    breakLength = ('0' + breakLength).slice(-2)
    
    let sessionLength = Math.floor(this.props.sessionLength / MINUTE_MS) % MINUTE_S
    sessionLength = ('0' + sessionLength).slice(-2)
    
    return (
      <div className={styles['settings']}>
        <div className={styles['session']}>
          <h3 className={styles['sessionLabel']}>
            session
          </h3>
          <button 
            className={styles['incrementSession']} 
            id='sessionUp'
            onClick={() => this.props.dispatch(incrementSession())}
            >
            up
          </button>
          <h4 className={styles['sessionTime']}>
            {sessionLength}
          </h4>
          <button 
            className={styles['decrementSession']} 
            id='sessionDown'
            onClick={() => this.props.dispatch(decrementSession())}
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
            onClick={() => this.props.dispatch(incrementBreak())}
            >
            up
          </button>
          <h4 className={styles['breakTime']}>
            {breakLength}
          </h4>
          <button 
            className={styles['decrementBreak']} 
            id='breakDown'
            onClick={() => this.props.dispatch(decrementBreak())}
            >
            down
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    breakLength: state['breakLength'],
    inSession: state['inSession'],
    sessionLength: state['sessionLength'],
  };
}

export default connect(
  mapStateToProps,
  null,
)(AppSettings)