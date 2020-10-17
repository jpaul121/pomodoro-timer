import '@testing-library/jest-dom/extend-expect'

import App from './App'
import React from 'react'
import { render } from './test-utils'

test('renders learn react link', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/session/i)
  expect(linkElement).toBeInTheDocument()
})
