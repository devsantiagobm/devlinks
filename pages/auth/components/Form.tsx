import Image from "next/image";
import Link from "next/link";

import { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion"

import { Loader, Layout } from "components"
import { FormProps, RequestBody } from "pages/auth/models"
import { FramerMotionVariants } from "models";
import { FormValidation } from "pages/auth/helpers";
import { useRequest } from "pages/auth/hooks";

export default function Form({ inputs, type, texts, urlRequest }: FormProps) {
    const { request, error, loading, setError } = useRequest(urlRequest)


    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)

        const data: RequestBody = Object.fromEntries(new FormData(e.currentTarget))
        const formValidation = new FormValidation(data, e.currentTarget)

        if (formValidation.errors.length > 0) return
        
        // Makes the request and also redirect user if all is good
        await request(data)
    }

    return (
        <Layout className="form" title="Login">
            <form className="form__box" onSubmit={onSubmit} noValidate autoComplete="off">

                <picture className="form__picture">
                    <Image src="/icons/logo-devlinks-large.svg" alt="devlinks icon" width={160} height={40} className="form__logo" />
                </picture>

                <h1 className="form__title">{texts.title}</h1>
                <h6 className="form__subtitle">{texts.subtitle}</h6>


                <div className="form__inputs">
                    {
                        inputs.map(({ Icon, name, placeholder, label, type, error }) => (
                            <div className="form__input-box" key={name}>
                                <label htmlFor={name} className="form__label">{label}</label>
                                <label htmlFor={name} className="form__input">
                                    <Icon className="form__icon" />
                                    <input type={type} id={name} placeholder={placeholder} name={name} className="form__input-writer" />
                                    <span className="form__border"></span>

                                </label>

                                <span className="form__input-error">{error}</span>
                            </div>
                        ))
                    }
                </div>

                <AnimatePresence>
                    {
                        error && (
                            <motion.strong variants={errorVariants} exit={"exit"} animate={"show"} initial={"hide"} transition={{ duration: .3 }} className="form__error">
                                {error}
                            </motion.strong>
                        )
                    }
                </AnimatePresence>

                <button type="submit" className="form__submit">
                    {
                        loading ? <Loader /> : texts.submit
                    }
                </button>





                <span className="form__last-message">
                    {texts.message}
                    <Link href={texts.href} className="form__link">{texts.link}</Link>
                </span>


            </form>
        </Layout>
    )
}

const errorVariants: FramerMotionVariants = {
    show: {
        opacity: 1,
    },
    hide: {
        opacity: 0
    },
    exit: {
        opacity: 0
    },
}