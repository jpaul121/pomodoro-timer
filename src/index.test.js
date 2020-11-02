import AppSettings from './features/AppSettings'
import React from 'react'
import { shallow } from 'enzyme'
import store from './app/store'

describe('<AppSettings />', () => {
  let wrapper, sessionLen
  
  beforeEach(() => {
    wrapper = shallow(
      <AppSettings store={store} />,
    ).dive().dive()

    sessionLen = wrapper.find('.session h4').text()
  })

  it('should update using Redux store values', () => {
    wrapper.setProps({ sessionLength: 1560000 })
    wrapper.update()
    sessionLen = wrapper.find('.session h4').text()
    
    expect(sessionLen).toBe('26')
  })
})