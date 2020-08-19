import React from 'react'
import styles from './List.module.scss'

type Data = {
    key: string,
}

type Props = {
    data: Data[],
    onClick?: (data: Data) => void,
}

export default function List({ data, onClick = () => { } }: Props) {
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
                    <tr key={key} onClick={() => onClick({ key, ...data })}>
                        {
                            Object.values(data)
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