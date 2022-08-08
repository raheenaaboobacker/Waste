import React from 'react'

function Footer() {
  return (
    <div><div className="wrapper row4">
      <footer id="footer" className="hoc clear">
        <h6 className="heading">GOGREEN</h6>
        <p>We’re the leading provider of comprehensive waste management services, providing services that range from collection and disposal to recycling and renewable energy generation.</p>
        <ul className="faico clear">
          <li><a className="faicon-facebook" href="javascript:void(0)"><i className="fa fa-facebook"></i></a></li>
          <li><a className="faicon-twitter" href="javascript:void(0)"><i className="fa fa-twitter"></i></a></li>
          <li><a className="faicon-dribble" href="javascript:void(0)"><i className="fa fa-dribbble"></i></a></li>
          <li><a className="faicon-linkedin" href="javascript:void(0)"><i className="fa fa-linkedin"></i></a></li>
          <li><a className="faicon-google-plus" href="javascript:void(0)"><i className="fa fa-google-plus"></i></a></li>
          <li><a className="faicon-vk" href="javascript:void(0)"><i className="fa fa-vk"></i></a></li>
        </ul>
        <nav>
          <ul className="nospace">
            <li><a href="#"><i className="fa fa-lg fa-home"></i></a></li>
            <li><a href="javascript:void(0)">About</a></li>
            <li><a href="javascript:void(0)">Contact</a></li>
            <li><a href="javascript:void(0)">Privacy</a></li>
            <li><a href="javascript:void(0)">Disclaimer</a></li>
            <li><a href="javascript:void(0)">Cookies</a></li>
          </ul>
        </nav>
      </footer>
    </div>

      <div className="wrapper row5">
        <div id="copyright" className="hoc clear">
          <p className="fl_left">Copyright &copy; 2016 - All Rights Reserved - <a href="#">Domain Name</a></p>
          <p className="fl_right">Template by <a target="_blank" href="http://www.os-templates.com/" title="Free Website Templates">OS Templates</a></p>
        </div>
      </div></div>
  )
}

export default Footer