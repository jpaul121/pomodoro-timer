import {
  DEFAULT_BREAK,
  DEFAULT_SESSION,
} from '../constants'

import { AppSettings } from './AppSettings'
import React from 'react'
import { shallow } from 'enzyme'

describe('<AppSettings />', () => {
  let wrapper, mockProps

  // aliases for specific nodes
  let breakLabel, sessionLabel
  let breakTime, sessionTime
  let incrementBreak, incrementSession
  let decrementBreak, decrementSession

  beforeEach(() => {
    mockProps = {
      breakLength: DEFAULT_BREAK,
      decrementBreak: jest.fn(),
      incrementBreak: jest.fn(),
      decrementSession: jest.fn(),
      incrementSession: jest.fn(),
      inSession: true,
      sessionLength: DEFAULT_SESSION,
    }
    
    wrapper = shallow(
      <AppSettings {...mockProps} />
    )

    breakLabel = wrapper.find('.break h3')
    sessionLabel = wrapper.find('.session h3')

    breakTime = wrapper.find('.break h4')
    sessionTime = wrapper.find('.session h4')

    incrementBreak = wrapper.find('#breakUp')
    incrementSession = wrapper.find('#sessionUp')

    decrementBreak = wrapper.find('#breakDown')
    decrementSession = wrapper.find('#sessionDown')
  })

  afterEach(() => {
    wrapper = null
  })

  it('should properly render all its nodes', () => {
    expect(breakLabel).toHaveLength(1)
    expect(breakLabel.text()).toBe('break')
    
    expect(sessionLabel).toHaveLength(1)
    expect(sessionLabel.text()).toBe('session')

    expect(breakTime).toHaveLength(1)
    expect(breakTime.text()).toBe('05')

    expect(sessionTime).toHaveLength(1)
    expect(sessionTime.text()).toBe('25')

    expect(incrementBreak).toHaveLength(1)
    expect(incrementSession).toHaveLength(1)

    expect(decrementBreak).toHaveLength(1)
    expect(decrementSession).toHaveLength(1)
  })

  it('should call appropriate action creators upon button press', () => {
    incrementBreak.simulate('click')
    expect(mockProps.incrementBreak).toHaveBeenCalled()

    incrementSession.simulate('click')
    expect(mockProps.incrementSession).toHaveBeenCalled()

    decrementBreak.simulate('click')
    expect(mockProps.decrementBreak).toHaveBeenCalled()

    incrementSession.simulate('click')
    expect(mockProps.incrementSession).toHaveBeenCalled()
  })

  it('should update properly when new state is passed from the store', () => {
    wrapper.setProps({ sessionLength: 1560000 }) // 26:00 in ms
    wrapper.update()
    sessionTime = wrapper.find('.session h4')

    expect(sessionTime.text()).toBe('26')
  })
})