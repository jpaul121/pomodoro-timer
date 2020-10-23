import {
  DEFAULT_BREAK,
  DEFAULT_SESSION
} from '../constants'

import { Provider } from 'react-redux'
import React from 'react'
import Timer from './Timer'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'

/* eslint-disable no-sequences */

const mockStore = configureStore([])

jest.useFakeTimers()

describe('Timer component', () => {
  // variables for TestRenderer
  let component, instance, store

  // aliases for specific nodes
  let header, timerOutput
  let pauseButton, resetButton, skipButton

  beforeEach(() => {
    store = mockStore({
      DEFAULT_BREAK,
      DEFAULT_SESSION,
      inSession: true,
    })

    component = renderer.create(
      <Provider store={store}>
        <Timer />
      </Provider>
    )

    instance = component.root

    header = instance.findByType('h2')
    timerOutput = instance.findByType('h1')

    pauseButton = instance.findAllByType('button')[0]
  })

  it('should render <Timer /> with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('should display correct values upon initial render', () => {
    expect(header.children).toEqual(['session'])
    expect(timerOutput.children).toEqual(['25:00'])
  })

  it('should update state, display values when pause button is pressed', () => {    
    renderer.act(() => {
      pauseButton.props.onClick()
    })

    jest.advanceTimersByTime(1100)

    expect(timerOutput.children).toEqual(['24:59'])
  })
})