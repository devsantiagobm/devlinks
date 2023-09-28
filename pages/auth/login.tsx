import { MdOutlineMail as EmailIcon } from "react-icons/md"
import { AiFillLock as LockedIcon } from "react-icons/ai"
import { input } from "pages/auth/models";
import { Form } from "pages/auth/components"

export default function Login() {
    return (
        <Form inputs={inputs} type="login" texts={texts} urlRequest={"auth/login"}/>
    )
}

const texts = {
    title: "Login",
    subtitle: "Add your details below to get back into the app",
    submit: "Log in",
    message: "Don't have an account?",
    link: "Create account",
    href: "/auth/signup"
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
]