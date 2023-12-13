import React, { useState } from 'react'
import SiteContext from './SiteContext'
function SiteStates(Props) {
  const host='http://localhost:3000'
  // https://verifyit-backend.vercel.app
  const [alerts,setAlerts]=useState(null);
  const [connection, setConnection] = useState(false)
  const [height, setHeight] = useState(null)
  const [ids, setIds] = useState('')

  const contractAdd='0xd25eE42139eB3D922B9e14f56e1A958D1f711BdD'
  const handleAlerts=(msg,typo,time=3000)=>{
    setAlerts({
      message:msg,
      alertType:typo
    }
    )
    const timeOutFun=()=>{
      setTimeout(()=>{
        setAlerts(null)
      },time)
    }
    timeOutFun()
    clearTimeout(timeOutFun)
  }
  return (
    <SiteContext.Provider value={{host,contractAdd,connection,alerts,height,setHeight,setConnection,setAlerts,handleAlerts}}>
        {Props.children}
    </SiteContext.Provider>
  )
}

export default SiteStates
