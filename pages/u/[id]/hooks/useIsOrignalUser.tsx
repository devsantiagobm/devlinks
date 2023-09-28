import { COOKIES_NAMES } from "constant"
import { useState, useEffect } from "react"
import { getCookie } from "utilities"
import { useRouter } from "next/router"


export function useIsOriginalUser() {
    const [isOriginalUser, setIsOriginalUser] = useState(false)
    const { query } = useRouter()
    const { id } = query

    // We dont have to validate that the token and the userid are ok because were gonna use them only to show a button to comeback to dashboard
    // If user clicks on this, and the token or the userId isnt valid the middleware will redirect them to login

    useEffect(() => {
        const userId = getCookie(COOKIES_NAMES.user_id)
        const token = getCookie(COOKIES_NAMES.auth_token)

        if (token && userId && userId == id) {
            setIsOriginalUser(true)
        }
    }, [])

    return { isOriginalUser }

}