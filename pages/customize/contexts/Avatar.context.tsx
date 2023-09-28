import { ReactNode, SetStateAction, createContext, useState, Dispatch } from "react";

interface Avatar {
    avatar: File | null
    preview: string | null
    originalAvatar: File | null
    setAvatar: Dispatch<SetStateAction<File | null>>
    setPreview: Dispatch<SetStateAction<string | null>>
    setOriginalAvatar: Dispatch<SetStateAction<File | null>>
}

export const AvatarContext = createContext<Avatar | null>(null)

export function AvatarProvider({ children }: { children: ReactNode }) {
    const [avatar, setAvatar] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [originalAvatar, setOriginalAvatar] = useState<File | null>(null)

    const value: Avatar = {
        avatar, setAvatar, preview, setPreview, originalAvatar, setOriginalAvatar
    }

    return (
        <AvatarContext.Provider value={value}>
            {children}
        </AvatarContext.Provider>
    )
}