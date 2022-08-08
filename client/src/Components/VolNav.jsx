import React from 'react'
import { useNavigate } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

function VolNav(props) {
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
              <a href="/sent_to_recycle" className="nav-item nav-link ">  Recycle</a>
              {/* <a href="user_payment_summary"className="nav-item nav-link">Payment Summary</a> */}
              <a href="/volunteerdashboard#volrequest" className="nav-item nav-link"> <Badge badgeContent={props.data} color="error">
                <NotificationsIcon />
              </Badge></a>
              <a onClick={logout} href="/" className="nav-item nav-link"> Logout</a>

            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default VolNav