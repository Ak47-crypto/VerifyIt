import React from 'react'

function Footer() {
  let styles={
    margin:"auto"
  }
  return (
    
        <footer style={{height:"20px",marginTop:"auto",opacity:'1'}} className=" d-flex flex-wrap justify-content-between align-items-center py-3 my-4 ">
    <div className="col-md-4 d-flex align-items-center">
      
      <span className="text-muted mx-3"><strong><i>&copy; 2023 VerifyIt, Inc</i></strong></span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
    <i className="fa-brands fa-facebook fa-2xl my-3" style={{color:"black"}}></i>
    <i className="fa-brands fa-x-twitter fa-2xl my-3 mx-3" style={{color:"black"}}></i>
    <i className="fa-brands fa-instagram fa-2xl my-3 me-2" style={{color:"black"}}></i>
    </ul>
  </footer>
    
  )
}

export default Footer