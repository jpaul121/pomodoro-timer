import AppSettings from './features/AppSettings'
import React from 'react'
import { shallow } from 'enzyme'
import store from './app/store'

describe('<AppSettings />', () => {
  let wrapper, sessionLen
  
  beforeEach(() => {
    wrapper = shallow(
      <AppSettings store={store} />,
    ).dive({ context: { store } }).dive()

    // { context: { store } }

    sessionLen = wrapper.find('.session h4').text()

    // console.log(wrapper.debug())
  })

  it('should update using Redux store values upon button press', () => {
    wrapper.find('#sessionUp').simulate('click')
    wrapper.update()
    sessionLen = wrapper.find('.session h4').text()
    
    expect(sessionLen).toBe('26')
  })
})