import originalAxios from "axios";

export const axios = originalAxios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});