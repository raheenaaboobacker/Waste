import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminNav from '../../Components/AdminNav'
import { useNavigate } from 'react-router-dom'

import { Col, Card, Row } from 'react-bootstrap'
import Footer from '../../Components/Footer'


function Admin_manage_volunteer() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState([])
  const [token, setToken] = useState(localStorage.getItem("token"))
  console.log(token);
  useEffect(() => {
    if (!token) {
      navigate("/login")
    } else {
      axios.get("http://localhost:5000/admin/getvolunteerdata")
        .then((response) => {
          console.log(response.data.details);
          if (response.data.success == true) {
            setUsers(response.data.details)
          }
          console.log("userdata", JSON.stringify(users));
        }).catch((error) => {
          console.log(error);

        });
    }
  }, [message])
  const DeleteUser = (id) => {
    console.log(id);
    axios.delete(`http://localhost:5000/admin/deleteVolunteer/${id}`)
      .then((response) => {
        setMessage(response.data.message)
        alert(response.data.message)

      })
      .catch((error) => {
        console.log(error);

      });
  }
  const ApproveUser = (id) => {
    console.log(id);
    axios.post(`http://localhost:5000/admin/approveusers/${id}`)
      .then((response) => {
        if (response.data.success == true) {
          setMessage(response.data.message)

          alert(response.data.message)



        }
      })
      .catch((error) => {
        console.log(error);

      });
  }
  return (
    <div>
      <AdminNav />
      <div className="slider-area ">

        <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA1HRTPXtgqnTI6OKRA-KFIrhlC0IH3ZscVg&usqp=CAU" + ")", backgroundRepeat: "none", backgroundSize: "cover" }} >
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2 style={{ color: 'white' }}>Manage Volunteers</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="hoc container clear">
        <Row>
          {users.map((item, i) => (

            <Card style={{ width: "300px", height: "250px", display: 'flex', marginLeft: 50, marginTop: 50, boxShadow: "2px 5px 5px 5px" }} >
              <Card.Body>
                <h4 className="card-title" key={i}>Name : {item?.username}</h4>
                <p className="card-title" key={i}>Contact : {item?.registerdetails[0]?.phone}</p>
                <p className="card-text" key={i}>Email : {item?.registerdetails[0]?.email}</p>
                <p className="card-text" key={i}>Address : {item?.registerdetails[0]?.address}</p> 
                <a onClick={() => DeleteUser(item._id)} class="btn" style={{ marginTop: 5 }}>Delete</a>

                {item.status === 0 ?
                  <> <a onClick={() => ApproveUser(item._id)} class="btn" style={{ marginTop: 5 }}
                  >
                    Approve</a></> :
                  null}
              </Card.Body>
            </Card>
          ))}
        </Row>
      </main>
      <Footer />
    </div>
  )
}

export default Admin_manage_volunteer