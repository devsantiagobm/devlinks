import { Form } from "pages/auth/components"
import { MdOutlineMail as EmailIcon } from "react-icons/md"
import { AiFillLock as LockedIcon } from "react-icons/ai"

import { FormTexts, input } from "pages/auth/models"

export default function SignUp() {
    return (
        <Form inputs={inputs} type="signup" texts={texts} urlRequest={"auth/signup"} />
    )
}

const texts: FormTexts = {
    title: "Create account",
    subtitle: "Let's get you started sharing your links!",
    submit: "Create new account",
    message: "Already have an account?",
    link: "Log in",
    href: "/auth/login"
}

const inputs: input[] = [
    {
        label: "Email Address",
        name: "email",
        placeholder: "e.g. alex@email.com",
        Icon: EmailIcon,
        type: "email",
        error: "Looks like this is not an email"
    },
    {
        label: "Password",
        name: "password",
        placeholder: "At least 8 characters",
        Icon: LockedIcon,
        type: "password",
        error: "Password must have at least 8 characters"
    },
    {
        label: "Confirm password",
        name: "confirm_password",
        placeholder: "At least 8 characters",
        Icon: LockedIcon,
        type: "password",
        error: "Password confirmation does not match"
    }
]