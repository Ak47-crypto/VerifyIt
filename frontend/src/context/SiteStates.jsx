import React, { useState } from 'react'
import SiteContext from './SiteContext'
function SiteStates(Props) {
  const host='http://localhost:3000'
  const [alerts,setAlerts]=useState(null);
  const [connection, setConnection] = useState(false)
  const [height, setHeight] = useState(null)

  const handleAlerts=(msg,typo)=>{
    setAlerts({
      message:msg,
      alertType:typo
    }
    )
    setTimeout(()=>{
      setAlerts(null)
    },3000)
  }
  return (
    <SiteContext.Provider value={{host,connection,alerts,height,setHeight,setConnection,setAlerts,handleAlerts}}>
        {Props.children}
    </SiteContext.Provider>
  )
}

export default SiteStates