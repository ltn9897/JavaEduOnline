import Header from "../Layout/header"
import React from "react";
import Menu from "../Layout/menu";
import UserInfo from "../User/userInfor";
import UserAdd from "../User/userAdd";
import Login from "../Auth/login";
import CourseInfo from "../Courses/courseInfo";
import { BrowserRouter as Router, Route, Routes, Navigate, Redirect} from 'react-router-dom';
import CourseAdd from "../Courses/courseAdd";
import DashBoard from "../Dashboard/dashBoard";
import {login, logout} from "../../actions/auth"
import {connect} from "react-redux"
import Error from "../Layout/error";
import Detail from "../Profile/detail"
import DetailUpdate from "../Profile/detailUpdate";
import Category from "../Category/category"
import CatalogAdd from "../Category/catalogAdd";
import ChangePassword from "../Auth/changePassword";
import DetailUser from "../User/detailUser";
import ErrorPage from "../../Student/Layout/errorPage";
import EditUser from "../User/editUser"
import CourseDetail from "../Courses/courseDetail";
import CourseEdit from "../Courses/courseEdit";
import Order from "../Payment/order";
import OrderDetail from "../Payment/orderDetail";
import CourseStatus from "../Courses/courseStatus";
import Signup from "../../Student/User/signup";
import Privacy from "./privacy";
import HeaderGuest from "../../Student/Layout/headerGuest";

const isLogin = localStorage.getItem("isLogin");

export const PrivateRoute = ({children}) => {
  
  if (isLogin) {
      
    return children
  }
  
  return <Navigate to="/" />
}

class AppAdmin extends React.Component {
  render() {
      return (
        <Router>
                {isLogin? ( !(window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/learn') || window.location.pathname.startsWith('/signup') ) ? <Header/> : '') : (  (window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/signup')) ? '':<HeaderGuest/> )}
                {!(window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/learn') || window.location.pathname.startsWith('/signup') ) ? <Menu/>:''}
                
            <Routes>    
                <Route path ="/index" element = {<PrivateRoute><DashBoard/></PrivateRoute>}/> 
                {!isLogin? <Route path ="/login" element = {<Login/>}/> :''}
                <Route path ="/" element = {<PrivateRoute><DashBoard/></PrivateRoute>}/>
                <Route path ="/dashboard" element = {<PrivateRoute><DashBoard/></PrivateRoute>}/> 
                {!isLogin?<Route path ="/" element = {<Login/>}/>:<Route path ="/" element = {<PrivateRoute><DashBoard/></PrivateRoute>}/>}
                <Route path="/users" element={<PrivateRoute><UserInfo/></PrivateRoute>}/>
                <Route path="/user/:id" element={<PrivateRoute><DetailUser/></PrivateRoute>}/>
                <Route path="/edit-user/:id" element={<PrivateRoute><EditUser/></PrivateRoute>}/>
                <Route path ="/add-user" element = {<PrivateRoute><UserAdd/></PrivateRoute>}/> 
                <Route path ="/category" element = {<PrivateRoute><Category/></PrivateRoute>}/>
                <Route path="/add-catalog" element = {<PrivateRoute><CatalogAdd/></PrivateRoute>}/>
                <Route path ="/courses" element = {<PrivateRoute><CourseInfo/></PrivateRoute>}/>
                <Route path ="/course/:id" element = {<PrivateRoute><CourseDetail/></PrivateRoute>}/>
                <Route path ="/edit-course/:id" element = {<PrivateRoute><CourseEdit/></PrivateRoute>}/>
                <Route path ="/status-course/:id" element = {<PrivateRoute><CourseStatus/></PrivateRoute>}/>
                <Route path="/add-course" element = {<PrivateRoute><CourseAdd/></PrivateRoute>}/>
                <Route path="/detail" element = {<PrivateRoute><Detail/></PrivateRoute>}/>
                <Route path="/detail-update" element = {<PrivateRoute><DetailUpdate/></PrivateRoute>}/>
                <Route path="/orders" element = {<PrivateRoute><Order/></PrivateRoute>}/>
                <Route path="/order/:id" element = {<PrivateRoute><OrderDetail/></PrivateRoute>}/>
                <Route path="/change-password" element = {<PrivateRoute><ChangePassword/></PrivateRoute>}/>
                <Route path ="/signup" element = {<Signup />}/> 
                <Route path ="/privacy" element = {<Privacy />}/> 
                <Route path ="*" element = {<ErrorPage/>}/> 
            </Routes>  
        </Router>
      );
    }
}

const mapStateToProps = state => {
  return {
      auth: state.auth.token
  }
}

export default connect(mapStateToProps)(AppAdmin)
