import React from 'react'
// import {useDispatch} from 'react-redux'
import {logout} from '../../api/auth'
// import {logout as authLogout} from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
    // const dispatch = useDispatch()
    const navigate=useNavigate()
    const logoutHandler=async()=>{
        localStorage.removeItem("userData");
        navigate('/');
       
    }
  return (
     <button  onClick={logoutHandler}  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
        Logout
     </button>
  )
}

export default LogoutBtn
