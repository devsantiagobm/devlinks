import { HiLink as LinkIcon } from "react-icons/hi"
import { FaRegUserCircle as UserIcon } from "react-icons/fa"
import { motion } from "framer-motion";
import { IconType } from "react-icons/lib";
import { useContextViews } from "pages/customize/hooks";
import { Views } from "../models";


export default function Nav() {
    const { view, setView } = useContextViews()

    return (
        <nav className="header__nav">
            {
                tabs.map(({ label, Icon }) => (
                    <button key={label} onClick={() => setView(label)} className={`header__button ${view === label && "header__button--active"} `} >

                        {view === label && <ActiveButton />}

                        <Icon className="header__icon" />
                        <span>{label} </span>

                    </button>
                ))
            }
        </nav>
    );
}

function ActiveButton() {
    return <motion.span layoutId="bubble" className="header__button-springer" transition={{ type: "spring", duration: 0.6 }} />
}


interface Tabs {
    label: Views
    Icon: IconType
}

const tabs: Tabs[] = [
    { label: "Links", Icon: LinkIcon },
    { label: "Profile", Icon: UserIcon }
];