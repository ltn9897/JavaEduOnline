import React from "react";
import Footer from "../Layout/footer";
import axios from "axios";
import authHeader from "../../config/authHeader";
import validator from 'validator';
import {withRouter} from '../Auth/withRouter'
import {USER_INFO_API_BASE_URL } from "../../config/env";
import Success from "../../Alert/success";
import Error from "../../Alert/error";
import $ from "jquery";
import {imageRequest} from "../../actions/course";
import {connect} from 'react-redux';

class UserAdd extends React.Component {
    constructor(){
        super();
        this.state = {
            addUser: {  
                username:'',
                password:'',
                fullname: '',
                email: '',
                address: '',
                avatarImage:'',
                role:'ROLE_ADMIN'
                },
            error: {},
            isShow: false, 
            img:'',
            alert:'',
            ava:'',
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
  
    }

    handleSuccess = () => {
        $('#success').fadeIn('fast').delay(2000).fadeOut('slow');
		setTimeout(()=>{
			this.props.navigate('/users')
		},1000);
		
	} 

    handleError = () => {
        $('#error').fadeIn('fast').delay(2000).fadeOut('slow');
		
	} 

    validateFormData = () => {
        let isValid = true;

        const error = {}

        if(validator.isEmpty(this.state.addUser.username)){            
            error['username'] = 'The Username field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addUser.password)){            
            error['password'] = 'The Password field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addUser.fullname)){            
            error['fullname'] = 'The Fullname field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addUser.email)){            
            error['email'] = 'The Email field is required.';
            isValid = false;
        }
        else {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                if (!pattern.test(this.state.addUser.email)) {
                    isValid = false;
                    error["email"] = "Please enter valid email address.";
                }    
        }

        this.setState({
            error: error
        })

        return isValid;
    }

    handleInputChange = e => {   
        let formData = Object.assign({}, this.state.addUser); 
        if (e.target.files && e.target.files[0]) {
            if (e.target.accept=="image/*"){
                this.setState({
                    img: URL.createObjectURL(e.target.files[0])
                })
                formData[e.target.name] = 'http://localhost:8080/images/'+e.target.files[0].name
                this.setState({ava:e.target.files[0]})
            }
            
            this.setState({newDetail:formData});  
            console.log(formData)
        }
        else {   
        console.log(formData)
        formData[e.target.name] = e.target.value;        
        this.setState({addUser:formData});  
        console.log(formData)  
        }
    }

    handleSubmit = (addUser) => {
        if(this.validateFormData()){
            this.props.imageRequest(this.state.ava)
            axios.post(USER_INFO_API_BASE_URL + '/create', addUser , { headers: authHeader() }).then(res=>{
            // update state.staff.staffInfo
            //this.setState({addUser: res.data.data}) 
            this.setState({alert:res.data.message})
            if(res.data.message=='Success'){
                this.handleSuccess()
                
            }
            else {
                this.handleError()
               
            }
            this.setState({addUser: {  
                username:'',
                password:'',
                fullname: '',
                email: '',
                address: '',
                avatarImage:'',
                role:'ROLE_ADMIN'
                },})
            })
            Array.from(document.querySelectorAll('input')).forEach(input=>(input.value=""))

        }
    }

    showHide = () => {
        this.state.isShow?
            this.setState({
                isShow: false
            }):
            this.setState({
                isShow: true
            });
    }

    render() {
        return (
            <div className="wrapper">
                <div className="sa4d25">
                    <div className="container">			
                        		
                        <div className="col-lg-12">	
                            <h2 className="st_title"><i className='uil uil-user'></i> Create New Account</h2>
                        </div>			
                        <div  id="success" style={{display:"none"}}><Success name="Create Successful"/></div>
                        <div  id="error" style={{display:"none"}}><Error name={this.state.alert}/></div>
                        <div className="col-12">
                            <div className="step-content">
                                <div className="step-tab-panel step-tab-info active" id="tab_step1"> 
                                    <div className="tab-from-content">
                                        <div className="course__form">
                                            <div className="general_info10">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-12">		                                          
                                                        <div className="mt-30 lbel25">
                                                            <label>Role</label>
                                                                <div className="ui left icon input swdh19">
                                                                    <input className="prompt srch_explore" value='Admin' disabled name="role" data-purpose="edit-course-title" maxlength="60" id="main[title]" />															
                                                               </div>
                                                        </div>		
                                                    </div>
                                                    <div className="col-lg-12 col-md-12">						
                                                        <div className="ui search focus mt-30 lbel25">
                                                            <label>Username</label>
                                                            <div className="ui left icon input swdh19">
                                                                <input className="prompt srch_explore" type="text" placeholder="Username here" name="username" data-purpose="edit-course-title" maxlength="60" id="main[title]" onChange={this.handleInputChange}/>															
                                                                
                                                            </div>
                                                            {this.state.error.username && <div className="validation alert alert-warning">{this.state.error.username}</div>}
                                                            <div className="help-block">(Please make this a maximum of 100 characters and unique.)</div>
                                                        </div>									
                                                    </div>
                                                    <div className="col-lg-12 col-md-12">						
                                                        <div className="ui search focus mt-30 lbel25">
                                                            <label>Password</label>
                                                            <div className="ui left icon input swdh19">
                                                                <input className="prompt srch_explore" type={this.state.isShow?'text':'password'} placeholder="Password here" name="password" data-purpose="edit-course-title" maxlength="60" id="main[title]" onChange={this.handleInputChange}/>															    
                                                                <div style={{margin: 'auto'}}>
                                                                    {this.state.isShow?<i className="fa fa-fw fa-eye-slash" id="togglePassword" style={{marginLeft: '-40px', cursor: 'pointer'}} onClick={this.showHide}/>
                                                                    :<i className="fa fa-fw fa-eye"id="togglePassword" style={{marginLeft: '-40px', cursor: 'pointer'}} onClick={this.showHide} /> }
                                                                </div>	
                                                            </div>
                                                            {this.state.error.password && <div className="validation alert alert-warning">{this.state.error.password}</div>}
                                                            <div className="help-block">(Please make this a maximum of 100 characters and unique.)</div>
                                                        </div>									
                                                    </div>
                                                    <div className="col-lg-12 col-md-12">		
                                                                                                        
                                                        <div className="ui search focus mt-30 lbel25">
                                                            
                                                            <label>Full Name</label>
                                                            <div className="ui left icon input swdh19">
                                                                <input className="prompt srch_explore" type="text" placeholder="Fullname here" name="fullname" data-purpose="edit-course-title" maxlength="60" id="main[title]" onChange={this.handleInputChange}/>															
                                                            </div>
                                                            {this.state.error.fullname && <div className="validation alert alert-warning">{this.state.error.fullname}</div>}
                                                            <div className="help-block">(Please make this a maximum of 100 characters and unique.)</div>
                                                        </div>									
                                                    </div>
                                                    <div className="col-lg-12 col-md-12">		
                                                                                                        
                                                        <div className="ui search focus mt-30 lbel25">
                                                            
                                                            <label>Email</label>
                                                            <div className="ui left icon input swdh19">
                                                                <input className="prompt srch_explore" type="text" placeholder="Email here" name="email" data-purpose="edit-course-title" maxlength="60" id="main[title]" onChange={this.handleInputChange}/>															
                                                            </div>
                                                            {this.state.error.email && <div className="validation alert alert-warning">{this.state.error.email}</div>}
                                                            <div className="help-block">(Please make this a maximum of 100 characters and unique.)</div>
                                                        </div>									
                                                    </div>
                                                    <div className="col-lg-12 col-md-12">		
                                                                                                        
                                                        <div className="ui search focus mt-30 lbel25">
                                                            
                                                            <label>Address</label>
                                                            <div className="ui left icon input swdh19">
                                                                <input className="prompt srch_explore" type="text" placeholder="Address here" name="address" data-purpose="edit-course-title" maxlength="60" id="main[title]" onChange={this.handleInputChange}/>															
                                                                
                                                            </div>
                                                            <div className="help-block">(Please make this a maximum of 100 characters and unique.)</div>
                                                        </div>									
                                                    </div>
                                                    
                                                    <div className="col-lg-6">
                                                        <div className="ui focus mt-30 ">
                                                            <div className="thumb-item">
                                                                {this.state.img?
                                                                    <img src={this.state.img} style={{width:"80px", paddingTop:"20px"}} alt=""/>
                                                                    :''
                                                                }
                                                                <div className="thumb-dt">													
                                                                    <div className="upload-btn" >													
                                                                        <input className="uploadBtn-main-input" id="myInput" type="file" name="avatarImage" onChange={this.handleInputChange} accept="image/*" />
                                                                        <label htmlFor="myInput" >Choose New Avatar</label>
                                                                    </div>
                                                                    <span className="uploadBtn-main-file">Size: 590x300 pixels. Supports: jpg,jpeg, or png</span>
                                                                </div>
                                                            </div> 
                                                        </div>
                                                    </div>
                                                                                                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="step-tab-panel step-tab-location" id="tab_step5">
                                    <div className="tab-from-content">
                                        <div className="title-icon">
                                            <button className="save_btn" type="button" value={'Add'} onClick={()=>this.handleSubmit(this.state.addUser)} ><h3 className="title"><i className="uil uil-upload"></i>Submit</h3></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
	        </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        img: state.course.img
    }
}

const mapDispatchToProps = dispatch => {
    return {
        imageRequest:(e) => dispatch (imageRequest(e)),
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UserAdd));