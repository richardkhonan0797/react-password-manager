export const passwordValidation = (password) => {
    return {
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        character: /\W/.test(password),
        digit: /[0-9]/.test(password),
        passLength: password.length >= 5
    }
}

export const httpValidation = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/