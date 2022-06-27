import React from 'react'
import Footer from '../Components/Footer'
import HomeComp1 from '../Components/HomeComp1'
import HomeNav from '../Components/HomeNav'

function About() {
  return (
    <div>
      <HomeNav/>
      <HomeComp1/>
        <main className="hoc container clear"> 
   <div className="group btmspace-50 demo" id='aboutus'>
   <div className="one_half first"><img src='https://template65291.motopreview.com/mt-demo/65200/65291/mt-content/uploads/2017/11/mt-1238-home-img05.jpg'/></div>
   <div className="one_half" style={{padding:"50px"}}> <article>
      <h2  className="heading">Our Mission</h2>
      <p>We have invested in developing waste solutions for a changing world. Today, this includes not just disposal
         and recycling, but personal counseling to help customers achieve their green goals, including zero waste.</p><br/>
         <h3  className="heading">Environmental and Economic Sustainability</h3>
         <p>Our mission is to maximize 
          resource value while minimizing impact in order to further both economic and environmental sustainability for all of our stakeholders</p>
    </article></div>
    </div>
 </main>
 <Footer/>
    </div>
  )
}

export default About