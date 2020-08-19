import React from 'react';
import { Panel, List } from '../components';


export default function Room() {
    const data = [
        { id: 1, title: 'name', people: '16 / 16' },
        { id: 2, title: 'name', people: '16 / 16' },
        { id: 3, title: 'name', people: '16 / 16' },
        { id: 4, title: 'name', people: '16 / 16' },
        { id: 5, title: 'name', people: '16 / 16' },
        { id: 6, title: 'name', people: '16 / 16' },
    ]

    return <Panel
        header={"Room"}
        body={
            <List
                data={data.map((data) => ({ ...data, key: `${data.id}_${data.title}` }))}
                onClick={(data) => console.log(data)} />
        }
    />
}