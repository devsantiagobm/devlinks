import { FormEvent } from "react"

export function formValidation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const data = Object.entries(Object.fromEntries(new FormData(form)))
    let errors: string[] = []

    data.forEach(([key, value]) => {
        const input = form[key] as HTMLInputElement

        if (value === "") {
            input.classList.add("customize__input--error")
            errors = [...errors, key]
        }
        else {
            input.classList.remove("customize__input--error")
        }
    })


    return { error: errors.length > 0 }
}