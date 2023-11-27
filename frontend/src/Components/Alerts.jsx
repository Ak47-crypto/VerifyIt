import React, { useContext } from 'react'
import context from '../context/SiteContext'
function Alerts() {
    const {alerts}=useContext(context)
    return (
        <>
        {alerts&&
        <div className='d-flex justify-content-center ' style={{position:"fixed",zIndex:"1",left:"0",right:"0",margin:"0 auto"}}>
            <div className={`alert alert-${alerts.alertType} text-center`} role="alert">
               {alerts.message}
            </div>
        </div>
}
        </>
    )
}

export default Alerts