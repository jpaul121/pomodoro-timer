import {
  getTimerMinutes,
  getTimerSeconds,
} from '../helpers'

import React from 'react'
import { SECOND_MS } from '../constants'
import { connect } from 'react-redux'
import styles from './Timer.module.css'
import { switchMode } from './timerSlice'

/* eslint-disable no-useless-constructor */

export class Timer extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      currentTime: this.props.sessionLength,
      paused: true,
      timerId: null,
    }
    
    this.beginBreak = this.beginBreak.bind(this)
    this.beginSession = this.beginSession.bind(this)
    this.changeMode = this.changeMode.bind(this)
    this.clearTimer = this.clearTimer.bind(this)
    this.togglePause = this.togglePause.bind(this)
  }
  
  // lifecycle methods
  componentDidUpdate(_, prevState) {
    if (prevState['currentTime'] === 0) {
      this.timeOut()
    }
  }
  
  // class methods
  beginBreak() {
    this.clearTimer()
    this.setState((_, props) => {
      return {
        currentTime: props.breakLength,
        paused: true,
      };
    })
  }
  
  beginSession() {
    this.clearTimer()
    this.setState((_, props) => {
      return {
        currentTime: props.sessionLength,
        paused: true,
      };
    })
  }

  changeMode() {
    if (this.props.dispatch) {
      this.props.dispatch(switchMode())
    }
  }

  clearTimer() {
    clearInterval(this.state.timerId)
    this.setState(() => {
      return { timerId: null };
    })
  }
  
  timeOut() {
    this.props.inSession
      ? this.beginBreak()
      : this.beginSession()

    this.changeMode()
  }

  handleTimer() {
    if (this.state.paused) {
      this.togglePause()
      const timerId = setInterval(() => {
        this.setState(state => {
          return { currentTime: state.currentTime - SECOND_MS };
        })
      }, SECOND_MS)
      this.setState(() => {
        return { timerId };
      })
    } else {
      this.togglePause()
      this.clearTimer()
    }
  }

  togglePause() {
    this.setState(state => {
      return { paused: !state.paused };
    })
  }

  resetTimer() {
    this.props.inSession
      ? this.beginSession()
      : this.beginBreak()
  }

  skip() {
    if (this.props.inSession) {
      this.changeMode()
      this.setState((_, props) => {
        return { currentTime: props.breakLength };
      })
      this.beginBreak()
    } else {
      this.changeMode()
      this.setState((_, props) => {
        return { currentTime: props.sessionLength };
      })
      this.beginSession()
    }
  }

  render() {
    const seconds = getTimerSeconds(this.state.currentTime)
    const minutes = getTimerMinutes(this.state.currentTime)
    
    return (
      <div className={styles['timer']}>
        <h2 className={styles['label']} key={this.props.inSession}>
          {this.props.inSession ? 'session' : 'break'}
        </h2>
        <h1 className={styles['stopwatch']}>
          {`${minutes}:${seconds}`}
        </h1>
        <div className={styles['button-group']}>
          <button className={styles['pause']} onClick={this.handleTimer.bind(this)}>
            <i class="fas fa-play fa-2x"></i>
          </button>
          <button className={styles['reset']} onClick={this.resetTimer.bind(this)}>
            <i class="fas fa-redo-alt fa-2x"></i>
          </button>
          <button className={styles['skip']} onClick={this.skip.bind(this)}>
            <i class="fas fa-forward fa-2x"></i>
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
)(Timer)