import React, { useState, useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import { Panel, Dialog, Scroll, ChatBox, Header } from '../components'

function ChatTime(data: Date) {
    return data.toLocaleString()
}

export default function Chat() {
    const [msg, setMsg] = useState([
        { key: uuid(), name: 'kayac', message: 'write some message...', time: ChatTime(new Date()) },
        { key: uuid(), name: 'aya', message: 'write some message...', time: ChatTime(new Date()) },
        { key: uuid(), name: 'kayac', message: 'write some message...', time: ChatTime(new Date()) },
        { key: uuid(), name: 'kayac', message: 'write some message...', time: ChatTime(new Date()) },
        { key: uuid(), name: 'kayac', message: 'write some message...', time: ChatTime(new Date()) },
        { key: uuid(), name: 'kayac', message: 'write some message...', time: ChatTime(new Date()) },
        { key: uuid(), name: 'kayac', message: 'write some message...', time: ChatTime(new Date()) },
    ])

    const onSend = useCallback((message) => setMsg((msg) =>
        msg.concat({
            key: uuid(), name: 'kayac', message, time: ChatTime(new Date())
        })
    ), [setMsg])

    return <Panel
        header={
            <Header title="Chat" />
        }
        body={
            <Scroll>
                {
                    msg.map(({ key, name, message, time }, index) => (
                        <Dialog
                            style={{
                                overflowAnchor: (msg.length - 1 === index) ? 'auto' : 'none'
                            }}
                            key={key}
                            name={name}
                            message={message}
                            time={time} />
                    ))
                }
            </Scroll>
        }
        footer={
            <ChatBox onSend={onSend} />
        }
    />
}
