import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../firebaseConfig'
import { setUser } from '../store/actions/userActions'
import { useHistory } from 'react-router-dom'
import { passwordValidation } from '../helpers/validation'
import logo from '../assets/logo.png'

export const AuthForm = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [toRegister,setToRegister] = useState(false)
    const [ strength, setStrength ] =  useState({
        uppercase: false,
        lowercase: false,
        character: false,
        digit: false,
        passLength: false
    })

    const dispatch = useDispatch()
    const history = useHistory()

    const login = (event) => {
        event.preventDefault()
        auth.signInWithEmailAndPassword(email,password)
            .then( user => {
                dispatch(setUser(user))
                setEmail('')
                setPassword('')
                history.push('/')
            })
            .catch( err => console.log(err))
    }

    const register = (event) => {
        event.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
            .then( user => {
                dispatch(setUser(user))
                setEmail('')
                setPassword('')
                history.push('/')
            })
            .catch( err => console.log(err))
    }

    const toRegisterToggler = () => {
        setToRegister(true)
    }

    const checkPassword = (password) => {
        setStrength(passwordValidation(password))
        setPassword(password)
    }

    return (
        <div className="w-1/3 mx-auto h-screen my-auto flex flex-col">
            <img src={logo} className="w-6/12 h-56 mt-24 mx-auto" alt=""/>
        {
            !toRegister
            ?
            <form data-testid="login-form" className="flex flex-col w-2/3 mx-auto px-2 py-2 text-center border border-gray-300 bg bg-gray-200 rounded-lg shadow-lg" onSubmit={event => login(event)}>
                <p className=" text-2xl uppercase opacity-50 mb-2">Login</p>
                <label className="uppercase text-xs text-gray-700" htmlFor="emailS">Email</label>
                <input data-testid="login-email-input" className="border border-gray-500 rounded shadow my-2" onChange={ e => setEmail(e.target.value)} type="email" placeholder="Input email" value={email} id="emailS"/>
                <label className="uppercase text-xs text-gray-700" htmlFor="passwordS">Password</label>
                <input data-testid="login-password-input" className="border border-gray-500 rounded shadow my-2" onChange={ e => setPassword(e.target.value)} type="password" placeholder="Input password" value={password} id="passwordS"/>
                <button data-testid="login-button" className="w-3/12 mx-auto text-white bg bg-blue-600 border-b-2 border-blue-800 mb-2 rounded hover:bg-blue-700" type="submit">Login</button>
                <hr className=" border border-black w-full opacity-25"/>
                <div className="cursor-pointer mt-2 text-xs text-gray-700 uppercase hover:text-blue-700" onClick={() => toRegisterToggler()}>To register</div>
            </form>
            :
            <form data-testid="register-form" className="flex flex-col my-auto w-2/3 mx-auto px-2 py-2 text-center border border-gray-300 bg bg-gray-200 rounded-lg shadow-lg" onSubmit={event => register(event)}>
                <p className=" text-2xl uppercase opacity-50 mb-2">Register</p>
                <label className="uppercase text-xs text-gray-700" htmlFor="emailR">Email</label>
                <input data-testid="register-email-input" className="border border-gray-500 rounded shadow my-2" onChange={ e => setEmail(e.target.value)} type="email" placeholder="Input email" value={email} id="emailR"/>
                <label className="uppercase text-xs text-gray-700" htmlFor="passwordR">Password</label>
                <input data-testid="register-password-input" className="border border-gray-500 rounded shadow my-2" onChange={ e => checkPassword(e.target.value)} type="password" placeholder="Input password" value={password} id="passwordR"/>
                {
                    Object.values(strength).includes(false) && password.length > 0
                        ?    <ul className="px-3 py-1 text-black text-teal-700 bg bg-red-300 border-2 border-red-400 rounded-lg mb-2">
                            {
                                !strength.uppercase ? <li className="list-disc ml-3">At least 1 uppercase</li> : ''
                            }
                            {
                                !strength.lowercase ? <li className="list-disc ml-3">At least 1 lowercase</li> : ''
                            }
                            {
                                !strength.character ? <li className="list-disc ml-3">At least 1 symbol</li> : ''
                            }
                            {
                                !strength.digit ? <li className="list-disc ml-3">At least 1 number</li> : ''
                            }
                            {
                                !strength.passLength ? <li className="list-disc ml-3">At least 5 characters</li> : ''
                            }
                        </ul>
                        : ''
                }
                {
                    !Object.values(strength).includes(false)
                        && <button data-testid="register-button" className="w-3/12 mx-auto text-white bg bg-blue-600 border-b-2 border-blue-800 mb-2 rounded hover:bg-blue-700" type="submit">Register</button>
                    
                }    
            </form>   
        }
        </div>
    )
}