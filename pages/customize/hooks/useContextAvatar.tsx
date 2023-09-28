import { useContext } from "react";
import { AvatarContext } from "../contexts";

export function useContextAvatar() {
    const context = useContext(AvatarContext)
    if (context) {
        return context
    }
    else {
        throw new Error("Oops, something went wrong")
    }
}