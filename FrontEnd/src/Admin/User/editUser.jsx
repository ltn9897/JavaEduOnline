import React from "react";
import Footer from "../Layout/footer";
import authHeader from "../../config/authHeader";
import axios from "axios";
import {USER_INFO_API_BASE_URL} from "../../config/env";
import {connect} from 'react-redux';
import { getDetailInfo, updateDetail } from '../../actions/detail'
import validator from 'validator';
import {withRouterParams, withRouter} from "../Auth/withRouter";
import {getUserByIdRequest} from "../../actions/user";
import {Link} from "react-router-dom";
import Success from "../../Alert/success";
import Error from "../../Alert/error";
import $ from "jquery"
import {imageRequest} from "../../actions/course"

class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.params.id,
            
            newDetail:  {},
            error: '',
            
            updateSuccess: false,
            isShow: false, 
            alert:'',
            error:{},

            ava:'',
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
        
        
    }

    componentDidMount(){        
        this.props.getUserByIdRequest(this.state.id);
        // this.state.newDetail=tmp
    } 
    
    // validate = (form) => {
    //     let isValid = true;

    //     const error = {}

    //     if(form.fullname==null){            
    //         error['fullname'] = 'The field is required.';
    //         isValid = false;
    //     }

    //     this.setState({
    //         error: error
    //     })

    //     return isValid;
    // } 

    showHide = () => {
        this.state.isShow?
            this.setState({
                isShow: false
            }):
            this.setState({
                isShow: true
            });
    }

    handleInputChange= e => {  
        let formData = Object.assign({},this.state.newDetail);
        
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0])
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
        
        formData[e.target.name] = e.target.value;        
        this.setState({newDetail:formData});  
        console.log(formData)  
        }
    }
     
    validateEmail = () => {
        let isValid = true;

        const error = {}
        
        if (this.state.newDetail.email !== undefined) {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.newDetail.email)) {
                isValid = false;
                error["email"] = "Please enter valid email address.";
            }
        }    

        this.setState({
            error: error
        })

        return isValid;
    }

    updateDetail = (newDetail, id) => {
        if(this.validateEmail()){
        this.props.imageRequest(this.state.ava)
        console.log(this.state.ava)
        this.props.getUserByIdRequest(id);
        newDetail.role==null&&(
        this.props.userById.role.name == "ROLE_USER"? newDetail.role="ROLE_USER":newDetail.role="ROLE_ADMIN")
        let newForm = Object.assign(this.props.userById,newDetail);
        
            
        axios.post('http://localhost:8080/api/admin/user/update', newForm , { headers: authHeader() }).then(res=>{
            // update state.staff.staffInfo
            //this.props.getUserByIdRequest(res.data.data.id)
            // tmp={...res.data.data}
            // delete tmp.role
            // tmp.role= res.data.data.role.name
            // this.setState({newDetail: tmp})     
            this.setState({updateSuccess:true})
            if(res.data.message == "Success"){
                $('#success').fadeIn('fast').delay(2000).fadeOut('slow');
                setTimeout(()=>{
                    this.props.navigate('/user/'+id)
                },1500);
            }
            else {
                
                this.setState({alert:res.data.message})
                this.handleError()
            }
            })
        }
        this.setState({newDetail:{}})
          
    }



    handleError = () => {
        $('#error').fadeIn('fast').delay(2000).fadeOut('slow');
		
	} 

    render() {
        const {userById} = this.props
    
        return(
            
            <div className="wrapper">
                <div className="sa4d25">
                    <div className="container-fluid">			
                        <div className="row">
                            <div className="col-lg-12">
                                <h2 className="st_title"><i className='uil uil-cog'></i> Setting</h2>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-account" role="tabpanel" aria-labelledby="pills-account-tab">
                                        <div className="account_setting">
                                            <div  id="success" style={{display:"none"}}><Success name="Update Successful"/></div>
                                            <div  id="error" style={{display:"none"}}><Error name={this.state.alert}/></div>
                        
                                            <h4>Your Cursus Account</h4>
                                            <p>This is your public presence on Cursus. You need a account to upload your paid courses, comment on courses, purchased by students, or earning.</p>
                                            <form>
                                            <div className="basic_profile">
                                                <div className="basic_ptitle">
                                                    <h4>Basic Profile</h4>
                                                    <p>Add information about yourself</p>
                                                </div>
                                                {/* {user.role.name == "ROLE_USER"?
                                                <input className="prompt srch_explore" type="text" required="" disabled="true"  value="ROLE_USER" defaultValue="USER" name="role"/>													
                                                :<input className="prompt srch_explore" type="text" required="" disabled="true"  value="ROLE_ADMIN" defaultValue="ADMIN" name="role"/>	
                                                }												 */}
                                                
                                                
                                                <input className="prompt srch_explore" type="hidden" required="" disabled="true"  value={userById.id} name="id"/>													
                                                <div className="basic_form">
                                                    <div className="row">
                                                        <div className="col-lg-8">
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="ui search focus mt-30">
                                                                        <label>Username</label>
                                                                        <div className="ui left icon input swdh11 swdh19">
                                                                            <input className="prompt srch_explore" type="text" required="" name="username" disabled="true"  value={userById.username}/>															
                                                                        </div>
                                                                    </div>
                                                                </div>           
                                                                {userById.role&&userById.role.id=="1"?
                                                                <div className="col-lg-6">
                                                                    <div className="ui focus mt-30 ">
                                                                        <label>Role</label>
                                                                        <select class="ui left icon swdh11 swdh19 dropdown cntry152 prompt srch_explore" key={`role${userById.id}`} name="role" onChange={this.handleInputChange}>
                                                                            <option value="ROLE_ADMIN" selected>Admin</option>
                                                                            <option value="ROLE_USER">User</option>
                                                                        </select>  
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div className="col-lg-6">
                                                                    <div className="ui focus mt-30 ">
                                                                    <label>Role</label>
                                                                        <select class="ui left icon swdh11 swdh19 dropdown cntry152 prompt srch_explore" key={`role${userById.id}`} name="role" onChange={this.handleInputChange}>
                                                                            <option value="ROLE_ADMIN">Admin</option>
                                                                            <option value="ROLE_USER" selected>User</option>
                                                                        </select>  
                                                                    </div>
                                                                </div>}      
                                                                <div className="col-lg-6">
                                                                    <div className="ui search focus mt-30">
                                                                        <label>Fullname</label>
                                                                        <div className="ui left icon input swdh11 swdh19" key={`fullname${userById.id}`}>
                                                                            <input className="prompt srch_explore" type="text" name="fullname"  
                                                                            onChange={this.handleInputChange} defaultValue={userById.fullname}/>					
                                                                        </div>

                                                                    </div>
                                                                </div>  
                                                                <div className="col-lg-6">
                                                                    <div className="ui search focus mt-30">
                                                                        <label>Password</label>
                                                                        <div className="ui left icon input swdh11 swdh19" key={`pass${userById.id}`}>
                                                                            <input className="prompt srch_explore" type={this.state.isShow?'text':'password'}  name="password"  
                                                                            onChange={this.handleInputChange} placeholder="New password here"/>		
                                                                            <div style={{margin: 'auto'}}>
                                                                            {this.state.isShow?<i className="fa fa-fw fa-eye" id="togglePassword" style={{marginLeft: '-40px', cursor: 'pointer'}} onClick={this.showHide}/>
                                                                            :<i className="fa fa-fw fa-eye-slash"id="togglePassword" style={{marginLeft: '-40px', cursor: 'pointer'}} onClick={this.showHide} /> }
                                                                            </div>				
                                                                        </div>
                                                                    </div>
                                                                </div>                                
                                                                
                                                                <div className="col-lg-6">
                                                                    <div className="ui search focus mt-30">
                                                                        <label>Email</label>
                                                                        <div className="ui left icon input swdh11 swdh19" key={`email${userById.id}`}>
                                                                            <input className="prompt srch_explore" type="text" name="email"  
                                                                            onChange={this.handleInputChange} defaultValue={userById.email}/>					
                                                                        </div>
                                                                        {this.state.error.email && <div className="validation alert alert-warning">{this.state.error.email}</div>}

                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="ui search focus mt-30">
                                                                        <label>Phone</label>
                                                                        <div className="ui left icon input swdh11 swdh19" key={`phone${userById.id}`}>
                                                                            <input className="prompt srch_explore" type="text" name="phone" 
                                                                            onChange={this.handleInputChange} defaultValue={userById.phone}/>					
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-9">
                                                                    <div className="ui search focus mt-30">
                                                                        <label>Address</label>
                                                                        <div className="ui left icon input swdh11 swdh19" key={`address${userById.id}`}>
                                                                            <input className="prompt srch_explore" type="text" name="address"  
                                                                            onChange={this.handleInputChange} defaultValue={userById.address}/>					
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {userById.enabled&&userById.enabled?
                                                                <div className="col-lg-3">
                                                                    <div className="ui focus mt-30 ">
                                                                        <label>Status</label>
                                                                        <select class="ui left icon swdh11 swdh19 dropdown cntry152 prompt srch_explore" key={`status${userById.id}`} name="enabled" onChange={this.handleInputChange}>
                                                                            <option value="true" selected>Active</option>
                                                                            <option value="false">InActive</option>
                                                                        </select>  
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div className="col-lg-3">
                                                                    <div className="ui focus mt-30 ">
                                                                        <label>Status</label>
                                                                        <select class="ui left icon swdh11 swdh19 dropdown cntry152 prompt srch_explore" key={`status${userById.id}`} name="role" onChange={this.handleInputChange}>
                                                                            <option value="true">Active</option>
                                                                            <option value="false" selected>Inactive</option>
                                                                        </select>  
                                                                    </div>
                                                                </div>}  
                                                                <div className="col-lg-6">
                                                                    <div className="ui focus mt-30 ">
                                                                        <div className="thumb-item">
                                                                            {this.state.img?
                                                                                <img src={this.state.img} style={{width:"80px", paddingTop:"20px"}} alt=""/>
                                                                                :<img src={userById.avatarImage} style={{width:"100px", paddingTop:"20px"}} alt=""/>
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
                                                                <div className="col-lg-12">
                                                                    <div className="divider-1"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            </form>
                                            <Link to="/users" style={{paddingRight:"30px"}}><button className="save_btn" type="button">Back</button></Link>
                                            <span ><button value={'Update'} onClick={()=>this.updateDetail(this.state.newDetail, userById.id)} className="save_btn" type="button">Save Changes</button></span>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>						
                        </div>
                    </div>
                </div>
                <Footer/>
	        </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        userById: state.user.userById,
        img: state.course.img
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserByIdRequest:(e) => dispatch (getUserByIdRequest(e)),
        imageRequest:(e) => dispatch (imageRequest(e)),
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withRouterParams(EditUser)));