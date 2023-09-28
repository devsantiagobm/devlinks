import { useState, useEffect } from "react"


export function useAlertAtCopy() {
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {

        let timeOut: NodeJS.Timeout;

        if (isCopied) {
            timeOut = setTimeout(() => {
                setIsCopied(false)
            }, 3000)
        }


        return () => {
            if (timeOut) {
                clearTimeout(timeOut);
            }
        };
    }, [isCopied])

    return {
        isCopied,
        setIsCopied
    }
}