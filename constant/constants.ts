interface COOKIES {
    auth_token: string
    user_id: string
}


export const COOKIES_NAMES: COOKIES = {
    "auth_token": "auth_token",
    "user_id": "user_id"
}


interface NO_AUTH {
    "/auth/login": string,
    "/auth/signup": string,

}

export const NO_AUTH_ROUTES: NO_AUTH = {
    "/auth/login": "/auth/login",
    "/auth/signup": "/auth/signup",
}

interface AUTH {
    "/customize": string,
}


export const AUTH_ROUTES: AUTH = {
    "/customize": "/customize",
}

