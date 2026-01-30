import { useState } from 'react'
import { useLogin } from '../../features/auth/auth.mutation'

export default function Login() {
    const login = useLogin()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        login.mutate({ email, password })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <input
                placeholder="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <button type="submit" disabled={login.isPending}>
                Login
            </button>

            {login.isError && (
                <p style={{ color: 'red' }}>
                    {(login.error as any)?.message}
                </p>
            )}
        </form>
    )
}
