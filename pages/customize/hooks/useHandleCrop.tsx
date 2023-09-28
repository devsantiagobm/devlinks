import { Area } from 'react-easy-crop'
import { useState, useCallback } from "react"
import { getCroppedImg } from '../helpers'
import { useContextAvatar } from "../hooks"

export function useHandleCrop() {
    const { originalAvatar, setOriginalAvatar, setPreview, setAvatar } = useContextAvatar()
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])


    const showCroppedImage = useCallback(async () => {
        try {

            if (originalAvatar != null) {
                const croppedImage = await getCroppedImg(URL.createObjectURL(originalAvatar), croppedAreaPixels as Area)

                if (croppedImage != null) {
                    setOriginalAvatar(null)
                    setAvatar(croppedImage?.file)
                    setPreview(croppedImage?.url)
                }
            }


        } catch (e) {
            if (e instanceof Event) {
                console.error(e.target)
            }
        }
    }, [croppedAreaPixels])


    return { showCroppedImage, onCropComplete }
}