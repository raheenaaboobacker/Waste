import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminNav from '../../Components/AdminNav'
import { useNavigate } from 'react-router-dom'
import Footer from '../../Components/Footer'
import moment from 'moment'
import { border } from '@mui/system'

function MonthlyReport() {
  const[month,setMonth]=useState({searchTerm:moment().format('YYYY-MM')})
  const [result,setResult]=useState("")
    const [arrOfData, setArrOfData] = useState([])
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem("token"))
    console.log(token);
    useEffect(() => {
        if (!token) {
          navigate("/login")
        } else {
          console.log(month);
          axios.get('http://localhost:5000/waste/user-payment')
            .then((response) => {
              console.log("USERS PAYMENTS======", response);
              if (response.data.success == true) {
                setArrOfData(response.data.Userdetails)
                console.log(arrOfData);
                setResult(arrOfData.filter(o => moment(o?.wasteData?.date).format('YYYY-MM').includes(month.searchTerm)))
                console.log(result);
              }
            })
            .catch((error) => {
              console.log(error);
    
            });
        }
      }, [])
      // useEffect(() => {
      //   setResult(arrOfData.filter(o => moment(o?.wasteData?.date).format('YYYY-MM').includes(month.searchTerm)))
      //           console.log(result);
      // }, [month,result])
      
      const handleInputChange=(e)=>
      {
        console.log(e.target.value);
       
        setMonth({ searchTerm: e.target.value})
        console.log(month);
      
      }
     
   
   
  return (
    <div>
         <AdminNav />
<div id="head1" style={{width:"15%",float:"right",marginTop:"15px"}}>
      <h4>select month</h4> 
      <input type="month" id="start"  name="month" placeholder='select date'
        value={month.searchTerm}
       min="2022-03" onChange={handleInputChange}></input>
       {/* <select id='gMonth1' style={{border:"none",backgroundColor:"#ddd"}}
        name="month"
        value={month} required
        onChange={handleInputChange}>
      <option value=''>--Select Month--</option>
        {monthdata.map((item,i)=>(
            <option value={item} >{item}</option>
  
        ))}
    </select>  */}
    </div> 
      <main className="hoc container clear">
<div class="divmonthlyreport">
          <h2>Monthly Report </h2>
          <ul class="responsive-table">
            <li class="table-header">
              <div class="col col-2"> Name</div>
              <div class="col col-2">Waste</div>
              <div class="col col-1">Quantity</div>
              <div class="col col-2">Date</div>
              <div class="col col-1">Payment status</div>
              <div class="col col-2"> Waste status</div>
            </li>
            {arrOfData.filter(o => moment(o?.wasteData?.date).format('YYYY-MM').includes(month.searchTerm)).map(((item, i) => 
         (<li class="table-row" style={{ fontSize: 15 }}>
    
          <div class="col col-2" data-label="Name">{item?.username}</div>
          <div class="col col-2" data-label="type">{item?.wasteData?.type}</div>
          <div class="col col-1" data-label="quantity">{item?.wasteData?.quantity}</div>
          <div class="col col-2" data-label="date">{moment(item?.wasteData?.date).format('YYYY-MM-DD')} </div>
          <div class="col col-1" data-label="payment">{item?.wasteData?.payment==0?<>Not Pay</>:<>payed</>}</div>
          <div class="col col-2" data-label="amount">{item?.wasteData?.status==0?<>Not Collected</>:item?.wasteData?.status==1?<>Collected</>:<>Recycled</>}</div>
        </li>)
      ))}

          </ul>
        </div>
        
      </main>
      <Footer /> 
    </div>
  )
}

export default MonthlyReport