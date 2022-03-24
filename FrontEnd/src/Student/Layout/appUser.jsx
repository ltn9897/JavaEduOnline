import Header from "../../Admin/Layout/header"
import React from "react";
import MenuUser from "./menuUser";
import Login from "../../Admin/Auth/login";
import { BrowserRouter as Router, Route, Routes, Navigate, Redirect} from 'react-router-dom';
import MainUser from "./mainUser";
import Course from "../Course/course";
import HeaderGuest from "./headerGuest";
import CourseById from "../Course/courseById";
import CartInfo from "../Cart/cartInfo";
import Checkout from "../Payment/checkout";
import CourseLesson from "../Course/courseLesson";
import HeaderLearn from "../Layout/headerLearn";
import {connect} from "react-redux";
import ErrorPage from "./errorPage";
import Help from "./help";
import Profile from "../User/profile";
import ProfileEdit from "../User/profileEdit";
import ChangePassword from "../../Admin/Auth/changePassword";
import Signup from "../User/signup";
import SavedCourse from "../SavedCourse/savedCourse";
import CourseBySubCatalog from "../Course/courseBySubCatalog";
import Search from "../Course/search";
import Order from "../Payment/order";
import OrderDetail from "../Payment/orderDetail";
import About from "./about";
import Contact from "./contact";
import Privacy from "./privacy";
import Report from "./report";
import Enroll from "../Enroll/enroll";

const isLogin = localStorage.getItem("isLogin");


export const PrivateRoute = ({children}) => {
  
  if (isLogin) {
      
    return children
  }
  
  return <Navigate to="/" />
}

console.log(!(window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/learn')))
class AppUser extends React.Component {
    constructor(){
      super()
      
    }

    render() {
      return (
        <Router>
                  {isLogin? ( !(window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/learn') || window.location.pathname.startsWith('/signup') ) ? <Header/> : '') : (  (window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/signup')) ? '':<HeaderGuest/> )}
                  {!(window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/learn') || window.location.pathname.startsWith('/signup') ) ? <MenuUser/>:''}
                  {/* {window.location.pathname.startsWith('/learn')? <HeaderLearn/>:''} */}
              <Routes>    
                  <Route path ="/index" element = {<MainUser/>}/> 
                  <Route path ="/signup" element = {<Signup/>}/>
                  {!isLogin? <Route path ="/login" element = {<Login/>}/> :''}
                  <Route path ="/" element = {<MainUser/>}/>
                  <Route path ="/course" element = {<Course/>}/> 
                  <Route path="/course/:id" element ={<CourseById/>}></Route>
                  <Route path ="/cart" element = {<CartInfo/>}/> 
                  <Route path ="/checkout" element = {<PrivateRoute><Checkout/></PrivateRoute>}/> 
                  <Route path ="/orders" element = {<PrivateRoute><Order/></PrivateRoute>}/> 
                  <Route path ="/order/:id" element = {<PrivateRoute><OrderDetail/></PrivateRoute>}/> 
                  <Route path ="/learn/:id" element = {<PrivateRoute><CourseLesson/></PrivateRoute>}/>
                  <Route path ="/detail" element = {<PrivateRoute><Profile/></PrivateRoute>}/> 
                  <Route path ="/detail/:name" element = {<PrivateRoute><Profile/></PrivateRoute>}/> 
                  <Route path ="/edit-profile" element = {<PrivateRoute><ProfileEdit/></PrivateRoute>}/> 
                  <Route path="/change-password" element = {<PrivateRoute><ChangePassword/></PrivateRoute>}/>
                  <Route path ="/saved-course" element = {<PrivateRoute><SavedCourse/></PrivateRoute>}/> 
                  <Route path ="/enroll-course" element = {<PrivateRoute><Enroll/></PrivateRoute>}/> 
                  <Route path ="/help" element = {<Help/>}/> 
                  <Route path="/courses/:name/:id" element ={<CourseBySubCatalog/>}></Route>
                  <Route path="/search/:name" element ={<Search/>}></Route>
                  <Route path="/search" element ={<Search/>}></Route>
                  <Route path="/about" element ={<About/>}></Route>
                  <Route path="/privacy" element ={<Privacy/>}></Route>
                  <Route path="/contact" element ={<Contact/>}></Route>
                  <Route path="/report" element ={<Report/>}></Route>
                  <Route path ="*" element = {<ErrorPage/>}/> 
              </Routes>  
          </Router>
      );
    }
}

const mapStateToProps = state => {
  return {
      auth: state.auth.token,
  }
}

export default connect(mapStateToProps,null)(AppUser)

