import { passwordAction } from '../actionTypes'
import { db } from '../../firebaseConfig'

export const savePass = (payload) => {
    return function (dispatch, getState) {
        const state = getState()

        console.log(payload,state)

        db.collection('passwords').add({
            URL: payload.url,
            username: payload.username,
            password: payload.password,
            userId: state.user.user.uid
        })
            .then( result => console.log(result))
            .catch( err => console.log(err))
    }
}

export const editPass = (payload) => {
    return function (dispatch, getState) {
        db.collection('passwords').doc(payload.passwordId).update({
            username: payload.username,
            password: payload.password,
            URL: payload.url
        })
            .then( result => console.log(result))
            .catch( err => console.log(err))
    }
}

export const deletePass = (payload) => {
    return function (dispatch, getState) {
        db.collection('passwords').doc(payload.passwordId)
            .delete()
            .then( () => console.log('password deleted'))
            .catch( err => console.log(err))
    }
}