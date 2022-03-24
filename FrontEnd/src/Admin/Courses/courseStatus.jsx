import React, { Component } from 'react';
import Footer from '../Layout/footer';
import axios from 'axios';
import { courseByIdRequest , updateCourseRequest} from '../../actions/course';
import { fetchCatalogRequest } from '../../actions/catalog';
import { fetchSubCatalogRequest } from '../../actions/subCatalog';
import {connect} from 'react-redux';
import authHeader from "../../config/authHeader";
import validator from 'validator';
import {withRouterParams, withRouter} from '../Auth/withRouter';
import Success from "../../Alert/success";
import Error from "../../Alert/error";
import {Link} from "react-router-dom"
   

class CourseStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.params.id,  

            statusCourse:'',
            status:'',
        }
    }

    // -------------------------  Course  -----------------------------
    formCourse = e => {   
        let formDataCourse = Object.assign({}, this.state.statusCourse);  
        
        formDataCourse[e.target.name] = e.target.value;    
        this.setState({statusCourse:formDataCourse});  
        console.log(formDataCourse)  
    }

    changeStatus =  e => {
        this.state.status?
            this.setState({
                status: false
            }):
            this.setState({
                status: true
            });
        this.formCourse(e);
    }
    
    editCourse = (edit, courseId) => {
        let newForm = Object.assign(this.props.course,edit);
        this.props.updateCourseRequest(newForm, courseId);
        if(this.props.messageSuccess=="Success"){
            setTimeout(()=>{
                this.props.navigate('/courses')
            },1500);
        }
    }

    componentDidMount () {
        this.props.courseByIdRequest(this.state.id);
    }
    
    render() {
        return (
            <div className="wrapper">
                <div className="sa4d25">
                    <div className="container">			
                        <div className="row">
                            <div className="col-lg-12">	
                                <h2 className="st_title"><i className="uil uil-analysis"></i> Edit Status Publish</h2>
                            </div>					
                        </div>				
                        <div  id="success" style={{display:"none"}}><Success name="Update Successful"/></div>
                        <div  id="error" style={{display:"none"}}><Error name="Error"/></div>
                        <div className="row">
                            <div className="col-12">
                                <div className="step-tab-panel step-tab-location active">
                                                <div className="publish-block">
                                                   
                                                    <div className="col-lg-12 col-md-6" style={{paddingBottom:"30px"}}>
                                                    <h4 className="title">What you want save as?</h4>
                                                        <div className="form_group optgroup" >
                                                            <select className= "ui fluid  dropdown cntry152 prompt srch_explore"   name="activate" onChange={this.changeStatus}  >
                                                                <option value="" selected disabled >Select Status</option>
                                                                <option value="false"  >Submit For Draf</option>
                                                                <option value="true"  >Submit For Activate</option>
                                                                
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <i className="far fa-edit"></i>

                                                    {this.state.status?
                                                    <p>Your course is in a <b>Draf</b> state. Students cannot view, purchase or enroll in this course.</p>

                                                        :<p>Your course is in an <b>Activate</b> state. Students can view, purchase or enroll in this course.</p> 
                                                    
                                                    }
                                                </div>
                                                <div className="step-footer step-tab-pager" style={{paddingTop:"20px"}}>
                                                    
                                                    <Link to ='/courses'><button data-direction="finish" style={{marginTop:"20px", marginRight:"20px"}}  className="btn btn-default steps_btn" >Back</button></Link>
                                           
                                                    <button data-direction="finish" style={{marginTop:"20px"}}  className="btn btn-default steps_btn" type="button" value={'edit'} onClick={()=>this.editCourse(this.state.statusCourse, this.props.course.id)} >Update</button>
                                        
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
    return {        
        course: state.course.courseById,
        catalogs: state.catalog.catalogs,
        subCatalogs: state.subCatalog.subCatalogs,
        messageSuccess: state.course.messageSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        courseByIdRequest:(e) => dispatch (courseByIdRequest(e)),
        fetchCatalogRequest:() => dispatch (fetchCatalogRequest()),
        fetchSubCatalogRequest:() => dispatch (fetchSubCatalogRequest()),
        updateCourseRequest:(e,i) => dispatch (updateCourseRequest(e,i))
    };
}

export default withRouter(withRouterParams(connect(mapStateToProps,mapDispatchToProps)(CourseStatus)));