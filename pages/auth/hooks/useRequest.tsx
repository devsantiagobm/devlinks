import { axios } from "utilities";
import { useState } from "react";
import { RequestBody } from "pages/auth/models";
import { AxiosError, AxiosResponse } from "axios"
import { useRouter } from "next/router"
import Cookies from "js-cookie";
import { COOKIES_NAMES } from "constant";


interface AuthResponse {
    message: string;
    token: string;
    userID: string;
}


export default function useRequest(url: string) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    async function request(data: RequestBody) {
        try {
            setLoading(true)
            const res: AxiosResponse<AuthResponse> = await axios({ url, method: "POST", data })
            setError(null)

            Cookies.set(COOKIES_NAMES.auth_token, res.data.token)
            Cookies.set(COOKIES_NAMES.user_id, res.data.userID)

            router.push("/customize")
        }
        catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data?.message ?? error.message)
                // Custom error by back end ?? Error given by axios 
            }
            else if (error instanceof Error) {
                setError(error.message)
            }
            else {
                setError("An unknown error just happened")
            }
        }
        finally {
            setLoading(false)
        }
    }


    return { request, loading, error, setError }
}


