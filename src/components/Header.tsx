import React from "react"
import styles from './Header.module.scss'
import { FiChevronLeft } from "react-icons/fi"
import { IconButton } from "."
import { usePageState, usePageDispatch } from "../contexts/page"

type Props = {
    title: string,
}
export default function Header({ title }: Props) {
    const { history } = usePageState()
    const dispatch = usePageDispatch()

    const canBack = history.length > 1;

    return <div className={styles.header}>
        {
            (canBack) && <IconButton
                icon={<FiChevronLeft
                    size={28}
                    onClick={() => dispatch({ type: 'prev' })} />} />
        }

        <h2>{title}</h2>
    </div>
}