import { UserContext } from "../contexts";
import { useContext } from "react"

export function useContextUser() {
    const context = useContext(UserContext)

    if (context) {
        return context
    }
    else {
        throw new Error("Oops, something went wrong")
    }
}