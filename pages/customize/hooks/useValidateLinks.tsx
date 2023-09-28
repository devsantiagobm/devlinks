import { Link } from "../models";
import { useState } from "react"

export function useValidateLinks() {
    const [error, setError] = useState<string | null>(null)

    function handleValidate(links: Link[]) {
        for (let i = 0; i < links.length; i++) {
            const element = links.at(i);

            if (!element?.username || !element?.platform) {
                setError("All links must have a platform and an username")
                return false;
            }
        }

        setError(null)
        return true;
    }

    return { error, handleValidate }
}