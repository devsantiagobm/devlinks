import { useRef, useEffect } from "react"
import { CSSProperties } from "react";
import { AiOutlineShareAlt as ShareIcon } from "react-icons/ai"
import { BiArrowBack as BackIcon } from "react-icons/bi"
import { platforms } from "constant";
import { useContextUser, useContextAvatar } from "../hooks";
import { JoinedLink } from "models";

export default function Preview() {
    const imageMockup = useRef<HTMLImageElement>(null)
    useEffect(() => {
        const img = document.createElement("img")
        img.src = "/icons/illustration-phone-mockup.svg"
        img.onload = function () {
            if (imageMockup.current && imageMockup.current.parentElement) {
                const width = imageMockup.current?.clientWidth

                const height = imageMockup.current?.clientHeight

                imageMockup.current.parentElement.style.maxWidth = width + "px"
                imageMockup.current.parentElement.style.maxHeight = height + "px"
            }
            else {
                throw new Error("Ooops! Something happened")
            }
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
                    <img ref={imageMockup} src="/icons/illustration-phone-mockup.svg" alt="Phone Mockup" />
                </div>
            </div>
        </div>
    )
}



function PreviewContent() {
    const { links: unCompletedLinks, profile } = useContextUser()
    const { name, description, avatar } = profile || {}
    const { preview } = useContextAvatar()



    const links: JoinedLink[] = unCompletedLinks?.map((link) => ({
        ...platforms.find((platform) => platform.id === link.platform),
        ...link,
    })).filter(({ platform }) => platform != null) ?? [];



    return (
        <main className="preview__box">

            <header className="preview__header">

                <button className="preview__share">
                    <BackIcon className="preview__share-icon" />
                </button>

                <button className="preview__share">
                    <ShareIcon className="preview__share-icon" />
                </button>
            </header>

            <picture className="preview__picture skeleton">
                <img className="preview__avatar" src={preview ? preview : avatar} />
            </picture>

            <h2 className={`preview__title ${!name && "preview__title-skeleton skeleton"}`}> {name ? name : "Default"}</h2>
            <h3 className={`preview__description ${!description && "preview__description-skeleton skeleton"}`}>{description ? description : "Default "}</h3>

            <ul className="preview__links">
                {
                    links?.map(link => (
                        <li key={link.id}>
                            <LinkComponent link={link} />
                        </li>
                    ))
                }

                {
                    links.length === 0 && new Array(5).fill(null).map((_, i) => (
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

            <div className="preview__link-information preview__link-information--skeleton">
                <span className="preview__link-text">
                    <span className="preview__link-user">label</span>
                </span>
                <div></div>
            </div>
        </div>
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
                    <span className="preview__link-user">{label}</span>
                </span>
                <div></div>
            </div>
        </a>
    )
}