import React from 'react'
import Footer from '../../Components/Footer'
import HomeComp1 from '../../Components/HomeComp1'
import HomeNav from '../../Components/HomeNav'
import Services from '../../Components/Services'
import './Home.css'



function Register() {
  return (
    <div>
      <HomeNav />
      <HomeComp1 />
      <Services />
      <Footer />
    </div>
  )
}

export default Register