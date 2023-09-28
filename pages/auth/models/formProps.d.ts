import { input } from "pages/auth/models"

export type FormTypes = "signup" | "login"

export type FormTexts = {
    title: string,
    subtitle: string,
    submit: string
    message: string
    link: string
    href: string
}

export interface FormProps {
    inputs: input[]
    type: FormTypes
    texts: FormTexts
    urlRequest
}