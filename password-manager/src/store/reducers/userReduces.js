import { userAction } from '../actionTypes'

let initialState = {
    user: null,
    edit: null,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userAction.SET_USER: {
            return {
                user: action.user
            }
        }
        case userAction.REMOVE_USER: {
            return {
                user: null
            }
        }
        case userAction.EDIT: {
            return {
                edit: action.edit
            }
        }
        default:
            return state
    }
}