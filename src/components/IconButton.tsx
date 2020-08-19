import React, { ReactNode } from 'react'
import styles from './IconButton.module.scss'

type Props = {
    icon: ReactNode,
    onClick?: () => void
}
export default function IconButton({ icon, onClick = () => { } }: Props) {

    return <button
        className={styles.button}
        onClick={onClick}
    >
        {icon}
    </button>
}