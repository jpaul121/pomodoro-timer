import '@testing-library/jest-dom/extend-expect'

import { fireEvent, render, screen } from '../test-utils'

import React from 'react'
import Timer from './Timer'
import { act } from 'react-dom/test-utils'

jest.useFakeTimers()

describe('Timer', () => {
  test('renders Timer component', () => {
    render(<Timer />)
    
    expect(screen.getByText(/session/i)).toBeInTheDocument()
    expect(screen.getByText(/25/)).toBeInTheDocument()
  })

  test('counts down when unpaused', async () => {
    act(() => { render(<Timer />) })

    act(() => {
      jest.advanceTimersByTime(100)
    })

    let timerOutput = screen.getAllByRole('heading')[1]
    expect(timerOutput).toHaveTextContent('25:00')

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    timerOutput = screen.getAllByRole('heading')[1]
    expect(timerOutput).toHaveTextContent('24:59')
  })
  
  // test('counts down when unpaused', async () => {
  //   render(<Timer />)
    
  //   const pauseButton = screen.getByText('pause')
    
  //   jest.useFakeTimers()
  //   fireEvent.click(pauseButton)
  //   setTimeout(
  //     () => fireEvent.click(pauseButton),
  //     1250
  //   )
  //   // The line below might be needed, but now
  //   // it's causing an infinite loop?
  //   // jest.runAllTimers()
    
  //   const timerOutput = screen.getAllByRole('heading')[1]
    
  //   expect(timerOutput).toHaveTextContent('24:59')
  // })
})