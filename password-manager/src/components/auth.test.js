import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { AuthForm } from './AuthForm'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from '../store/index'
import { setUser } from '../store/actions/userActions'
import { userReducer } from '../store/reducers/userReduces'

jest.mock('../store/actions/userActions.js')

test('login form', () => {

    const store = createStore(
        userReducer,
        {
            user: null
        }
    )

    const { getByTestId } = render(
        <Provider store={store}>
            <Router>
                <AuthForm />
            </Router>
        </Provider>
    )

    const dispatch = jest.fn()
    const login = jest.fn( () => {
        return {
            type: 'SET_USER',
            user: {
                uid: 'asdfasdf',
                username: 'asdfasdf'
            }
        }
    })

    setUser.mockImplementation(login)

    const loginForm = getByTestId('login-form')
    const loginEmail = getByTestId('login-email-input')
    const loginPassword = getByTestId('login-password-input')
    const loginButton = getByTestId('login-button')

    expect(loginForm).toBeInTheDocument()
    expect(loginEmail).toBeInTheDocument()
    expect(loginPassword).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()

    expect(dispatch).not.toHaveBeenCalled()
    expect(login).not.toHaveBeenCalled()

    fireEvent.change(loginEmail,{target: {value: 'richard@mail.com'}})
    fireEvent.change(loginPassword,{ target: { value: '123123'}})
    expect(loginEmail).toHaveValue('richard@mail.com')
    expect(loginPassword).toHaveValue('123123')

    fireEvent.click(loginButton)
    fireEvent.submit(loginForm)

})

test('register form', () => {
    const store = createStore(
        userReducer,
        {
            user: null
        }
    )

    const { getByTestId } = render(
        <Provider store={store}>
            <Router>
                <AuthForm />
            </Router>
        </Provider>
    )

    const register = jest.fn( () => {
        return {
            type: 'SET_USER',
            user: {
                uid: 'asdfasdf',
                username: 'asdfasdf'
            }
        }
    })

    setUser.mockImplementation(register)

    const registerForm = getByTestId('register-form')
    const registerEmail = getByTestId('register-email-input')
    const registerPassword = getByTestId('register-password-input')
    const registerButton = getByTestId('register-button')

    expect(registerForm).toBeInTheDocument()
    expect(registerEmail).toBeInTheDocument()
    expect(registerPassword).toBeInTheDocument()
    expect(registerButton).toBeInTheDocument()

    expect(dispatch).not.toHaveBeenCalled()
    expect(register).not.toHaveBeenCalled()
    expect(register).not.toHaveBeenCalled()

    fireEvent.change(registerEmail,{target: {value: 'richard@mail.com'}})
    fireEvent.change(registerPassword,{ target: { value: '123123'}})
    expect(registerEmail).toHaveValue('richard@mail.com')
    expect(registerPassword).toHaveValue('123123')

    fireEvent.click(registerButton)
    fireEvent.submit(registerForm)
})