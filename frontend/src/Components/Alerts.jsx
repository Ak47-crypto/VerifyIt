import React, { useContext } from 'react'
import context from '../context/SiteContext'
function Alerts() {
    const {alerts}=useContext(context)
    return (
        <>
        {alerts&&
        <div className='container'>
            <div className={`alert alert-${alerts.alertType} text-center`} role="alert">
               {alerts.message}
            </div>
        </div>
}
        </>
    )
}

export default Alerts