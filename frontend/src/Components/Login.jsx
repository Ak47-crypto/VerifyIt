import React,{useContext} from 'react'
import {  Link,useNavigate } from 'react-router-dom'
import context from '../context/SiteContext'
function Login() {
  const {connection}=useContext(context)
  const styles={
    minHeight:"calc(100vh - 152px)",
    opacity:".6"

  }
  const navigate=useNavigate();
  if(localStorage.getItem('status')||connection)
  {navigate("/login/manufacturerLogin")}
  else
  return (
    <div className="container my-3" style={styles}>
        <div className="row ">
  <div className="col-md-8 col-lg-7 col-xl-6 my-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Manufacturing Login</h5>
        <p className="card-text">Got something to sell</p>
        <Link to={'/login/manufacturerLogin'} className="btn btn-primary">Login</Link>
      </div>
    </div>
  </div>
  <div className="col-md-8 col-lg-7 col-xl-6 my-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Seller Login</h5>
        <p className="card-text">Got something to Deliver</p>
        <Link to={'/login/sellerLogin'} className="btn btn-primary">Login</Link>
      </div>
    </div>
  </div>
  <div className="col-md-8 col-lg-7 col-xl-6 my-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Consumer Login</h5>
        <p className="card-text">Verify your product</p>
        <Link to={'/login/consumerLogin'} className="btn btn-primary">Verify Product</Link>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login