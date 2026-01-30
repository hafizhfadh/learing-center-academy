export const AUTH_KEYS = {
    TOKEN: 'auth_token',
    USER: 'auth_user',
} as const

export function getToken(): string | null {
    return localStorage.getItem(AUTH_KEYS.TOKEN)
}

export function setToken(token: string) {
    localStorage.setItem(AUTH_KEYS.TOKEN, token)
}

export function removeToken() {
    localStorage.removeItem(AUTH_KEYS.TOKEN)
    localStorage.removeItem(AUTH_KEYS.USER)
}

export function isAuthenticated(): boolean {
    return !!getToken()
}

export function getUser() {
    const userStr = localStorage.getItem(AUTH_KEYS.USER)
    return userStr ? JSON.parse(userStr) : null
}

export function setUser(user: any) {
    localStorage.setItem(AUTH_KEYS.USER, JSON.stringify(user))
}
