import Image from "next/image"
import Link from "next/link"
import Nav from "./Nav"
import { AiOutlineEye as EyeIcon } from "react-icons/ai"
import { useContextUser } from "../hooks"


export default function Header() {
    const { profile } = useContextUser()

    return (
        <header className="header">
            <picture className="header__picture">
                <Image src="/icons/logo-devlinks-large.svg" className="header__logo--large" width={150} height={35} alt="Devlinks Icon" />
                <Image src="/icons/logo-devlinks-small.svg" className="header__logo--small" width={36} height={36} alt="Devlinks Icon" />
            </picture>

            <Nav></Nav>

            <div className="header__link-box">
                <Link href={`/u/${profile?._id}`} className="button header__link">
                    <span className="header__link-text">Preview</span>
                    <EyeIcon className="header__link-icon"></EyeIcon>
                </Link>
            </div>

        </header>
    )
}
