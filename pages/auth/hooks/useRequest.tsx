import { axios } from "utilities";
import { useState } from "react";
import { RequestBody } from "pages/auth/models";
import { AxiosError } from "axios"
import { useRouter } from "next/router"

export default function useRequest(url: string) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()



    async function request(data: RequestBody) {
        try {
            setLoading(true)
            await axios({ url, method: "POST", data })
            setError(null)

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


