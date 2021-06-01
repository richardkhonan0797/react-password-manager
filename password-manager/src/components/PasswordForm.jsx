import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { passwordValidation, httpValidation } from '../helpers/validation'
import { savePass } from '../store/actions/passwordActions'

export const PasswordForm = () => {

    const [ url, setUrl ] = useState('')
    const [ username, setUsername ] =  useState('')
    const [ password, setPassword ] =  useState('')
    const [ strength, setStrength ] =  useState({
        uppercase: false,
        lowercase: false,
        character: false,
        digit: false,
        passLength: false
    })

    const dispatch = useDispatch()
    
    const checkPassword = (password) => {
        setStrength(passwordValidation(password))
        setPassword(password)
    }

    const savePassword = (e) => {
        e.preventDefault()
        dispatch(savePass({url,username,password}))
        setPassword('')
        setUrl('')
        setUsername('')
        setStrength({
            uppercase: false,
            lowercase: false,
            character: false,
            digit: false,
            passLength: false
        })
    }

    return (
        <div className="flex border-2 border-gray-300 rounded-lg shadow-lg bg bg-gray-100 w-1/3 mx-auto mt-2 justify-center">
            <form className="" onSubmit={event => savePassword(event)}>
                <div className="flex flex-col">
                    <label className="text-xs opacity-50 uppercase" htmlFor="url">Url</label>
                    <input data-testid="url-input" className="border border-gray-500 rounded shadow my-2" type="text" required onChange={ e => setUrl(e.target.value)} placeholder="Input URL" id="url" value={url} />
                    {
                        !httpValidation.test(url) && url.length > 0
                            ? <p className="px-3 py-1 text-black text-teal-700 bg bg-red-300 border-2 border-red-400 rounded-lg text-center">Input valid url</p>
                            : ''
                    }
                </div>
                <div className="flex flex-col">
                    <label className="text-xs opacity-50 uppercase" htmlFor="username">Username</label>
                    <input data-testid="username-input" className="border border-gray-500 rounded shadow my-2" type="text" required onChange={ e => setUsername(e.target.value)} placeholder="Input Username" id="username" value={username} />
                    <label className="text-xs opacity-50 uppercase" htmlFor="password">Password</label>
                    <input data-testid="password-input" className="border border-gray-500 rounded shadow my-2" type="password" onChange={ e => checkPassword(e.target.value)} placeholder="Input Password" id="password" value={password} />
                </div>
                {
                    Object.values(strength).includes(false) && password.length > 0
                        ?    <ul className="px-3 py-1 text-black text-teal-700 bg bg-red-300 border-2 border-red-400 rounded-lg">
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
                    !Object.values(strength).includes(false) && httpValidation.test(url)
                        ? <button type="submit" className="bg bg-blue-500 border-b-2 border-blue-600 rounded px-2 py-1 text-white self-center">Save</button>
                        : ''
                }
            </form>
        </div>
     )
            
}