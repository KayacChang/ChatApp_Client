import React, { PropsWithChildren } from 'react'
import styles from './Button.module.scss'

type Props = {
    onClick: () => void
}

export default function Button({ children, onClick }: PropsWithChildren<Props>) {
    return <button className={styles.button} onClick={onClick}>
        {children}
    </button>
}