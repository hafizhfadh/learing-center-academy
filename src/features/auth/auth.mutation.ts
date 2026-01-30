import { useMutation } from '@tanstack/react-query'
import { loginApi } from '../../api/auth.api'

export function useLogin() {
    return useMutation({
        mutationFn: loginApi,
        onSuccess: (res) => {
            // localStorage.setItem('token', res.data.token)
            // localStorage.setItem('app_token', res.data.app_token)
        },
    })
}
