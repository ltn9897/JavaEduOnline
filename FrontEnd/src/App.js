import logo from "./logo.svg";
import "./App.css";
import React from "react";
import AppAdmin from "./Admin/Layout/appAdmin";
import AppUser from "./Student/Layout/appUser";

const AD = localStorage.getItem("role");
console.log(AD)
class App extends React.Component {
 
    render() {
      if(AD=="ROLE_ADMIN"){
        return (
          <AppAdmin/>)
      }
      else {
        return(
          <AppUser/>)
      }
    }
}

export default (App);
