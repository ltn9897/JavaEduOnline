import React from "react";
import Footer from "../Layout/footer";
import authHeader from "../../config/authHeader";
import axios from "axios";
import {USER_INFO_API_BASE_URL} from "../../config/env";
import {connect} from 'react-redux';
import { getDetailInfo, updateDetail } from '../../actions/detail'
import validator from 'validator';
import Success from "../../Alert/success";
import Error from "../../Alert/error";
import $ from "jquery";
import {imageRequest} from "../../actions/course"
import {withRouter} from "../Auth/withRouter"

class DetailUpdate extends React.Component {
    constructor(){
        super();
        this.state = {
            user: [],
            newDetail: {
                fullname: '',
                email: '',
                enable: '',
                address: ''
                },
            error: {},
            updateSuccess: false,
            ava:'',
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
  
    }

    componentDidMount(){        
        this.getDetail();
    } 

    getDetail = () => {
        axios.get(USER_INFO_API_BASE_URL+'/user-information', { headers: authHeader() }).then((res) => {
            this.setState({user: res.data.data});
            this.props.getDetailInfo(res.data.data);
            this.setState({newDetail: res.data.data});
        });
    }

    handleInputChange= e => {   
        let formData = Object.assign({}, this.state.newDetail);  
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
        this.setState({newDetail:formData});  
        console.log(formData)  
        }
    }
    
    handleSuccess = () => {
        $('#success').fadeIn('fast').delay(2000).fadeOut('slow');
		
	} 

    handleError = () => {
        $('#error').fadeIn('fast').delay(2000).fadeOut('slow');
		
	} 

    validateEmail = () => {
        let isValid = true;

        const error = {}

        if (this.state.newDetail.email !== '') {
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

    updateDetail = (newDetail) => {
        console.log(newDetail)
        this.props.imageRequest(this.state.ava)
        axios.post(USER_INFO_API_BASE_URL+'/update', newDetail , { headers: authHeader() }).then(res=>{
            // update state.staff.staffInfo
            this.props.getDetailInfo(res.data.data);  
            this.props.updateDetail(this.state.updateSuccess) 
            this.setState({newDetail: res.data.data}) 
           
            console.log(res.data.data)
            if(res.data.message == "Success"){
                $('#success').fadeIn('fast').delay(2000).fadeOut('slow');
                setTimeout(()=>{
                    this.props.navigate('/detail')
                },1500);
            }
            else {
                
                this.setState({alert:res.data.message})
                this.handleError()
            }
        })
        this.setState({newDetail: {
            fullname: '',
            email: '',
            enable: '',
            address: ''
            },})
          
    }

    render() {
        console.log(this.props.isUpdate)
        return(
            <div className="wrapper">
                <div className="sa4d25">
                    <div className="container-fluid">			
                        <div className="row">
                            <div className="col-lg-12">
                                <h2 className="st_title"><i className='uil uil-cog'></i> Setting</h2>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-account" role="tabpanel" aria-labelledby="pills-account-tab">
                                            <div  id="success" style={{display:"none"}}><Success name="Update Successful"/></div>
                                            <div  id="error" style={{display:"none"}}><Error/></div>
                                            <div className="account_setting">
                                            <h4>Your Cursus Account</h4>
                                            <p>This is your public presence on Cursus. You need a account to upload your paid courses, comment on courses, purchased by students, or earning.</p>
                                            <form>
                                            <div className="basic_profile">
                                                <div className="basic_ptitle">
                                                    <h4>Basic Profile</h4>
                                                    <p>Add information about yourself</p>
                                                </div>
                                                <div className="basic_form">
                                                    <div className="row">
                                                        <div className="col-lg-8">
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="ui search focus mt-30">
                                                                        <label>Username</label>
                                                                        <div className="ui left icon input swdh11 swdh19">
                                                                            <input className="prompt srch_explore" type="text" required="" disabled="true"  value={this.state.user.username}/>															
                                                                        </div>
                                                                    </div>
                                                                </div>                                                                
                                                                <div className="col-lg-12">
                                                                    <div className="ui search focus mt-30">
                                                                        <label>Full Name</label>
                                                                        <div className="ui left icon input swdh11 swdh19">
                                                                            <input className="prompt srch_explore" type="text" name="fullname" required=""  
                                                                            onChange={this.handleInputChange} defaultValue={this.state.user.fullname}/>					
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="ui search focus mt-30">
                                                                        <label>Email</label>
                                                                        <div className="ui left icon input swdh11 swdh19">
                                                                            <input className="prompt srch_explore" type="text" name="email" required="" 
                                                                            onChange={this.handleInputChange} defaultValue={this.state.user.email}/>					
                                                                        </div>
                                                                        {this.state.error.email && <div className="validation alert alert-warning">{this.state.error.email}</div>}

                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="ui search focus mt-30">
                                                                        <label>Phone</label>
                                                                        <div className="ui left icon input swdh11 swdh19">
                                                                            <input className="prompt srch_explore" type="text" name="phone" required="" 
                                                                            onChange={this.handleInputChange} defaultValue={this.state.user.phone}/>					
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="ui search focus mt-30">
                                                                        <label>Address</label>
                                                                        <div className="ui left icon input swdh11 swdh19">
                                                                            <input className="prompt srch_explore" type="text" name="address" required=""  
                                                                            onChange={this.handleInputChange} defaultValue={this.state.user.address}/>					
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="ui search focus mt-30">
                                                                            <label>Status</label>
                                                                        <div className="ui left icon input swdh11 swdh19">
                                                                            <input className="prompt srch_explore" type="text" disabled="true" value={this.state.user.enabled?'Active':'Inactive'} required="" />					
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="ui focus mt-30 ">
                                                                        <div className="thumb-item">
                                                                            {this.state.img?
                                                                                <img src={this.state.img} style={{width:"80px", paddingTop:"20px"}} alt=""/>
                                                                                :<img src={this.state.user.avatarImage} style={{width:"100px", paddingTop:"20px"}} alt=""/>
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
                                            <button value={'Update'} onClick={()=>this.updateDetail(this.state.newDetail)} className="save_btn" type="button">Save Changes</button>
                                            </form>
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
        detailInfo: state.detail.detailInfo,   
        isUpdate: state.detail.updateSuccess,
        img: state.course.img
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDetailInfo: (detailInfo) => {
            dispatch(getDetailInfo(detailInfo));
        },
        updateDetail: (updateSuccess) => {
            dispatch(updateDetail(updateSuccess));
        },
        imageRequest:(e) => dispatch (imageRequest(e)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailUpdate));