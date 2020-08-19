import React, { PropsWithChildren, ReactNode } from "react"
import styles from './Panel.module.scss'

function Section({ children }: PropsWithChildren<{}>) {
    return <div className={styles.section}>
        {children}
    </div>
}

type Props = {
    header?: ReactNode,
    body?: ReactNode,
    footer?: ReactNode,
}

export default function Panel({ header, body, footer }: PropsWithChildren<Props>) {
    return <div className={styles.panel} >
        <Section>
            {header}
        </Section>
        <Section>
            {body}
        </Section>
        <Section>
            {footer}
        </Section>
    </div>
}