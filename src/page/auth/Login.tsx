import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useLogin } from '../../features/auth/auth.mutation'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Loader2 } from 'lucide-react'

// Define schema
const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(5, 'Password must be at least 6 characters'),
})

export default function Login() {
    const login = useLogin()

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        validators: {
            onChange: loginSchema,
        },
        onSubmit: async ({ value }) => {
            await login.mutateAsync(value)
        },
    })

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Pattern - Subtle Geometric Dots */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#1E40AF 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Main Content */}
            <Card className="w-full max-w-md mx-4 z-10 shadow-lg border-t-4 border-t-primary animate-in fade-in zoom-in duration-500">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold text-primary">Welcome Back</CardTitle>
                    <CardDescription>
                        Sign in to your Learning Center account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            form.handleSubmit()
                        }}
                        className="space-y-4"
                    >
                        <form.Field
                            name="email"
                            children={(field) => (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name} className="text-foreground/90">Email</Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value)}
                                        placeholder="name@example.com"
                                        className={field.state.meta.errors.length ? "border-destructive focus-visible:ring-destructive" : ""}
                                    />
                                    {field.state.meta.errors.length > 0 && (
                                        <p className="text-sm text-destructive">
                                            {field.state.meta.errors.map((e: any) => e.message || e).join(', ')}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        <form.Field
                            name="password"
                            children={(field) => (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor={field.name} className="text-foreground/90">Password</Label>
                                        <a href="#" className="text-sm font-medium text-primary hover:underline hover:text-primary/80">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="password"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value)}
                                        className={field.state.meta.errors.length ? "border-destructive focus-visible:ring-destructive" : ""}
                                    />
                                    {field.state.meta.errors.length > 0 && (
                                        <p className="text-sm text-destructive">
                                            {field.state.meta.errors.map((e: any) => e.message || e).join(', ')}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        {login.isError && (
                            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                                {(login.error instanceof Error ? login.error.message : "Authentication failed. Please check your credentials.")}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm transition-all"
                            disabled={login.isPending}
                        >
                            {login.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t p-4 mt-2 bg-muted/20">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <a href="#" className="text-primary font-medium hover:underline hover:text-primary/80">
                            Contact Admin
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
