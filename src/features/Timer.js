import {
   MINUTE_MS,
   MINUTE_S,
   SECOND_MS
} from '../constants'

import React from 'react'
import { connect } from 'react-redux'
import { switchMode } from './timerSlice'

/* eslint-disable no-useless-constructor */

export class Timer extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      currentTime: this.props.sessionLength,
      inSession: this.props.inSession,
      paused: true,
      timerId: null,
    }
    
    this.beginBreak = this.beginBreak.bind(this)
    this.beginSession = this.beginSession.bind(this)
    this.changeMode = this.changeMode.bind(this)
    this.clearTimer = this.clearTimer.bind(this)
    this.handleTimer = this.handleTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.skip = this.skip.bind(this)
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
    this.props.switchMode()
    this.setState(state => {
      return { inSession: !state.inSession };
    })
  }

  clearTimer() {
    clearInterval(this.state.timerId)
    this.setState(() => {
      return { timerId: null };
    })
  }
  
  timeOut() {
    this.state.inSession
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
    this.state.inSession
      ? this.beginSession()
      : this.beginBreak()
  }

  skip() {
    if (this.state.inSession) {
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
    let ms = this.state.currentTime
    let seconds = Math.floor(ms / SECOND_MS) % MINUTE_S
    let minutes = Math.floor(ms / MINUTE_MS) % MINUTE_S

    seconds = ('0' + seconds).slice(-2)
    minutes = ('0' + minutes).slice(-2)
    
    return (
      <div id='timer'>
        <h2 id='label' key={this.state.inSession}>
          {this.state.inSession ? 'session' : 'break'}
        </h2>
        <h1 id='stopwatch'>
          {`${minutes}:${seconds}`}
        </h1>
        <button id='pause' onClick={this.handleTimer}>
          pause
        </button>
        <button id='reset' onClick={this.resetTimer}>
          reset
        </button>
        <button id='skip' onClick={this.skip}>
          skip
        </button>
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

function mapDispatchToProps() {
  return { switchMode };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timer)