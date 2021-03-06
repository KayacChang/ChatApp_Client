import React from 'react';
import { Panel, List, Header } from '../components';
import { joinRoom, logout } from '../backend';

type Room = { id: string, title: string, people: number }
type Props = {
    rooms: Room[]
}
export default function Room({ rooms }: Props) {
    return <Panel
        header={
            <Header title="Room" onClick={() => logout()} />
        }
        body={
            (rooms.length > 0) && <List
                data={rooms.map((data) => ({ ...data, key: `${data.id}_${data.title}` }))}
                onClick={(data: Room) => joinRoom(data.id)} />
        }
    />
}
