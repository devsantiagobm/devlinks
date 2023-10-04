import { useState, useEffect } from "react"
import { getCookie, axios } from "utilities"
import { COOKIES_NAMES } from "constant"
import { type Link } from "models"
import { AxiosError } from "axios"

export function useUpdateLinks() {
    const [error, setError] = useState<string | null>(null)
    const [successful, setSuccessful] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)


    async function request(links: Link[]) {
        setLoading(true)

        // Original links have an id to render with the key attribute, but in mongodb these links have an auto generated id, so we have to delete it to send it
        const mappedLinks = links.map(({ id, ...link }) => ({ ...link }))

        const userId = getCookie(COOKIES_NAMES.user_id)
        const token = getCookie(COOKIES_NAMES.auth_token)

        try {
            const options = {
                url: "/link/update",
                method: "POST",
                data: { links: JSON.stringify(mappedLinks) },
                headers: {
                    "Authorization": token,
                    "x-user-id": userId,
                    "Content-type": "application/json"
                }
            }

            const response = await axios(options)
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

    return { error, successful, loading, request }




}