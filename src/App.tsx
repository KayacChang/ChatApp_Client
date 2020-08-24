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
    on('USER_JOIN', ({ username }) => {
      pageDispatch({ type: 'next', page: 'room' })
      userDispatch({ type: 'login', name: username })
    })

    on('USER_LEAVE', () => {
      pageDispatch({ type: 'prev' })
      userDispatch({ type: 'logout' })
    })

    on('ROOM_JOIN', () => {
      pageDispatch({ type: 'next', page: 'chat' })
    })

    on('ROOM_LEAVE', () => {
      pageDispatch({ type: 'prev' })
    })

    on('ROOM_UPDATE', ({ rooms }) => {
      roomDispatch({
        type: 'update',
        rooms: (rooms as RoomData[])
          .map(({ id, title, clients }) => ({ id, title, people: clients.length }))
      })
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
