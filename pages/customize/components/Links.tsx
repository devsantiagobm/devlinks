import Image from "next/image"
import { BsPlus as PlusIcon } from "react-icons/bs"
import { motion, AnimatePresence } from "framer-motion"
import { type FramerMotionVariants } from "models"
import { FormEvent, Fragment } from "react"
import { Link } from "./Link"
import { Loader } from "components"
import SuccessfulMessage from "./SuccessfulMessage"
import { useContextUser, useValidateLinks, useUpdateLinks } from "../hooks"

export default function Links() {
    const { links, dispatchLinks, loading: linksLoading } = useContextUser()
    const { error, handleValidate } = useValidateLinks()
    const { loading, request, successful } = useUpdateLinks()

    console.log(links);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const areLinksValid = handleValidate(links)

        if (areLinksValid) request(links)
    }

    return (
        <motion.div className="customize__information" variants={variants} animate="show" initial="hide" transition={{ type: "spring", duration: 0.6 }}>
            <h1 className="customize__title"> Customize your links </h1>
            <p className="customize__description">Add/edit/remove links below and then share all your profiles with the world!</p>

            <button className="button button--full-size customize__main-button" onClick={() => dispatchLinks({ type: "add" })}>
                <PlusIcon className="customize__plus" />
                <span> Add new link </span>
            </button>

            <form onSubmit={handleSubmit}>

                <div className="customize__links">
                    <AnimatePresence>

                        {
                            !linksLoading && links.map((link, i) =>
                                <Fragment key={link.id}>
                                    <Link link={link} index={i + 1} />
                                </Fragment>
                            )
                        }

                        {
                            linksLoading && ([0, 0, 0].map((link, i) =>
                                <Fragment key={i}>
                                    <SkeletonLink />
                                </Fragment>
                            ))
                        }
                    </AnimatePresence>
                </div>

                {!linksLoading && links.length == 0 && <NoLinks />}

                <AnimatePresence>
                    {
                        links.length > 0 && error && <ErrorMessage error={error} />
                    }
                    {
                        successful && <SuccessfulMessage>Links updated succesfully</SuccessfulMessage>
                    }
                </AnimatePresence>

                <button className="button button--primary">
                    {loading ? <Loader /> : "Save"}
                </button>

            </form>
        </motion.div>
    )
}


function NoLinks() {
    return (
        <motion.div className="customize__no-links" variants={variants} initial="hide" animate="show">
            <Image src="/icons/illustration-empty.svg" alt="Empty Links Icon" width={250} height={160} />

            <h2>Let's get you started</h2>
            <p className="customize__description">Use the “Add new link” button to get started. Once you have more than one link, you can edit them. We're here to help you share your profiles with everyone!</p>
        </motion.div>

    )
}

function SkeletonLink() {
    return (
        <motion.article className="link link-skeleton">

            <header className="link__header">

                <div className="link__index link-skeleton__index skeleton">
                    <h5 className="link__title">Link #1</h5>
                </div>

                <button type="button" className="link__remove skeleton link-skeleton__remove">Remove</button>
            </header>

            <span className="link__label skeleton link-skeleton__label">Platform</span>

            <label className="link__input-box link-skeleton__input-box skeleton">
                <input type="text" className="link-skeleton__input" />
            </label>

            <span className="link__label skeleton link-skeleton__label">Username</span>

            <label className="link__input-box link-skeleton__input-box skeleton">
                <input type="text" className="link-skeleton__input" />
            </label>

            <hr className="link__divider" />

        </motion.article >
    )
}

const variants: FramerMotionVariants = {
    show: {
        y: 0,
        opacity: 1
    },
    hide: {
        y: 12,
        opacity: 0
    },
}


function ErrorMessage({ error }: { error: string }) {

    const errorVariants: FramerMotionVariants = {
        show: {
            height: 32,
            opacity: 1,
        },
        hide: {
            height: 0,
            opacity: 0,
        },
        exit: {
            opacity: 0,
            height: 0
        }
    }

    return (
        <motion.span className="customize__error" variants={errorVariants} exit="exit" initial="hide" animate="show">{error}</motion.span>
    )
}