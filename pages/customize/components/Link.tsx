import { motion } from "framer-motion"
import { useRef, ChangeEvent } from "react";
import Select, { components, OptionProps, GroupBase, MenuProps, ControlProps, ValueContainerProps, SingleValue } from "react-select"
import { platforms } from "constant";
import type { Platform, Link } from "models";
import { useContextUser } from "../hooks";
import Image from "next/image";

interface Props {
    link: Link,
    index: number
}

export function Link({ link, index }: Props) {
    const { dispatchLinks } = useContextUser()
    const uniqueId = useRef(Math.random().toFixed(5).slice(2));
    const selectedPlatform = platforms.find(({ id }) => id === link.platform)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const updatedLink: Link = { ...link, username: e.currentTarget.value }
        dispatchLinks({ type: "update", payload: updatedLink })
    }

    function handleDelete() {
        dispatchLinks({ type: "remove", payload: link })
    }

    return (
        <motion.article initial={{ y: 0, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }} className="link" exit={{ opacity: 0, height: 0, margin: 0 }}>

            <header className="link__header">

                <div className="link__index">
                    <h5 className="link__title">Link #{index}</h5>
                </div>

                <button type="button" onClick={handleDelete} className="link__remove">Remove</button>
            </header>

            <span className="link__label">Platform</span>
            <CustomSelect link={link} />

            <span className="link__label">Username</span>

            <label htmlFor={uniqueId.current} className="link__input-box">
                <img src="/icons/icon-link.svg" alt="Url icon" />
                <input type="text" onChange={handleChange} defaultValue={link.username ?? ""}
                    placeholder={selectedPlatform?.example ? `e.g. ${selectedPlatform.example}` : "e.g. devMaster90"}
                    className="link__input" id={uniqueId.current} />
            </label>

            <hr className="link__divider" />

        </motion.article >
    )
}



function CustomSelect({ link }: { link: Link }) {
    const uniqueId = useRef("select_" + Math.random().toFixed(5).slice(2));
    const { Option, Menu, Control, ValueContainer } = components
    const { dispatchLinks } = useContextUser()
    const selected = platforms.find(({ id }) => id === link.platform)

    const customComponents = {
        Option: function (props: OptionProps<Platform, false, GroupBase<Platform>>) {
            return (
                <Option {...props} className="link__option" data-color="red">
                    <Image src={"/platform-gray" + props.data.icon} width={16} height={16} alt={`${props.data.label}'s icon`} />
                    <span>{props.data.label} </span>
                </Option>
            )
        },

        ValueContainer: function (props: ValueContainerProps<Platform, false, GroupBase<Platform>>) {
            return (
                <ValueContainer {...props} className="link__selected-preview">
                    {
                        selected && <img src={"/platform-gray" + selected.icon} alt="Selected Platform Icon" className="link__selected-icon" />
                    }
                    <div className="link__selected-input">{props.children} </div>
                </ValueContainer>
            )
        },

        Menu: (props: MenuProps<Platform, false, GroupBase<Platform>>) => <Menu {...props} className="menu" />,
        Control: (props: ControlProps<Platform, false, GroupBase<Platform>>) => <Control {...props} className="link__select" />,
    }

    function handleMenuClose() {
        const menuEl = document.querySelector(`#${uniqueId.current} .menu`);
        const containerEl = menuEl?.parentElement;
        const clonedMenuEl = menuEl?.cloneNode(true) as HTMLElement;

        if (!clonedMenuEl) return;

        clonedMenuEl?.classList.add('menu--close');
        clonedMenuEl.addEventListener('animationend', () => {
            containerEl?.removeChild(clonedMenuEl);
        });

        containerEl?.appendChild(clonedMenuEl!);
    }

    function handleChange(choice: SingleValue<Platform>) {
        if (choice) {
            const { id: platform } = choice
            const updatedLink: Link = { ...link, platform }
            dispatchLinks({ type: "update", payload: updatedLink })
        }
    }

    return (
        <Select
            id={uniqueId.current}
            options={platforms}
            defaultValue={selected}
            className="link__select"
            onMenuClose={handleMenuClose}
            components={customComponents}
            onChange={handleChange}
            getOptionValue={(option) => option.id} />
    )
}