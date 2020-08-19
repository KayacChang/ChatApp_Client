import React, { PropsWithChildren } from 'react'
import styles from './Scroll.module.scss'

export default function Scroll({ children }: PropsWithChildren<{}>) {
    return <div
        className={styles.scroll}
        ref={(ref) => ref?.scrollTo({
            top: ref.scrollHeight,
            behavior: "smooth"
        })}
    >
        {children}
    </div>
}