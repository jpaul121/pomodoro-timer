import {
  DEFAULT_BREAK,
  DEFAULT_SESSION,
} from '../constants'

import React from 'react'
import { Timer } from './Timer'
import { shallow } from 'enzyme'

jest.useFakeTimers()

describe('Timer component', () => {
  let wrapper

  // aliases for specific nodes
  let header, timerOutput
  let pauseButton, resetButton, skipButton

  const mockProps = {
    breakLength: DEFAULT_BREAK,
    inSession: true,
    sessionLength: DEFAULT_SESSION,
    switchMode: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(
      <Timer {...mockProps} />
    )
    
    header = wrapper.find('#label')
    timerOutput = wrapper.find('#stopwatch')
    
    pauseButton = wrapper.find('#pause')
    resetButton = wrapper.find('#reset')
    skipButton = wrapper.find('#skip')
  })

  afterEach(() => {
    wrapper = null
  })

  it('should properly render all its nodes', () => {
    expect(header).toHaveLength(1)
    expect(header.text()).toBe('session')

    expect(timerOutput).toHaveLength(1)
    expect(timerOutput.text()).toBe('25:00')

    expect(pauseButton).toHaveLength(1)
    expect(pauseButton.text()).toBe('pause')
    expect(pauseButton.prop('onClick')).toEqual(expect.any(Function))

    expect(resetButton).toHaveLength(1)
    expect(resetButton.text()).toBe('reset')
    expect(resetButton.prop('onClick')).toEqual(expect.any(Function))

    expect(skipButton).toHaveLength(1)
    expect(skipButton.text()).toBe('skip')
    expect(skipButton.prop('onClick')).toEqual(expect.any(Function))
  })

  it('should count down properly', () => {
    wrapper.instance().handleTimer()
    jest.advanceTimersByTime(1250)
    wrapper.update()
    expect(wrapper.state('paused')).toBe(false)
    expect(wrapper.state('currentTime')).toEqual(1499000) // 24:59 in ms
  })
})