import React from 'react'
import box from '../../box-open-solid.svg'
import { Link } from 'react-router-dom'
import context from '../context/SiteContext'
function Home() {
  const {connection}=React.useContext(context)
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-flex align-items-center justify-content-center vh-100">

              {/* <i class="fa-solid fa-box-open fa-beat fa-2xl"></i> */}
              <img src={box} alt="" />
            </div>
          </div>
          <div className="col">
            <div className="d-flex align-items-center justify-content-center vh-100">


              <div className="text-center">
                <h1 className="display-1 fw-bold">Let's Move To</h1>


                <p className=" display-1 fw-bold"> <span className="text-danger"> Original</span> </p>
                <p className="lead fw-bold">
                  Is Your Product Legitimate
                </p>
                <Link to={localStorage.getItem('status')||connection?"/login/manufacturerLogin":"/"} className=" btn btn-primary">Go Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home