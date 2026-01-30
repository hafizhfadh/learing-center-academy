const BASE_URL = import.meta.env.VITE_API_URL


export async function apiFetch<T>(
    url: string,
    options: RequestInit
): Promise<T> {
    console.log(options);

    const res = await fetch(`${BASE_URL}/${url}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    })

    if (!res.ok) throw await res.json()
    return res.json()
}
