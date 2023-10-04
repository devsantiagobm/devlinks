import { motion, AnimatePresence } from "framer-motion"
import { FramerMotionVariants } from "models"
import { Loader } from "components"
import { SuccessfulMessage } from "."
import { IoImageOutline as ImageIcon } from "react-icons/io5"
import { formValidation } from "../helpers"
import { ChangeEvent, FormEvent } from "react"
import Image from "next/image"
import CropperImage from "./CropperImage"
import type { Profile } from "models"
import { useContextAvatar, useUpdateUser, useContextUser } from "../hooks"
import { useRef } from "react"

export default function Profile() {
    const inputFile = useRef<HTMLInputElement | null>(null)
    const { request, error, successful, loading } = useUpdateUser()
    const { profile, setProfile } = useContextUser()
    const { originalAvatar, setOriginalAvatar, preview, avatar } = useContextAvatar()
    const defaultAvatar = profile?.avatar

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        const { error } = formValidation(e)
        if (!error) request(e.currentTarget)
    }

    async function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        const { files } = e.currentTarget

        // If user doesnt change the file, and clicks "cancel" in the explorer, files doesnt exist 
        // Also, when this happens, the value of the input file stays as "null" when we send it at backend.
        // Backend doesnt upload a file if the request brings an avatar that is "null" 

        if (!files || files.length === 0) return

        setOriginalAvatar(files[0])

        // In case user selects the same image twice, we have to reset the value of the input because this function only runs when input file value changes 
        e.currentTarget.value = ""
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>, name: keyof Profile) {
        const { value } = e.currentTarget
        setProfile(({ ...oldProfile }) => {
            return {
                ...oldProfile,
                [name]: value
            }
        })
    }


    return (

        <motion.div className="customize__information" variants={variants} animate="show" initial="hide" transition={{ type: "spring", duration: 0.6 }}>

            <AnimatePresence>
                {originalAvatar != null && <CropperImage inputFile={inputFile} />}
            </AnimatePresence>

            <h1 className="customize__title"> Profile Details </h1>
            <p className="customize__description">Add your details to create a personal touch to your profile.</p>


            <form className="customize__form" onSubmit={handleSubmit}>
                {
                    inputs.map(({ name, label, placeholder }) => (
                        <div className="customize__input-box" key={name}>
                            <span>{label}</span>

                            <label className="customize__label">
                                <input id={name} className="customize__input"
                                    onChange={function (e) { handleChange(e, name) }}
                                    placeholder={placeholder} name={name} defaultValue={profile?.[name] ?? ""} />
                                <div className="customize__border"></div>
                            </label>
                        </div>
                    ))
                }

                <div className="customize__input-box" >
                    <span>Profile Picture</span>
                    <label className="customize__label customize__label--image " htmlFor="image">

                        <input type="file" hidden accept="image/png, image/jpeg" id="image" onChange={handleOnChange} ref={inputFile} />
                        <div className="customize__label-box">
                            <ImageIcon className="customize__avatar-icon" />
                            <span> Upload Image </span>
                        </div>
                        <Image className="customize__avatar"
                            width={200}
                            height={200}
                            src={(preview ? preview : defaultAvatar) ?? ""}
                            alt="User's avatar" />

                    </label>
                </div>

                <hr className="customize__divider customize__divider--form" />

                {
                    error && <motion.span initial="hide" animate="show" variants={messageVariants} className="customize__error">{error}</motion.span>
                }

                <AnimatePresence>
                    {
                        successful && <SuccessfulMessage>Profile updated succesfully</SuccessfulMessage>
                    }
                </AnimatePresence >

                <button className="button button--primary">
                    {
                        loading ? <Loader /> : "Save"}
                </button>
            </form>
        </motion.div>
    )
}




interface Input {
    name: keyof Profile
    placeholder: string
    label: string
}

const inputs: Input[] = [
    {
        name: "name",
        placeholder: "e.g. Jhon Doe",
        label: "Name"
    },
    {
        name: "description",
        placeholder: "e.g. Front End Developer",
        label: "Description"
    },
]

const variants: FramerMotionVariants = {
    show: {
        y: 0,
        opacity: 1
    },
    hide: {
        y: 12,
        opacity: 0
    }
}

const messageVariants: FramerMotionVariants = {
    hide: {
        height: 0,
        opacity: 0,
    },
    show: {
        height: "auto",
        opacity: 1,
    },
    exit: {
        height: 0,
        opacity: 0,
    }

}