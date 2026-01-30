import type { LoginRequest, LoginResponse } from "../features/auth/auth.types";
import type { ApiResponse } from "../types/api";
import { apiFetch } from "./client";

export function loginApi({ email, password }: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return apiFetch<ApiResponse<LoginResponse>>('login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    })
}