import React from 'react'
import box from '../../box-open-solid.svg'
import { Link } from 'react-router-dom'
import context from '../context/SiteContext'
function Home() {
  const { connection } = React.useContext(context)
  return (
    <>
      <div className="container py-5 h-100">
        <div className="row">
          <div className="col-md-8 col-lg-7 col-xl-6 p-5">
            <div className="d-flex align-items-center justify-content-center ">
              {/* <i class="fa-solid fa-box-open fa-beat fa-2xl"></i> */}
              <img src={box} alt="box" />
            </div>
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <div className="d-flex align-items-center justify-content-center p-5">


              <div className="text-center">
                <h1 className="display-1 fw-bold">Let's Move To</h1>


                <p className=" display-1 fw-bold"> <span className="text-danger"> Original</span> </p>
                <p className="lead fw-bold">
                  Is Your Product Legitimate
                </p>
                {localStorage.getItem("status") ? <Link to={"/login/manufacturerLogin"} className="  btn btn-primary">Go Home</Link> : <Link to={"/login/manufacturerLogin"} className=" d-none btn btn-primary">Go Home</Link>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home