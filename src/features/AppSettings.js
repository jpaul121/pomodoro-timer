import {
  MINUTE_MS,
  MINUTE_S,
} from '../constants'
import {
  decrementBreak,
  decrementSession,
  incrementBreak,
  incrementSession,
} from './pomodoroSlice'

import React from 'react'
import { connect } from 'react-redux'
import equal from 'fast-deep-equal'
import styles from './AppSettings.module.css'

/* eslint-disable no-useless-constructor */

export class AppSettings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      breakLength: this.props.breakLength,
      inSession: this.props.inSession,
      sessionLength: this.props.sessionLength,
    }
  }

  // lifecycle methods
  componentDidUpdate(prevProps) {
    if (!equal(this.props, prevProps)) {
      this.setState((_, props) => {
        return {
          breakLength: props.breakLength,
          inSession: props.inSession,
          sessionLength: props.sessionLength,
        };
      })
    }
  }

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
            onClick={this.props.incrementSession}
            >
            up
          </button>
          <h4 className={styles['sessionTime']}>
            {sessionLength}
          </h4>
          <button 
            className={styles['decrementSession']} 
            id='sessionDown'
            onClick={this.props.decrementSession}
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
            onClick={this.props.incrementBreak}
            >
            up
          </button>
          <h4 className={styles['breakTime']}>
            {breakLength}
          </h4>
          <button 
            className={styles['decrementBreak']} 
            id='breakDown'
            onClick={this.props.decrementBreak}
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
    breakLength: state['DEFAULT_BREAK'],
    inSession: state['inSession'],
    sessionLength: state['DEFAULT_SESSION'],
  };
}

function mapDispatchToProps() {
  return {
    decrementBreak,
    decrementSession,
    incrementBreak,
    incrementSession,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppSettings)