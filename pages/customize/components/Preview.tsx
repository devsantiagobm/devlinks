
import { useRef, useEffect } from "react"
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
import { motion, AnimatePresence } from "framer-motion";

export default function Preview() {
    const imageMockup = useRef<HTMLImageElement>(null)

    useEffect(() => {

        if (imageMockup.current && imageMockup.current.parentElement) {
            const width = imageMockup.current?.clientWidth
            const height = imageMockup.current?.clientHeight

            imageMockup.current.parentElement.style.maxWidth = width + "px"
            imageMockup.current.parentElement.style.maxHeight = height + "px"
        }
    }, [])

    return (
        <div className="customize__preview phone-preview">

            <div className="phone-preview__sticky">
                <div className="phone-preview__box">
                    <img className="phone-preview__mockup" src="/icons/illustration-phone-mockup.svg" alt="Phone Mockup" />
                    <div className="phone-preview__content preview preview--mock">
                        <PreviewContent />
                    </div>
                    <img className="phone-preview__mockup-size" ref={imageMockup} src="/icons/illustration-phone-mockup.svg" alt="Phone Mockup" />
                </div>
            </div>
        </div>
    )
}



function PreviewContent() {
    return (
        <main className="preview__box">

            <header className="preview__header">

                <button className="preview__share">
                    <BackIcon className="preview__share-icon" />
                    <span className="preview__share-text">Back</span>
                </button>

                <button className="preview__share">
                    <ShareIcon className="preview__share-icon" />
                    <span className="preview__share-text">Share</span>
                </button>
            </header>

            <picture className="preview__picture skeleton">
                <img className="preview__avatar" src={""} />
            </picture>

            <h2 className={`preview__title ${true && "preview__title-skeleton skeleton"}`}> Santiago Barrera Muñoz</h2>
            <h3 className={`preview__description ${true && "preview__description-skeleton skeleton"}`}>Front End | NextJS, ReactJS, Angular</h3>

            <ul className="preview__links">
                {
                    links?.map(link => (
                        <li key={link.id}>
                            <LinkComponent link={link} />
                        </li>
                    ))
                }

                {
                    links.length === 0 && new Array(5 - links.length).fill(null).map((_, i) => (
                        <li key={i}>
                            <SkeletonLinkComponent />
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}

function SkeletonLinkComponent() {
    return (
        <div className="preview__link skeleton" >

            <div className="preview__link-information">
                <span className="preview__link-text">
                    <span className="preview__link-user">label</span>
                </span>
                <div></div>
            </div>
        </div>
    )
}

function LinkComponent({ link }: { link: any }) {
    const { color, icon, url, label } = link
    const cssProps = { "--color": color } as CSSProperties

    return (
        <a target="_blank" style={cssProps} href={url ?? ""} className="preview__link preview__link--skeleton" >

            <div className="preview__link-information">
                <img src={`/platform-white/${icon}`}
                    alt={`${label} icon`}
                    className="preview__link-platform-icon" />

                <span className="preview__link-text skeleton">
                    <span className="preview__link-user skeleton"> label</span>
                </span>
                <div></div>
            </div>
        </a>
    )
}


const links: unknown[] = [
    // {
    //     color: "#64CCDB",
    //     example: "SelfieQueenSloth",
    //     icon: "/frontend-mentor.svg",
    //     id: "65146094547d37e143114d62",
    //     label: "Frontend Mentor",
    //     platform: "¿ew_n9lm",
    //     url: "https://www.frontendmentor.io/profile/devsantiagobm",
    //     username: "devsantiagobm"
    // },
    // {
    //     color: "#64CCDB",
    //     example: "SelfieQueenSloth",
    //     icon: "/frontend-mentor.svg",
    //     id: "65146094547d37e143114d66",
    //     label: "Github",
    //     platform: "¿ew_n9lm",
    //     url: "https://www.frontendmentor.io/profile/devsantiagobm",
    //     username: "devsantiagobm"
    // },
]