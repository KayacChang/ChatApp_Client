import React from "react"
import styles from './Header.module.scss'
import { FiChevronLeft } from "react-icons/fi"
import { IconButton } from "."

type Props = {
    onBack?: () => void,
    title: string,
}
export default function Header({ title, onBack = () => { } }: Props) {
    return <div className={styles.header}>
        <IconButton
            icon={<FiChevronLeft
                size={28}
                onClick={onBack} />} />

        <h2>{title}</h2>
    </div>
}