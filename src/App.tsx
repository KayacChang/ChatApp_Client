import React, { useEffect } from 'react';
import styles from './App.module.scss';
import { Login, Chat, Room } from './pages';
import { PageContextProvider, usePageState, usePageDispatch } from './contexts/page'
import { on } from './backend';
import { UserContextProvider, useUserDispatch } from './contexts/user';
import { RoomContextProvider, useRoomDispatch, useRoomState } from './contexts/room';

type RoomData = { id: string, title: string, clients: string[] }

function Router() {
  const { history } = usePageState()
  const { rooms } = useRoomState()
  const pageDispatch = usePageDispatch()
  const userDispatch = useUserDispatch()
  const roomDispatch = useRoomDispatch()

  useEffect(() => {
    on('USER_JOIN', ({ from, message }) => {
      if (message === 'User Join Success') {
        pageDispatch({ type: 'next', page: 'room' })
        userDispatch({ type: 'login', name: from })
      }
    })

    on('USER_LEAVE', ({ message }) => {
      if (message === 'User Leave Success') {
        pageDispatch({ type: 'prev' })
        userDispatch({ type: 'logout' })
      }
    })

    on('ROOM_JOIN', ({ message }) => {
      if (message === 'Room Join Success') {
        pageDispatch({ type: 'next', page: 'chat' })
      }
    })

    on('ROOM_LEAVE', ({ message }) => {
      if (message === 'Room Leave Success') {
        pageDispatch({ type: 'prev' })
      }
    })

    on('ROOM_UPDATE', ({ message }) => {
      const rooms = (message as RoomData[])
        .map(({ id, title, clients }) => ({ id, title, people: clients.length }))

      roomDispatch({ type: 'update', rooms })
    })
  }, [pageDispatch, userDispatch, roomDispatch])

  const current = history[history.length - 1]
  switch (current) {
    case 'login':
      return <Login />

    case 'room':
      return <Room rooms={rooms} />

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
        <UserContextProvider init={{ name: '' }}>
          <RoomContextProvider init={{ rooms: [] }}>
            <Router />
          </RoomContextProvider>
        </UserContextProvider>
      </PageContextProvider>
    </div>
  )
}

export default App
