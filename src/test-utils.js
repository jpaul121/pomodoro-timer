import { Provider } from 'react-redux'
import React from 'react'
import appStore from './app/store'
import { render as rtlRender } from '@testing-library/react'

function render(ui, store = appStore) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper });
}

export * from '@testing-library/react'
export { render }