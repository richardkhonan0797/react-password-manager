import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebaseConfig'
import { useHistory } from 'react-router-dom'
import { removeUser } from '../store/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { PasswordForm } from '../components/PasswordForm'
import { Password } from '../components/Password'
import logo from '../assets/logo.png'

export const Home = (props) => {

    const userData = useSelector(state => state.user)
    const [search,setSearch] = useState('')
    const [passwords, setPasswords] = useState([])

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect( () => {
        const unsubscribe = db.collection("passwords")
          .onSnapshot(function(querySnapshot) {
            let allPasswords = []
            querySnapshot.forEach( doc => allPasswords.push({id:doc.id,...doc.data()}))
            setPasswords(allPasswords)
          })
    
        return unsubscribe
      },[])

    const signOut = () => {
        auth.signOut()
        dispatch(removeUser())
        history.push('/login')
    }

    return(
        <div>
            <div className="border-b-2 border-gray-300 shadow-md px-5 mb-5 flex">
                <img src={logo} className="w-32 h-32" alt=""/>
                <div className="mx-auto my-auto">
                    <label htmlFor="search" className="uppercase my-auto mr-2 text-gray-700 font-bold">search</label>
                    <input onChange={e => setSearch(e.target.value)} className="border border-gray-500 rounded shadow my-2 h-8 my-auto" type="text" placeholder="Input search"  id="search"/>
                    <button className="px-3 mx-1 py-1 border-b-2 border-blue-600 bg bg-blue-500 text-white h-8 my-auto rounded hover:bg-blue-700">Search</button>
                </div>
                <button className="px-3 mx-1 py-1 border-b-2 border-red-600 bg bg-red-500 text-white w-1/12 h-8 my-auto rounded hover:bg-red-700" onClick={() => signOut()}>Signout</button>
            </div>
            <PasswordForm/>
            <div data-testid="password-list">
            {   
                search == ''
                   ? passwords.map( (password,i) => {
                        if(password.userId === userData.user.uid) {
                            return <Password key={i} password={password} />
                        }
                    }) 
                    : passwords.filter( password => {
                       return password.URL.includes(search)
                    })
                    .map((password,i) => {
                        return <Password key={i} password={password} />
                    })
                }
            </div>
        </div>
    )
}