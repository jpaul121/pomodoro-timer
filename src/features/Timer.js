import {
   MINUTE_MS,
   MINUTE_S,
   SECOND_MS
} from '../constants'

import React from 'react'
import { connect } from 'react-redux'
import { switchMode } from './pomodoroSlice'

/* eslint-disable no-useless-constructor */

class Timer extends React.Component {
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
    this.setState((_, props) => {
      return { inSession: !props.inSession };
    })
  }

  clearTimer() {
    clearInterval(this.state.timerId)
    this.setState(() => {
      return { timerId: null };
    })
  }
  
  endOfTimer() {
    this.props.inSession
      ? this.beginBreak()
      : this.beginSession()
    
    this.props.switchMode()
    this.changeMode()
  }

  handleTimer() {
    if (this.state.paused) {
      this.togglePause()
      const newTimer = setInterval(() => {
        this.setState(state => {
          return { currentTime: state.currentTime - SECOND_MS };
        })
      }, SECOND_MS)
      this.setState(() => {
        return { timerId: newTimer };
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
    /*
    the reason for this existing is that
    if a session is ever manually skipped,
    then skip() will NOT increment the
    amount of sessions completed (once
    that part of the app is implemented)

    also i'm repeating logic that's in other
    methods here because i need to change all of
    state in one go, and i can't split this between
    re-renders because the key attributes will
    dismount the current component and make a new one
    if i try and change them individually and i don't want
    one method to cause two re-renders
    */
    
    if (this.state.inSession) {
      this.props.switchMode()
      this.setState((state, props) => {
        return {
          currentTime: props.breakLength,
          inSession: !state.inSession,
          paused: true,
        };
      })
      this.beginBreak()
    } else {
      this.props.switchMode()
      this.setState((state, props) => {
        return {
          currentTime: props.sessionLength,
          inSession: !state.inSession,
          paused: true,
        };
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
        <h1 data-testid='stopwatch' id='stopwatch'>
          {`${minutes}:${seconds}`}
        </h1>
        <button data-testid='pause' id='pause' onClick={this.handleTimer}>
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
    breakLength: state['DEFAULT_BREAK'],
    inSession: state['inSession'],
    sessionLength: state['DEFAULT_SESSION'],
  };
}

function mapDispatchToProps() {
  return {
    switchMode,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)