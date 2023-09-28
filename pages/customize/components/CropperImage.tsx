import "react-easy-crop/react-easy-crop.css"
import Cropper from 'react-easy-crop'
import { motion } from "framer-motion"
import { useRef, CSSProperties, useMemo, useState, MouseEvent, SyntheticEvent, MutableRefObject } from "react"
import { FramerMotionVariants } from 'models'
import { useHandleCrop, useContextAvatar } from "../hooks"

export default function CropperImage({ inputFile }: { inputFile: MutableRefObject<HTMLInputElement | null> }) {
    const { originalAvatar, setOriginalAvatar } = useContextAvatar()
    const previewImage = useMemo(() => URL.createObjectURL(originalAvatar as File), [])
    const { showCroppedImage, onCropComplete } = useHandleCrop()

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)

    let imageDimensions = useRef<ImageDimensions | null>(null)
    let hiddenImage = useRef<HTMLImageElement>(null)


    function handleCloseCrop(e: MouseEvent<HTMLElement>) {
        if (e.target instanceof Element && e.target.id === "cropper") {
            setOriginalAvatar(null)
            if (inputFile.current) {
                inputFile.current.value = ""
            }
        }
    }

    function handleLoadImage(e: SyntheticEvent<HTMLImageElement>) {
        imageDimensions.current = {
            width: e.currentTarget.width + "px",
            height: e.currentTarget.height + "px"
        }
    }

    return (
        <motion.div id="cropper"
            variants={variants}
            className='cropper' animate={"show"} initial={"hide"}
            exit={"exit"}
            onClick={handleCloseCrop}>

            <div className='cropper__box' style={{ "--max-width": imageDimensions?.current?.width, "--max-height": imageDimensions?.current?.height } as CSSProperties}>
                <img ref={hiddenImage}
                    onLoad={handleLoadImage}
                    src={previewImage} alt="Image crop skeleton" style={{ opacity: 0, height: "100%" }} />
                {/* If we add a hidden image, the height of the cropper will be automatic. Also, we need to know the width of the image */}

                <Cropper
                    image={previewImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    maxZoom={2}
                    minZoom={1}
                    zoomSpeed={0.5}
                    cropShape='round'
                    showGrid={false}
                    disableAutomaticStylesInjection={true}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete} />

            </div>
            <button className='button button--primary cropper__button'
                style={{ "--max-width": imageDimensions?.current?.width } as CSSProperties}
                onClick={showCroppedImage}>
                Crop Avatar
            </button>
        </motion.div>
    )
}


interface ImageDimensions {
    height: string
    width: string
}

const variants: FramerMotionVariants = {
    "show": {
        opacity: 1
    },
    "hide": {
        opacity: 0
    },
    "exit": {
        opacity: 0
    },
}