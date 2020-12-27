import './App.css'

import AppSettings from './features/AppSettings'
import React from 'react'
import Timer from './features/Timer'

export default function App() {
  return (
    <div className="app">
      <h1 className="page-title">pomodoro timer</h1>
      <Timer />
      <AppSettings />
    </div>
  );
}