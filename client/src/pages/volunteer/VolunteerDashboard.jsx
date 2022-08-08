import axios from 'axios'
import React, { useEffect, useState } from 'react'
import VolNav from '../../Components/VolNav'
import HomeComp1 from '../../Components/HomeComp1'
import { Card, Row } from 'react-bootstrap'
import Footer from '../../Components/Footer'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import moment from 'moment'


function VolunteerDashboard() {
  const [tprice, setTprice] = useState("")
  const [arrOfData, setArrOfData] = useState([])
  const [message, setMessage] = useState([])
  const [wastedata, setWastedata] = useState({
    login_id: "",
    waste_id: "",
  })
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [requests, setRequests] = useState("")
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem("token"))
  console.log(token);
  let count = 0;
  useEffect(() => {
    if (!token) {
      navigate("/login")
    } {
      axios.get("http://localhost:5000/volunteers/getRequestcount")
        .then((response) => {
          console.log("waste PAYMENTS======", response.data.data);
          count = response.data.data.length;
          console.log(count);
          setRequests(count)

        })
    }
  }, [])

  useEffect(() => {
    axios.get('http://localhost:5000/waste/user-payment')
      .then((response) => {
        console.log("USERS PAYMENTS======", response);
        if (response.data.success == true) {
          setArrOfData(response.data.Userdetails)
          console.log(arrOfData);

        }
      })
      .catch((error) => {
        console.log(error);

      });

  }, [message])

  const AcceptRequest = (id) => {
    console.log(id);
    const url = "http://localhost:5000/volunteers/accept-request/" + id

    console.log("url", url)

    axios.get(url)
      .then((response) => {
        console.log("REQUEST======", response);


        if (response.data.success == true) {
          setMessage(response.data.message)

          alert("accepted")


        }
      })
  }
  const AcceptRequestpay = (id, quantity, type, userId) => {
    console.log(id, quantity, type);
    setWastedata({ waste_id: id, login_id: userId });
    console.log(wastedata);
    if (type === "bio-waste" || type === "plastic") {
      if (quantity === "low") {
        console.log("price===", "30")
        setTprice("30")
        console.log(tprice);
      }
      else if (quantity === "medium") {
        console.log("price===", "60")
        setTprice("60")
        console.log(tprice);
      }

      else if (quantity === "high") {
        console.log("price===", "90")
        setTprice("90")
        console.log(tprice);
      }
    } else {
      if (quantity === "low") {
        console.log("price===", "60")
        setTprice("60")
        console.log(tprice);
      }
      else if (quantity === "medium") {
        console.log("price===", "90")
        setTprice("90")
        console.log(tprice);
      }

      else if (quantity === "high") {
        console.log("price===", "120")
        setTprice("120")
        console.log(tprice);
      }
    }

    handleShow()
  }
  const payWaste = () => {
    const params = {
      login_id: wastedata.login_id,
      waste_id: wastedata.waste_id,
      amount: tprice,

    }

    axios.post("http://localhost:5000/waste/addpayment", params)
      .then((response) => {
        console.log("REQUEST======", response);


        if (response.data.success == true) {
          setMessage(response.data.message)

          alert("accepted")

          handleClose();
        }
      })
  }
  const SendRecycle = (id) => {
    console.log(id);
    const url = "http://localhost:5000/volunteers/sent-recycle/" + id

    console.log("url", url)

    axios.get(url)
      .then((response) => {
        console.log("REQUEST======", response);


        if (response.data.success == true) {
          setMessage(response.data.message)

          alert("send to recycle")


        }
      })
  }
  return (
    <div>
      <VolNav data={requests} />
      <HomeComp1 />
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="hero-cap text-center">
              <h2 style={{ color: 'black' }}>Requests</h2>
            </div>
          </div>
        </div>
      </div>
      <main className="hoc container clear" id='volrequest' style={{ marginTop: -150 }}>
        <Row>

          {arrOfData?.sort((a, b) =>
            a?.wasteData?.status > b?.wasteData?.status ? 1 : -1
          ).map(item => <>{item?.wasteData?.status == 2 ? null : <Card style={{
            width: "300px", height: "220px", display: 'flex', marginLeft: "40px", marginTop: 50,
            boxShadow: "2px 5px 5px 5px"
          }} >
            <Card.Body>
              {/* minWidth: '18rem', flexGrow: 1, margin:'1rem', minHeight:'32rem' */}
              <h4 class="card-title">Name:{item?.username}</h4>

              <h6 >Waste type :{item?.wasteData?.type} </h6>
              <h6 class="card-title" >Quantity :{item?.wasteData?.quantity} </h6>
              <h6 class="card-title" >Requsted date :{moment(item?.wasteData?.date).format('YYYY-MM-DD')} </h6>

              {item?.wasteData?.status == 0 ? <>{item?.wasteData?.payment == 0 ? <a onClick={() => AcceptRequestpay(item?.wasteData?._id, item?.wasteData?.quantity, item?.wasteData?.type, item?._id)} class="btn" style={{}}>Accept Request & Pay</a> :
                <a onClick={() => AcceptRequest(item?.wasteData?._id)} class="btn" style={{}}>Accept Request</a>}
              </> :
             <a onClick={() => SendRecycle(item?.wasteData?._id)} class="btn" style={{}}>Sent To Recycle</a> 
                  
              }

            </Card.Body>
          </Card>}
          </>




          )}
        </Row>
      </main>
      <Footer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>{userDataReg.waste}</h4>
        <h5>{userDataReg.quantity}</h5> */}
          <h4> Pay ₹{tprice}</h4>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-blue w-100 text-center" onClick={payWaste}>
            Pay
          </button>

        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default VolunteerDashboard