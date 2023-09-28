import { useContext } from "react";
import { ViewsContext } from "../contexts"


export function useContextViews() {
    const context = useContext(ViewsContext)


    if (context) {
        return context
    }
    else {
        throw new Error("Oops, something went wrong")
    }
}