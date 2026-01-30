import { getToken } from '../features/auth/auth.utils'

const BASE_URL = import.meta.env.VITE_API_URL
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN


export async function apiFetch<T>(
    url: string,
    options: RequestInit
): Promise<T> {
    const token = getToken()
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'app-token': APP_TOKEN,
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    }

    const res = await fetch(`${BASE_URL}/${url}`, {
        ...options,
        headers,
    })

    if (!res.ok) throw await res.json()
    return res.json()
}
