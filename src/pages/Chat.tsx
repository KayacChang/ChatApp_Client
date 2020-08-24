import React, { useEffect, useState } from 'react'
import { Panel, Dialog, Scroll, ChatBox, Header } from '../components'
import { leaveRoom, sendMsg, on } from '../backend'
import { useUserState } from '../contexts/user'

type MsgData = {
    id: string,
    name: string,
    message: string,
    time: string
}

type Msg = {
    key: string
    name: string
    message: string
    time: Date
}

export default function Chat() {
    const { name } = useUserState()
    const [messages, setMessage] = useState<Msg[]>([])

    useEffect(() => {
        return on('MSG_RECEIVE', ({ id, name, message, time }: MsgData) => {
            const msg: Msg = { key: id, name, message, time: new Date(time) };

            setMessage((messages) => messages.concat(msg))
        })
    }, [setMessage])

    return <Panel
        header={
            <Header title="Chat" onClick={() => leaveRoom()} />
        }
        body={
            <Scroll>
                {
                    messages.map(({ key, name, message, time }, index) => (
                        <Dialog
                            style={{
                                overflowAnchor: (message.length - 1 === index) ? 'auto' : 'none'
                            }}
                            key={key}
                            name={name}
                            message={message}
                            time={time.toLocaleString()} />
                    ))
                }
            </Scroll>
        }
        footer={
            <ChatBox onSend={(msg) => sendMsg({ from: name, message: msg })} />
        }
    />
}
