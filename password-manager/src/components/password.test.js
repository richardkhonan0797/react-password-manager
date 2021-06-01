import React from 'react'
import { render } from '@testing-library/react'
import { Password } from './Password'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { userReducer } from '../store/reducers/userReduces'
import { PasswordForm } from './PasswordForm'

jest.mock('../store/actions/passwordActions')

test('password', () => {
    const history = createMemoryHistory()
    const store = createStore(userReducer,{
        user: {
            uid: 'dummy'
        }
    })

    const data = {
        URL: 'http://facebook.com',
        username: 'username',
        password: 'password'
    }

    const { getByText, getAllByText } = render(
        <Provider store={store}>
            <Router history={history}>
                <Password password={data} />
            </Router>
        </Provider>
    )

    expect(getByText(data.URL)).toBeInTheDocument()
    expect(getByText(data.username)).toBeInTheDocument()
    expect(getAllByText(data.password)[0]).toBeInTheDocument()
})

test('password form', () => {

    const history = createMemoryHistory()

    const store = createStore(userReducer, {
        user: {
            uid: '123'
        }
    })

    const { getByTestId } = render(
        <Provider store={store}>
            <Router history={history}>
                <PasswordForm />
            </Router>
        </Provider>
    )

    const urlInput = getByTestId('url-input')
    const usernameInput = getByTestId('username-input')
    const passwordInput = getByTestId('password-input')

    expect(urlInput).toBeInTheDocument()
    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
})