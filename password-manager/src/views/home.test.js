import React from 'react';
import { render } from '@testing-library/react';
import { Home } from './Home'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { userReducer } from '../store/reducers/userReduces'
import { createMemoryHistory } from 'history'
import { BrowserRouter as Router } from 'react-router-dom'

test('props passwords', () => {
    const history = createMemoryHistory()
    const store = createStore(
        userReducer,
        {
            user: {
                uid: '123'
            }
        }
    )

    const passwords = [
        {id: '1',username:'a',email:'a@mail.com',password:'a',userId:'123'},
        {id: '2',username:'b',email:'b@mail.com',password:'b',userId:'123'},
        {id: '3',username:'c',email:'c@mail.com',password:'c',userId:'123'},
    ]

    const { getByTestId, debug } = render(
        <Provider store={store}>
            <Router history={history}>
                <Home />
            </Router>
        </Provider>
    )

        debug()

    const passwordList = getByTestId('password-list')

    expect(passwordList.children.length).toEqual(passwords.length)
})