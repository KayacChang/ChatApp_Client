import React, { useState, useCallback, KeyboardEvent } from 'react'
import styles from './ChatBox.module.scss'
import { RiSendPlaneLine } from 'react-icons/ri'
import { IconButton } from '.'

type Props = {
    onSend: (msg: string) => void
}
export default function ChatBox({ onSend }: Props) {
    const [msg, setMsg] = useState('')

    const onSendClick = useCallback(() => {
        if (!msg) return

        onSend(msg)
        setMsg('')

    }, [msg, onSend, setMsg])

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key !== 'Enter') return

        e.preventDefault()
        onSendClick()

    }, [onSendClick])

    return <div className={styles.chatbox}>
        <textarea
            placeholder={"Type message.."}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={onKeyDown}
            required />

        <div className={styles.buttongroup}>
            <IconButton
                icon={<RiSendPlaneLine size={24} />}
                onClick={onSendClick} />
        </div>
    </div>
}