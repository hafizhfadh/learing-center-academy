import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import App from "./App";
import Login from "./page/auth/Login";
import { RootLayout } from "./routes/_root";

const rootRoute = createRootRoute(
    {
        component: () => <RootLayout />
    }
)

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: App
})
const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login
})

const routeTree = rootRoute.addChildren([loginRoute, indexRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}