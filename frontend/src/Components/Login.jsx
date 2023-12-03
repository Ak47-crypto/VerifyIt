import React,{useContext,useRef, useState} from 'react'
import {  Link,useNavigate } from 'react-router-dom'
import context from '../context/SiteContext'
import '../css/opacity.css'
function Login() {
  const {connection}=useContext(context)
  const [fadeIN1,setFadeIn1]=useState();
  const [fadeIN2,setFadeIn2]=useState();
  const [fadeIN3,setFadeIn3]=useState();
  const ref=useRef();
  const styles={
    divHeight:{minHeight:"calc(100vh - 152px)"},
    box: {
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#f8f9fa"
  }

  }
  // const handleMouseOver = () => {
  //   // Change the opacity when the mouse is over the element
  //   if (ref.current) {
  //     ref.current.style.opacity = "1";
  //   }
  // };
  const navigate=useNavigate();
  if(localStorage.getItem('status')||connection)
  {navigate("/login/manufacturerLogin")}
  else
  return (
    <div className="container my-3" style={styles.divHeight} >
        <div className="row ">
  <div className="col-md-8 col-lg-7 col-xl-6 my-3" >
    <div ref={ref} className={` card ${fadeIN1?'fadein':'fadeout'} `}  onMouseOver={()=>setFadeIn1(true)} onMouseLeave={()=>setFadeIn1(false)} style={styles.box}>
      <div className="card-body">
        <h5 className="card-title">Manufacturing Login</h5>
        <p className="card-text">Got something to sell</p>
        <Link to={'/login/manufacturerLogin'} className="btn btn-primary">Login</Link>
      </div>
    </div>
  </div>
  <div className="col-md-8 col-lg-7 col-xl-6 my-3">
    <div ref={ref} className={`  card ${fadeIN2?'fadein':'fadeout'} `}  onMouseOver={()=>setFadeIn2(true)} onMouseLeave={()=>setFadeIn2(false)} style={styles.box}>
      <div className="card-body">
        <h5 className="card-title">Seller Login</h5>
        <p className="card-text">Got something to Deliver</p>
        <Link to={'/login/sellerLogin'} className="btn btn-primary">Login</Link>
      </div>
    </div>
  </div>
  <div  className="col-md-8 col-lg-7 col-xl-6 my-3"  >
    <div ref={ref} className={`  card ${fadeIN3?'fadein':'fadeout'} `}  onMouseOver={()=>setFadeIn3(true)} onMouseLeave={()=>setFadeIn3(false)} style={styles.box}>
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