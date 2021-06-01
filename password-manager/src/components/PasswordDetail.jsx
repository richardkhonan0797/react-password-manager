import React, {useState, useEffect} from 'react'
import { db } from '../firebaseConfig'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { passwordValidation, httpValidation } from '../helpers/validation'
import { editPass } from '../store/actions/passwordActions'

export const PasswordDetail = () => {
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

    const location = useLocation()
    const dispatch = useDispatch()
    
    useEffect( () => {
        let param = location.pathname.substring(location.pathname.lastIndexOf('/')+1)
        db.collection('passwords').doc(param).get()
            .then ( doc  => {
                setPassword(doc.data().password)
                setUrl(doc.data().URL)
                setUsername(doc.data().username)
            })
            .catch ( err => console.log(err))

    },[])    
    
    const checkPassword = (password) => {
        setStrength(passwordValidation(password))
        setPassword(password)
    }

    const editPassword = (e) => {
        e.preventDefault()
        let param = location.pathname.substring(location.pathname.lastIndexOf('/')+1)
        dispatch(editPass({url,password,username,passwordId:param}))
    }

    return (
        <div className="flex border-2 border-gray-300 bg bg-gray-200 shadow-lg rounded-lg mt-2 py-2 justify-center">
            <form className="" onSubmit={event => editPassword(event)}>
                <div className="flex flex-col">
                    <label className="text-xs opacity-50 uppercase" htmlFor="url">Url</label>
                    <input className="border border-gray-500 rounded shadow my-2" type="text" required onChange={ e => setUrl(e.target.value)} placeholder="Input URL" id="url" value={url} />
                    {
                        !httpValidation.test(url) && url.length > 0
                            ? <p className="px-3 py-1 text-black text-teal-700 bg bg-red-300 border-2 border-red-400 rounded-lg text-center">Input legit url</p>
                            : ''
                    }
                </div>
                <div className="flex flex-col">
                    <label className="text-xs opacity-50 uppercase" htmlFor="username">Username</label>
                    <input className="border border-gray-500 rounded shadow my-2" type="text" required onChange={ e => setUsername(e.target.value)} placeholder="Input Username" id="username" value={username} />
                    <label className="text-xs opacity-50 uppercase" htmlFor="password">Password</label>
                    <input className="border border-gray-500 rounded shadow my-2" type="text" onChange={ e => checkPassword(e.target.value)} placeholder="Input Password" id="password" value={password} />
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
                                !strength.character ? <li className="list-disc ml-3">At leat 1 character</li> : ''
                            }
                            {
                                !strength.digit ? <li className="list-disc ml-3">At leat 1 number</li> : ''
                            }
                            {
                                !strength.passLength ? <li className="list-disc ml-3">At leat 5 chars</li> : ''
                            }
                        </ul>
                        : ''
                }
                {
                    !Object.values(strength).includes(false) && httpValidation.test(url)
                        ? <button type="submit" className="bg bg-blue-500 border-b-2 border-blue-600 rounded px-2 py-1 text-white self-center">Update</button>
                        : ''
                }
            </form>
        </div>
     )
}