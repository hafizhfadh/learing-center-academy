import { createRootRoute, createRoute, createRouter, redirect } from "@tanstack/react-router";
import App from "./App";
import Login from "./page/auth/Login";
import Dashboard from "./page/dashboard/Dashboard";
import { RootLayout } from "./routes/_root";
import { isAuthenticated } from "./features/auth/auth.utils";

const rootRoute = createRootRoute(
    {
        component: () => <RootLayout />
    }
)

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    beforeLoad: () => {
        if (isAuthenticated()) {
            throw redirect({ to: '/dashboard' })
        } else {
            throw redirect({ to: '/login' })
        }
    },
    component: App
})

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login,
    beforeLoad: () => {
        if (isAuthenticated()) {
            throw redirect({ to: '/dashboard' })
        }
    }
})

const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: Dashboard,
    beforeLoad: () => {
        if (!isAuthenticated()) {
            throw redirect({ to: '/login' })
        }
    }
})

const routeTree = rootRoute.addChildren([loginRoute, indexRoute, dashboardRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}