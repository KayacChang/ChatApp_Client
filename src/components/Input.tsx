import React, { ChangeEvent } from 'react'
import styles from './Input.module.scss'

type Props = {
    placeholder: string,
    id: string,
    type?: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    value: string,
}
export default function Input({ placeholder, id, type = "input", onChange, value }: Props) {
    return <div className={styles.group}>
        <input
            type={type}
            className={styles.field}
            placeholder={placeholder}
            id={id}
            onChange={onChange}
            value={value}
            required />
        <label htmlFor={id} className={styles.label}>{placeholder}</label>
    </div>
}
