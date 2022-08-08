import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminNav() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear();
    window.sessionStorage.clear();
    navigate('/')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ padding: 20 }}>
        <div className="container-fluid">
          <a href="" className="navbar-brand" style={{ fontSize: 25, fontWeight: "bold" }}>GOGREEN</a>
          <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto" style={{ fontSize: 15, fontWeight: "bolder" }}>

              <a href="admin_manage_volunteer" className="nav-item nav-link">Volunteer</a>
              <a href="admin_manage_users" className="nav-item nav-link">Users</a>
              {/* <a href="adminviewrequest" className="nav-item nav-link">Requests</a> */}
              <a href="monthlyreport" className="nav-item nav-link">Report</a>
              <a href="admin_payment_summery" className="nav-item nav-link">Payment</a>
              <a href="admin_view_complaint" className="nav-item nav-link">Complaints</a>
              <a onClick={logout} href="/" className="nav-item nav-link">Logout</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AdminNav