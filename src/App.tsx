import React, { useEffect } from 'react';
import styles from './App.module.scss';
import { Login, Chat, Room } from './pages';
import { PageContextProvider, usePageState, usePageDispatch } from './contexts/page'
import { on } from './backend';

function Router() {
  const { history } = usePageState()
  const dispatch = usePageDispatch()

  useEffect(() => {
    on('userjoin', ({ message }) => {
      if (message === 'User Join Success') {
        dispatch({ type: 'next', page: 'room' })
      }
    })
  }, [dispatch])

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
      <PageContextProvider init={{ history: ['login'] }}>
        <Router />
      </PageContextProvider>
    </div>
  )
}

export default App
