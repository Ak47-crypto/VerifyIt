import React,{useContext}from 'react'
import { Link } from 'react-router-dom'
import context from '../context/SiteContext'
function Navbar() {
  const {connection}=useContext(context)
  return (
    <>
    <div >
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
  <i className="fa-solid fa-box-open fa-2xl"></i>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item ">
          <Link className="nav-link active font-weight-bold font-italic" aria-current="page" to={'/'}>
            VerifyIt
          </Link>
        </li>
      </ul>
      <form className="d-flex">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item ">
          <Link className="nav-link  font-weight-bold font-italic"  to={'/about'}>
            About
          </Link>
        </li>
        <li className="nav-item ">
          {localStorage.getItem('status')||connection?<Link to={'/signout'} className="nav-link font-weight-bold font-italic"  href="#">
            Sign Out
          </Link>:<Link to={'/login'} className="nav-link font-weight-bold font-italic"  href="#">
            Login
          </Link>}
          
          
        </li>
      </ul>
      </form>
    </div>
  </div>
</nav>

</div>
    </>
  )
}

export default Navbar