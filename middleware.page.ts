import { NextResponse, type NextRequest } from 'next/server'
import { COOKIES_NAMES, AUTH_ROUTES, NO_AUTH_ROUTES } from "./constant"
import { isValidToken } from 'utilities'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const APP_ROUTES = { ...AUTH_ROUTES, ...NO_AUTH_ROUTES }

    if (pathname in APP_ROUTES) {

        const token = request.cookies.get(COOKIES_NAMES["auth_token"])?.value
        const tokenIsValid = await isValidToken(token ?? "");

        if (!tokenIsValid && pathname in AUTH_ROUTES) {
            return NextResponse.redirect(new URL(NO_AUTH_ROUTES['/auth/login'], request.url));
        }
        else if (tokenIsValid && pathname in NO_AUTH_ROUTES) {
            return NextResponse.redirect(new URL(AUTH_ROUTES['/customize'], request.url));
        }
    }

} 