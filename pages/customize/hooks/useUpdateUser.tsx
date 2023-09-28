import { getCookie, axios } from "utilities"
import { COOKIES_NAMES } from "constant" // THE "CONSTANTS" MODULE ALREADY EXISTS, SO WE HAVE TO USE constant
import { AxiosError } from "axios"
import { useState, useEffect } from "react"
import { useContextAvatar } from "../hooks"

export function useUpdateUser() {
    const [error, setError] = useState<string | null>(null)
    const [successful, setSuccessful] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const { avatar, setAvatar } = useContextAvatar()

    async function request(form: HTMLFormElement) {
        setLoading(true)

        const data = new FormData(form)
        data.append("avatar", avatar as File)

        const userId = getCookie(COOKIES_NAMES.user_id)
        const token = getCookie(COOKIES_NAMES.auth_token)

        try {
            const options = {
                url: "/user/update",
                method: "POST",
                data,
                headers: {
                    "Authorization": token,
                    "x-user-id": userId,
                    "Content-type": "multipart/form-data"
                }
            }

            const response = await axios(options)
            setAvatar(null)
            setError(null)
            setSuccessful(true)

        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data?.message ?? error?.message)
            }
            else if (error instanceof Error) {
                setError(error?.message)
            }
        }
        finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (successful) {
            setTimeout(() => {
                setSuccessful(false)
            }, 2000)
        }

    }, [successful])


    return { request, error, successful, loading }
}