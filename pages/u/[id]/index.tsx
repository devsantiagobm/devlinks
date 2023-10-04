import { AxiosError, AxiosResponse } from "axios";
import { Layout } from "components"
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { CSSProperties } from "react";
import { AiOutlineShareAlt as ShareIcon } from "react-icons/ai"
import { BiArrowBack as BackIcon } from "react-icons/bi"
import { axios } from "utilities";
import type { Profile, Link as LinkType, FramerMotionVariants } from "models";
import { platforms } from "constant";
import Link from "next/link";
import { AiOutlineLink as LinkIcon } from "react-icons/ai"
import { useIsOriginalUser, useAlertAtCopy } from "./hooks";
import type { JoinedLink } from "models";
import { motion, AnimatePresence } from "framer-motion";
import { Error as PreviewError } from "./components/Error";

export default function Preview({ links: uncompletedLink, error, profile }: Props) {
    const { isOriginalUser } = useIsOriginalUser()
    const { isCopied, setIsCopied } = useAlertAtCopy()
    const { asPath } = useRouter()

    if (error) {
        return (
            <PreviewError>
                <p>{error}</p>
            </PreviewError>
        )
    }

    const links: JoinedLink[] = uncompletedLink?.map((link) => ({
        ...platforms.find((platform) => platform.id === link.platform),
        ...link,
    })) ?? [];



    const { name, description, avatar } = profile || {}

    function handleCopyLink() {
        const origin = window.location.origin
        const URL = `${origin}${asPath}`;
        navigator.clipboard.writeText(URL)
        setIsCopied(true)
    }


    return (
        <Layout title={name} favicon={avatar}>
            <main className="preview__box">

                <header className="preview__header">

                    {
                        isOriginalUser ? (
                            <Link className="preview__share" href="/customize">
                                <BackIcon className="preview__share-icon" />
                                <span className="preview__share-text">Back</span>
                            </Link>
                        ) : <div></div>
                    }

                    <button className="preview__share" onClick={handleCopyLink}>
                        <ShareIcon className="preview__share-icon" />
                        <span className="preview__share-text">Share</span>
                    </button>
                </header>



                <picture className="preview__picture">
                    <img className="preview__avatar"
                        src={avatar} alt={`${name}'s avatar`} />
                </picture>

                <h2 className={`preview__title ${!name && "preview__title-skeleton skeleton"}`}> {name} </h2>
                <h3 className={`preview__description ${!name && "preview__description-skeleton skeleton"}`} >{description} </h3>

                <ul className="preview__links">
                    {
                        links?.map(link => (
                            <li key={link.id}>
                                <LinkComponent link={link} />
                            </li>
                        ))
                    }
                </ul>
            </main>

            <AnimatePresence>
                {
                    isCopied && <ToasterSuccess />
                }
            </AnimatePresence>


        </Layout>
    )
}


function ToasterSuccess() {
    const variants: FramerMotionVariants = {
        hide: {
            x: "100%"
        },
        show: {
            x: "0%"
        }
    }


    return (
        <motion.div className="preview__copied" variants={variants} initial={"hide"} animate={"show"} exit={"hide"} transition={{ stiffness: 70, type: "spring" }}>
            <LinkIcon className="preview__link-icon"></LinkIcon>
            <span>Link copied to clipboard!</span>
        </motion.div>
    )
}


function LinkComponent({ link }: { link: JoinedLink }) {
    const { color, icon, url, label } = link
    const cssProps = { "--color": color } as CSSProperties

    return (
        <a target="_blank" style={cssProps} href={url ?? ""} className="preview__link" >

            <div className="preview__link-information">
                <img src={`/platform-white/${icon}`}
                    alt={`${label} icon`}
                    className="preview__link-platform-icon" />

                <span className="preview__link-text">
                    <span className="preview__link-user"> {label}</span>
                </span>
                <div></div>
            </div>
        </a>
    )
}


interface Data {
    profile: Profile
    links: LinkType[]
    error?: never
}

interface MyErrorProps {
    profile?: never
    links?: never
    error?: string
}

type Props = Data | MyErrorProps

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, query }) => {
    try {
        const { id } = query;

        const response: AxiosResponse<Data> = await axios({
            url: "/user/information", headers: {
                "x-user-id": id
            }
        })

        const { profile, links } = response.data

        return {
            props: {
                profile, links
            },
        };

    } catch (err) {
        let error: string;

        if (err instanceof AxiosError) {
            error = err.response?.data.message ?? err.message
        }
        else if (err instanceof Error) {
            error = err.message
        }
        else {
            error = 'An unknown error occurred. Try again later.'
        }

        return {
            props: {
                error
            },
        };
    }
};