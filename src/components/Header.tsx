import React from "react"
import styles from './Header.module.scss'
import { FiChevronLeft } from "react-icons/fi"
import { IconButton } from "."

type Props = {
    title: string,
    onClick?: () => void
}
export default function Header({ title, onClick }: Props) {
    return <div className={styles.header}>
        {
            (onClick) && <IconButton
                icon={<FiChevronLeft
                    size={28}
                    onClick={onClick} />} />
        }

        <h2>{title}</h2>
    </div>
}