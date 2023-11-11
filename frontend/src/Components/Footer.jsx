import React from 'react'

function Footer() {
  let styles={
    margin:"auto"
  }
  return (
    
        <footer style={{height:"20px",marginTop:"auto"}} className=" d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
        <svg className="bi" width="30" height="24"><use xlink:href="#bootstrap"/></svg>
      </a>
      <span className="text-muted">&copy; 2021 Company, Inc</span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
    <i className="fa-brands fa-facebook fa-2xl my-3"></i>
    <i className="fa-brands fa-x-twitter fa-2xl my-3 mx-3"></i>
    <i className="fa-brands fa-instagram fa-2xl my-3 me-2"></i>
    </ul>
  </footer>
    
  )
}

export default Footer