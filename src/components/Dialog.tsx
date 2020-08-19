import React, { CSSProperties } from 'react'
import styles from './Dialog.module.scss'

type Props = {
    name: string,
    message: string,
    time: string,
    style?: CSSProperties
}

export default function Dialog({ name, message, time, style }: Props) {
    return <div className={styles.dialog} style={style}>
        <h5>{name}</h5>
        <p>{message}</p>
        <span>{time}</span>
    </div>
}
