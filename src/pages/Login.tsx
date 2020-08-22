import React, { useState } from 'react';
import { Panel, Input, Button, Header } from '../components';
import { login } from '../backend';

export default function Login() {
    const [email, setEmail] = useState('')

    return <Panel
        header={
            <Header title="Login" />
        }
        body={
            <Input
                id="email"
                type="email"
                placeholder={'Email'}
                onChange={(e) => setEmail(e.target.value)}
                value={email} />
        }
        footer={
            <Button onClick={() => login(email)}>Join</Button>
        }
    />
}
