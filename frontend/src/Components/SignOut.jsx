import React,{useContext,useEffect} from 'react'
import Home from './Home'
import context from '../context/SiteContext'
function SignOut() {
    const {setConnection}=useContext(context)
    useEffect(()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("email")
    localStorage.removeItem("status")
    setConnection(false)
    },[])
    

  return (
    <div>
        <Home/>
    </div>
  )
}

export default SignOut