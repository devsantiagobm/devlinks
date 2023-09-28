import Image from "next/image"
import Link from "next/link"
import Nav from "./Nav"
import { useContextUser } from "../hooks"


export default function Header() {
    const { profile } = useContextUser()

    return (
        <header className="header">
            <picture className="header__picture">
                <Image src="/icons/logo-devlinks-large.svg" width={150} height={35} alt="Devlinks Icon" />
            </picture>

            <Nav></Nav>

            <div className="header__link-box">
                <Link href={`/u/${profile?._id}`} className="button">Preview</Link>
            </div>

        </header>
    )
}
