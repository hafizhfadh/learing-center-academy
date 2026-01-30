import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { loginApi } from '../../api/auth.api'
import { setToken, setUser } from './auth.utils'

export function useLogin() {
    const router = useRouter()
    
    return useMutation({
        mutationFn: loginApi,
        onSuccess: (res: any) => {
            // Assuming res.data contains token and user info based on standard patterns
            // Adjust based on actual API response structure
            if (res?.data?.token) {
                setToken(res.data.token)
                if (res.data.user) {
                    setUser(res.data.user)
                }
                router.navigate({ to: '/dashboard' })
            } else if (res?.token) {
                 // Fallback for direct token response
                 setToken(res.token)
                 if (res.user) setUser(res.user)
                 router.navigate({ to: '/dashboard' })
            }
        },
    })
}
