import { Provider } from 'react-redux'
import React from 'react'
import { Timer } from './Timer'
import { shallow } from 'enzyme'
import store from '../app/store'

jest.useFakeTimers()

describe('Timer component', () => {
  let wrapper
  const mockDispatch = jest.fn()

  // aliases for specific nodes
  let header, timerOutput
  let pauseButton, resetButton, skipButton

  beforeEach(() => {
    wrapper = shallow(
      <Timer switchMode={mockDispatch} />,
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
})