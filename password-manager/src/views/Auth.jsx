import React from 'react'
import { AuthForm } from '../components/AuthForm'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const Login = () => {

    const user = useSelector( state => state.user.user)
    console.log(user)

    return(
        <div>
            {
                user
                    ? <Route>
                        <Redirect to="/" />  
                      </Route>
                    : <AuthForm />
            }
        </div>
    )
}