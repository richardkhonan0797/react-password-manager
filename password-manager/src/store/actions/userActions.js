import { userAction } from '../actionTypes'

export const setUser = (user) => {
    return {
        type: userAction.SET_USER,
        user
    }
}

export const removeUser = () => {
    return {
        type: userAction.REMOVE_USER
    }
}

export const editUserPassword = (status) => {
    return {
        type: userAction.EDIT,
        edit: status
    }
}