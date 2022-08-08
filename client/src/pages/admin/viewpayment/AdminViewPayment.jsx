import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminNav from '../../../Components/AdminNav'
import "./Viewpayment.css"
import Footer from '../../../Components/Footer'
import { useNavigate } from 'react-router-dom'

function AdminViewPayment() {
  const [arrOfData, setArrOfData] = useState([])
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem("token"))
  console.log(token);
  useEffect(() => {
    if (!token) {
      navigate("/login")
    } {
      const url = "http://localhost:5000/waste/paymentdetails"

      axios.get(url)
        .then((response) => {
          console.log("USERS PAYMENTS======", response);


          if (response.data.success == true) {
            setArrOfData(response.data.Userdetails)


          }


        })
        .catch((error) => {
          console.log(error);

        });
    }
  }, [])

  const mapdata = arrOfData?.map(((item, i) => {
    return (<li class="table-row" style={{ fontSize: 15 }}>

      <div class="col col-2" data-label="Name">{item?.wasteData[0]?.name}</div>
      <div class="col col-4" data-label="Contact No">{item?.wasteData[0]?.phone}</div>
      <div class="col col-2" data-label="Flat no">{item?.wasteData[0]?.flatno}</div>
      <div class="col col-2" data-label="amount">{item?.amount}</div>
    </li>)
  }))
  return (
    <div>
      <AdminNav />
      <main className="hoc container clear">

        <div class="div2">
          <h2>Payment Details </h2>
          <ul class="responsive-table">
            <li class="table-header">
              <div class="col col-2"> Name</div>
              <div class="col col-4">Contact Number</div>
              <div class="col col-2">Flat No</div>
              <div class="col col-2"> Amount</div>
            </li>
            {mapdata}

          </ul>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AdminViewPayment