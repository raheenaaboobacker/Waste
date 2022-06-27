import './App.css';
import Login from './pages/login/Login';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Admindashboard from './pages/admin/Admindashboard';
import Admin_manage_users from './pages/admin/Admin_manage_users';
import Admin_manage_volunteer from './pages/admin/Admin_manage_volunteer';
import UserDashboardd from './pages/user/UserDashboardd';
import UserAddRequest from './pages/user/UserAddRequest';
import UserPaymentSummery from './pages/user/UserPaymentSummery';
import UserPayment from './pages/user/userpayment/UserPayment';
import VolunteerDashboard from './pages/volunteer/VolunteerDashboard';
import UserComplaints from './pages/user/UserComplaints';
import AdminviewComplaints from './pages/admin/AdminviewComplaints';
import AdminViewPayment from './pages/admin/viewpayment/AdminViewPayment';
import AdminViewRequests from './pages/admin/AdminViewRequests';
import Torecycle from './pages/volunteer/Torecycle';
import About from './pages/About';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admindashboard' element={<Admindashboard/>}/>
          <Route path='/admin_manage_users' element={<Admin_manage_users/>}/>
          <Route path='/admin_manage_volunteer' element={<Admin_manage_volunteer/>}/>
          <Route path='/userdashboard' element={<UserDashboardd/>}/>
          <Route path='/user_add_request' element={<UserAddRequest />}/>
          <Route path='/user_payment/:waste/:quantity' element={<UserPayment />}/>
          <Route path='/volunteerDashboard' element={<VolunteerDashboard/>}/>
          <Route path='/user_payment_summary' element={<UserPaymentSummery/>}/>
          <Route path='/usercomplaints' element={<UserComplaints/>}/>
          <Route path='/admin_view_complaint' element={<AdminviewComplaints/>}/>
          <Route path='/admin_payment_summery' element={<AdminViewPayment/>}/>
          <Route path="/adminviewrequest" element={<AdminViewRequests/>}/>
          <Route path="/sent_to_recycle" element={<Torecycle/>}/>
          <Route path="/about" element={<About/>}/>
          </Routes>
        </BrowserRouter>
   </div>
  );
}

export default App;
