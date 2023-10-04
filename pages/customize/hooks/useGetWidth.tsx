import { useEffect, useState } from "react"


export function useGetWidth() {
    const [width, setWidth] = useState(0)
    useEffect(() => {
        setWidth(window.innerWidth)
    }, [])

    const isLargeScreen = width > 972

    return { width, isLargeScreen }
}