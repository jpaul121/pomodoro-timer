import './App.css'

import AppSettings from './features/AppSettings'
import React from 'react'
import Timer from './features/Timer'

export default function App() {
  return (
    <div className="App">
      <Timer />
      <AppSettings />
    </div>
  );
}