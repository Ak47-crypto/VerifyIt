import React from 'react'
import box from '../../box-open-solid.svg'
import { Link } from 'react-router-dom'
import context from '../context/SiteContext'
function Home() {
  console.log(typeof localStorage.getItem('ids'))
  const { connection } = React.useContext(context)
  const box2 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64 564.8 33.4c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1L439.6 217.3c-13.9 4-28.8-1.9-36.2-14.3L320 64 236.6 203c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1L58.9 42.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6v167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5v-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6L318.9 128h2.2z" /></svg>
  return (
    // <>
    //   <div className="container py-5 h-100">
    //     <div className="row">
    //       <div className="col-md-8 col-lg-7 col-xl-6 p-5">
    //         <div className="d-flex align-items-center justify-content-center ">
    //           {/* <i class="fa-solid fa-box-open fa-beat fa-2xl"></i> */}
    //           {/* <img src={box} alt="box" /> */}
    //           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64 564.8 33.4c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1L439.6 217.3c-13.9 4-28.8-1.9-36.2-14.3L320 64 236.6 203c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1L58.9 42.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6v167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5v-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6L318.9 128h2.2z"/></svg>
    //         </div>
    //       </div>
    //       <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
    //         <div className="d-flex align-items-center justify-content-center p-5">


    //           <div className="text-center">
    //             <h1 className="display-1 fw-bold">Let's Move To</h1>


    //             <p className=" display-1 fw-bold"> <span className="text-danger"> Original</span> </p>
    //             <p className="lead fw-bold">
    //               Is Your Product Legitimate
    //             </p>
    //             {localStorage.getItem("status") ? <Link to={"/login/manufacturerLogin"} className="  btn btn-primary">Go Home</Link> : <Link to={"/login/manufacturerLogin"} className=" d-none btn btn-primary">Go Home</Link>
    //             }
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <div className="container py-5 h-100">
      <div className="row">
        <div className="col-md-8 col-lg-7 col-xl-6 p-5">
          <div className="d-flex align-items-center justify-content-center">
            <svg
              style={{ maxWidth: "100%" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              width="100%"
              height="100%"
              className="text-primary"
            >
              <path d="M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64 564.8 33.4c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1L439.6 217.3c-13.9 4-28.8-1.9-36.2-14.3L320 64 236.6 203c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1L58.9 42.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6v167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5v-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6L318.9 128h2.2z" />
            </svg>
          </div>
        </div>
        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <div className="d-flex align-items-center justify-content-center p-5">
            <div className="text-center">
              <h1 className="display-1 fw-bold">Let's Move To</h1>
              <p className=" display-1 fw-bold">
                <span className="text-danger"> Original</span>
              </p>
              <p className="lead fw-bold">Is Your Product Legitimate</p>
              {localStorage.getItem("status") === null ? (
                <Link to={"/"} className="d-none btn btn-primary">
                  Go Home
                </Link>
              ) : localStorage.getItem("ids") === "M" ? (
                <Link to={"/login/manufacturerLogin"} className=" btn btn-primary">
                  Go Home
                </Link>
              ) : (<Link to={"/login/sellerLogin"} className=" btn btn-primary">
                Go Home
              </Link>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home