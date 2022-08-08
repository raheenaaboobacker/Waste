import React from 'react'
function HomeNav() {
  let url = "/#services";
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ padding: 20 }}>
        <div className="container-fluid">
          <a href="/" className="navbar-brand" style={{ fontSize: 25, fontWeight: "bold" }}>GOGREEN</a>
          <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto" style={{ fontSize: 15, fontWeight: "bolder" }}>
              <a href="/" className="nav-item nav-link ">Home</a>
              <a href={url} className="nav-item nav-link">Services</a>
              <a href="about" className="nav-item nav-link">About</a>
              {/* <a href="#" className="nav-item nav-link">Contact</a>             	 */}
              <a href="login" className="nav-item nav-link">Login</a>
              <a href="signup" className="nav-item nav-link">Register</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HomeNav