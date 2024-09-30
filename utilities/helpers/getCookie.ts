import Cookies from "js-cookie";

export function getCookie(name: string): string {
    return Cookies.get(name) ?? ""
}