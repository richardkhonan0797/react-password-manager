import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, Route } from 'react-router-dom'
import { PasswordDetail } from '../components/PasswordDetail'
import { deletePass } from '../store/actions/passwordActions'


export const Password = (props) => {

    const [toEdit,setToEdit] = useState(false)

    const history = useHistory()
    const dispatch = useDispatch()

    const deletePassword = () => {
        dispatch(deletePass({passwordId: props.password.id}))
    }

    const toDetail = () => {
        toEdit
        ? setToEdit(false)
        : setToEdit(true)
        history.push(`/${props.password.id}`)
    }

    return (
        <div className="flex flex-col bg bg-gray-100 border-2 border-gray-300 w-1/3 rounded-lg mt-3 shadow-lg cursor-pointer mx-auto">
            <div className="flex">
                <img data-testid="image" className="rounded-lg h-auto w-40" src={"//logo.clearbit.com/"+ props.password.URL}></img>
                <div data-testid="data" className="flex flex-col ml-4 w-7/12">
                    <label className="text-xs opacity-50 my-auto uppercase" htmlFor="url">URL</label>
                    <p id="url">{props.password.URL}</p>
                    <label className="text-xs opacity-50 my-auto uppercase" htmlFor="username">Username</label>
                    <p id="username">{props.password.username}</p>
                    <label className="text-xs opacity-50 my-auto uppercase" htmlFor="password">password</label>
                    <p id="password">{props.password.password}</p>
                </div>
            </div>
            <div  className="flex">
                <div className="w-40 bg bg-gray-200 border-r-2 border-gray-300 text-center">
                    <p className="my-auto pt-2 bg text text-gray-700 uppercase text-sm font-semibold">Actions</p>
                </div>
                <div className="border-t-2 border-gray-300 w-8/12 flex justify-center">
                    <button data-testid="edit-button" className="px-3 mx-1 py-1 border-b-2 border-blue-600 bg bg-blue-500 text-white rounded w-6/12 mx-auto hover:bg-blue-700" onClick={() => toDetail()}>Edit</button>
                    <button data-testid="delete-button" className="px-3 mx-1 py-1 border-b-2 border-red-600 bg bg-red-500 text-white w-6/12 mx-auto rounded hover:bg-red-700" onClick={() => deletePassword()}>Delete</button>
                </div>
            </div>
            {
                toEdit
                    ? <Route to="/:passwordId" >
                          <PasswordDetail />
                      </Route>
                    : '' 
            }
        </div>
    )
}