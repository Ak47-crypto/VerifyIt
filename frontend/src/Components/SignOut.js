import React,{useContext,useEffect,} from 'react'
import {useNavigate} from 'react-router-dom'
import context from '../context/SiteContext'
function SignOut() {
  const navigate = useNavigate(); 
    const {setConnection,connection}=useContext(context)
    useEffect(()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    localStorage.removeItem("email")
    localStorage.removeItem("status")
    localStorage.removeItem("ids")
    setConnection(false)
    
    navigate("/")
    window.location.reload()
    },[]) 
}
export default SignOut