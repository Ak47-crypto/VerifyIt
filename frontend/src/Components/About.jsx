import React from 'react'
import '../css/About.css'
function About() {
    let cssStyle={
        // display:"flex",
        // flexDirection:"column",
        // justifyContent:"center",
        // alignItems:"center"  
    }
    return (
        
        <>
            
                {/* <div style={cssStyle}>
                    <h1>About</h1>
                </div> */}
                 <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="about-content">
            <h2 className="text-primary">About Us</h2>
            <p>
              Welcome to our platform dedicated to Fake Product Detection using Blockchain.
            </p>
            <p>
              In today's world, counterfeit products are a serious issue affecting both consumers and businesses.
              Our mission is to leverage the power of blockchain technology to combat this problem.
            </p>
            <p>
              Through the use of decentralized and transparent ledgers, we aim to provide a reliable solution for
              verifying the authenticity of products, ensuring that consumers receive genuine items.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="approach-content bg-light p-4">
            <h2 className="text-success">Our Approach</h2>
            <p>
              We utilize blockchain to create an immutable record of product information, from manufacturing to distribution.
              This ledger ensures that each step in the supply chain is recorded and can be verified by stakeholders.
            </p>
            <p>
              Our platform enables users to easily check the authenticity of products by scanning QR codes or entering
              product details. This ensures a seamless and trustworthy experience for consumers.
            </p>
          </div>
        </div>
      </div>
    </div>
            {/* profile */}

            <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-sm-8 col-lg-6">
            {/* <!-- Section Heading--> */}
            <div class=" m-3 section_heading text-center wow fadeInUp" data-wow-delay="0.2s" style={{visibility: "visible", animationDelay: "0.2s", animationName: "fadeInUp"}}>
              <h2 className='text-primary'>Our Creative <span> Team</span></h2>
              
              <div class="line"></div>
            </div>
          </div>
        </div>
        <div class="row">
          {/* <!-- Single Advisor--> */}
          <div class="col-12 col-sm-6 col-lg-3">
            <div class="single_advisor_profile wow fadeInUp" data-wow-delay="0.2s" style={{visibility: "visible", animationDelay: "0.2s", animationName: "fadeInUp"}}>
              {/* <!-- Team Thumb--> */}
              <div class="advisor_thumb"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""/>
                {/* <!-- Social Info--> */}
                <div class="social-info"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-linkedin"></i></a></div>
              </div>
              {/* <!-- Team Details--> */}
              <div class="single_advisor_details_info">
                <h6>Ankur Kumar</h6>
                <p class="designation">Founder &amp; CEO</p>
              </div>
            </div>
          </div>
          {/* <!-- Single Advisor--> */}
          <div class="col-12 col-sm-6 col-lg-3">
            <div class="single_advisor_profile wow fadeInUp" data-wow-delay="0.3s" style={{visibility: "visible", animationDelay: "0.2s", animationName: "fadeInUp"}}>
              {/* <!-- Team Thumb--> */}
              <div class="advisor_thumb"><img src="https://bootdey.com/img/Content/avatar/avatar8.png" alt=""/>
                {/* <!-- Social Info--> */}
                <div class="social-info"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-linkedin"></i></a></div>
              </div>
              {/* <!-- Team Details--> */}
              <div class="single_advisor_details_info">
                <h6>Rajya Lakshmi</h6>
                <p class="designation">UI/UX Designer &amp; Block Chain Expert</p>
              </div>
            </div>
          </div>
          {/* <!-- Single Advisor--> */}
          <div class="col-12 col-sm-6 col-lg-3">
            <div class="single_advisor_profile wow fadeInUp" data-wow-delay="0.4s" style={{visibility: "visible", animationDelay: "0.2s", animationName: "fadeInUp"}}>
              {/* <!-- Team Thumb-->   */}
              <div class="advisor_thumb"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""/>
                {/* <!-- Social Info--> */}
                <div class="social-info"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-linkedin"></i></a></div>
              </div>
              {/* <!-- Team Details--> */}
              <div class="single_advisor_details_info">
                <h6>Rani Pal</h6>
                <p class="designation">Frontend Developer</p>
              </div>
            </div>
          </div>
          {/* <!-- Single Advisor--> */}
          <div class="col-12 col-sm-6 col-lg-3">
            <div class="single_advisor_profile wow fadeInUp" data-wow-delay="0.5s" style={{visibility: "visible", animationDelay: "0.2s", animationName: "fadeInUp"}}>
              {/* <!-- Team Thumb--> */}
              <div class="advisor_thumb"><img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt=""/>
                {/* <!-- Social Info--> */}
                <div class="social-info"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-linkedin"></i></a></div>
              </div>
              {/* <!-- Team Details--> */}
              <div class="single_advisor_details_info">
                <h6>Anant Saraswat</h6>
                <p class="designation">Marketing Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}

export default About