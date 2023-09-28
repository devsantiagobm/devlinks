type FormData = { [k: string]: FormDataEntryValue }

const FORM_INPUT_ERROR_CLASS: string = "form__input-box--error"

export class FormValidation {
    data: [string, FormDataEntryValue][]
    form: HTMLFormElement
    errors: string[]

    constructor(data: FormData, form: HTMLFormElement) {
        this.data = Object.entries(data);
        this.form = form
        this.errors = []

        this.resetForm() // Reset all the errors that are in the window
        this.whichFieldsAreWrong() // Finds which inputs are not correct
        this.showErrors() // When we know which errors there are (string[]) we can show the errors in the window
    }

    resetForm() {
        this.data.forEach(([key]) => {
            this.form[key].parentElement?.parentElement?.classList.remove(FORM_INPUT_ERROR_CLASS)
        })
    }

    whichFieldsAreWrong() {
        this.errors = this.data.filter(([key, value]) => this.isFieldWrong(key, value)).map(([key]) => key)
    }


    showErrors() {
        this.errors.forEach((value) => {
            // A form element (HtmlFormElement) has, in his properties, the inputs that have a "name" attribute
            const input: HTMLInputElement = this.form[value]
            input.parentElement?.parentElement?.classList.add(FORM_INPUT_ERROR_CLASS)
        })
    }


    isFieldWrong(key: string, value: FormDataEntryValue) {
        if (key === "email") {
            return !String(value).match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        }
        else if (key === "password") {
            return value.length < 8
        }
        else if (key === "confirm_password") {
            return this.findPassword() !== value
        }
        else {
            return value.length === 0
        }
    }

    findPassword() {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i][0] === "password") {
                return this.data[i][1];
            }
        }
    }


}