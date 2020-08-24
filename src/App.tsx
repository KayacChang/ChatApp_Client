import React from 'react';
import styles from './App.module.scss';
import { Login, Chat, Room } from './pages';
import { PageContextProvider, usePageState } from './contexts/page'

function Router() {
  const { history } = usePageState()
  const current = history[history.length - 1]

  switch (current) {
    case 'login':
      return <Login />

    case 'room':
      return <Room />

    case 'chat':
      return <Chat />

    default:
      return <Login />
  }
}

function App() {
  return (
    <div className={styles.app}>
      <PageContextProvider init={{ history: ['chat'] }}>
        <Router />
      </PageContextProvider>
    </div>
  )
}

export default App
