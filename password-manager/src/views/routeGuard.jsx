import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { auth } from '../firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../store/actions/userActions'

export const PrivateRoute = (props) => {
    const user = useSelector(state => state.user)
    
    const dispatch = useDispatch()

    useEffect( () => {
        auth.onAuthStateChanged( function( user ) {
            if( user ) {
                dispatch(setUser(user))
            } else {
                    dispatch(setUser(null))
                }
            })
    },[])
                    
    return (
        <Route {...props}>
            {
                user.user
                    ? props.children
                    : <Redirect to="/login" />
            }
        </Route>
    )
}