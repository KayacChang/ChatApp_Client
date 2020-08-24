import React from 'react'
import styles from './List.module.scss'

interface Data {
    key: string,
}

type Props<T extends Data> = {
    data: T[],
    onClick?: (data: Omit<T, "key">) => void,
}

export default function List<T extends Data>({ data, onClick = () => { } }: Props<T>) {
    return <table className={styles.table}>
        <thead>
            <tr>
                {
                    Object.keys(data[0])
                        .filter((key) => key !== 'key')
                        .map((key) => (
                            <th key={key}>{key}</th>
                        ))
                }
            </tr>
        </thead>
        <tbody>
            {
                data.map(({ key, ...data }) => (
                    <tr key={key} onClick={() => onClick(data)}>
                        {
                            Object.values<any>(data)
                                .map((value) => (
                                    <td key={key + value}>{value}</td>
                                ))
                        }
                    </tr>
                ))
            }
        </tbody>
    </table>
}