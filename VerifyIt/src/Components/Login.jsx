import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function Login() {
  return (
    <div className="container my-3">
        <div className="row ">
  <div className="col ">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Manufacturing Login</h5>
        <p className="card-text">Got something to sell</p>
        <Link to={'/login/manufacturerLogin'} className="btn btn-primary">Login</Link>
      </div>
    </div>
  </div>
  <div className="col ">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Consumer Login</h5>
        <p className="card-text">Verify your product</p>
        <Link to={'/login/consumerLogin'} className="btn btn-primary">Login</Link>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login