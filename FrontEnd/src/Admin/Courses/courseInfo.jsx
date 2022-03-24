import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Layout/footer';
import {COURSE_API_BASE_URL} from "../../config/env";
import authHeader from "../../config/authHeader";
import axios from 'axios';
import {connect} from 'react-redux';
import { fetchCourseRequest, deleteCourseRequest, fetchCourseByDraftRequest, searchCourseAdRequest, fetchCourseByActivateRequest } from "../../actions/course";
import Success from "../../Alert/success";
import Error from "../../Alert/error";
import $ from 'jquery'

class CourseInfo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            searchCourse:'',
            delete:''
        }
    }
    
    componentDidMount(){
        this.props.fetchCourseRequest(this.props.page);
        this.props.fetchCourseByDraftRequest(this.props.pageDraft);
        this.props.fetchCourseByActivateRequest(this.props.pageActivate)

    } 

    handleClick(data) {
        if(data >= 0 && data< this.props.totalPages)
        {   
            this.props.fetchCourseRequest(data);
        }
    }

    handleClickDraft(data) {
        if(data >= 0 && data< this.props.totalPagesDraft)
        {   
            this.props.fetchCourseByDraftRequest(data);
        }
    }

    handleClickActivate(data) {
        if(data >= 0 && data< this.props.totalPagesActivate)
        {   
            this.props.fetchCourseByActivateRequest(data);
        }
    }

    handleClickDelete(data) {
        this.setState({delete:data})
        
    }

    alertDelete = () => {
        this.props.deleteCourseRequest(this.state.delete)
        this.handleSuccess();
    }
 
    handleInputSearchChange = e => {   
        let value = e.target.value       
        this.setState({searchCourse:value}); 
        console.log(value) 
    }

    searchCourse = (search) => {
        this.props.searchCourseAdRequest(search)
    }

    handleSuccess = () => {
        $('#deleteSuccess').fadeIn('fast').delay(2000).fadeOut('slow');
		
	} 

    render() {
        return (
            <div className="wrapper" >
                
                <div className="sa4d25">
                    <div className="container-fluid">
                        
                        <div className="row">
                            
                            <div className="col-lg-12">
                                <h2 className="st_title"><i className="uil uil-book-alt"></i>Courses</h2>
                            </div>
                            <div className="col-md-12">
                                <div className="card_dash1">
                                    
                                        
                                   
                                    <div className="card_dash_left1">
                                        <i className="uil uil-book-alt"></i>
                                        <h1>Jump Into Course Creation</h1>
                                    </div>
                                    <div className="card_dash_right1">
                                        <Link to="/add-course"><button className="create_btn_dash">Create Your Course</button></Link>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        {this.props.messageSuccess=="Success"?
                        <div  id="success" style={{display:"none"}}><Success name={this.props.messageSuccess}/></div>:
                        <div  id="error" style={{display:"none"}}><Error name={this.props.messageSuccess}/></div>}
                        <div  id="deleteSuccess" style={{display:"none"}}><Success name='Delete Successful'/></div>:
                        
                        
                        <div className="row">
                            
                            <div className="col-md-12">
                                
                                <div className="my_courses_tabs">
                                    <ul class="nav nav-pills my_crse_nav" id="pills-tab" role="tablist">
                                        <li class="nav-item" className="col-md-4" style={{paddingRight:"0px", paddingLeft:"0px", textAlign:"center"}}>
                                            <a class="nav-link active" id="pills-my-courses-tab" data-toggle="pill" href="#pills-my-courses" role="tab" aria-controls="pills-my-courses" aria-selected="false"><i class="uil uil-book-alt"></i>All Courses</a>
                                        </li>
                                        <li class="nav-item" className="col-md-4" style={{paddingRight:"0px", paddingLeft:"0px", textAlign:"center"}}>
                                            <a class="nav-link" id="pills-my-purchases-tab" data-toggle="pill" href="#pills-my-purchases" role="tab" aria-controls="pills-my-purchases" aria-selected="true"><i class="uil uil-download-alt"></i> Drafs</a>
                                        </li>
                                        <li className="nav-item col-md-4" style={{paddingRight:"0px", paddingLeft:"0px", textAlign:"center"}}>
                                            <a className="nav-link" id="pills-upcoming-courses-tab" data-toggle="pill" href="#pills-upcoming-courses" role="tab" aria-controls="pills-upcoming-courses" aria-selected="false"><i className="uil uil-upload-alt"></i>Activate </a>
                                        </li>
                                    </ul>
                                   
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-my-courses" role="tabpanel">
                                            <div className="table-responsive mt-30">
                                                <div>
                                                    <div className="section3125">
                                                        <div className="explore_search">
                                                            <div className="ui search focus">
                                                                <div className="ui left icon input swdh11">
                                                                    <input className="prompt srch_explore" type="text" placeholder="Search for Courses..." onChange={this.handleInputSearchChange} onKeyPress={e=> e.key==='Enter' && this.searchCourse(this.state.searchCourse)}/>
                                                                    <i className="uil uil-search-alt icon icon2"></i>
                                                                </div>
                                                            </div>
                                                        </div>							
                                                    </div>							
                                                </div>
                                                
                                                <table className="table ucp-table">
                                                    <thead className="thead-s">
                                                        <tr>
                                                            <th className="text-center" scope="col">No.</th>
                                                            <th className="text-center" >Thumbnail</th>
                                                            <th className="cell-ta" >Title</th>
                                                            <th className="cell-ta" >Price</th>
                                                            <th className="text-center" >Status</th>
                                                            <th className="text-center" >Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.props.courses.map((course,index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td className="text-center">IT-{index + 1 + this.props.page*10}</td>
                                                                        <td className="text-center"><img src={course.imageVideoDescription} style={{height:"40px", width:"60px"}}/></td>
                                                                        <td className="cell-ta">{course.title}</td>
                                                                        <td className="cell-ta">${course.price}</td>
                                                                        <td className="text-center">{course.activate ? <b className="course_active">Activate</b>:<b className="course_inactive">Draf</b>}</td>
                                                                        
                                                                        <td className="text-center" > 
                                                                            <Link to={`/course/${course.id}`} params={course.id} title="Detail" className="gray-s"><i class="uil uil-file icon_142"></i></Link>
                                                                            <Link to={`/status-course/${course.id}`} params={course.id} title="Edit" className="gray-s"><i className="uil uil-edit-alt" ></i></Link>
                                                                        </td>
                                                                    </tr>); 
                                                                }
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                               
                                            </div>
                                            {this.props.totalPages>1?
                                                <div className="step-footer step-tab-pager text-center">
                                                        <div class="ui pagination menu" role="navigation">  
                                                        {this.props.page > 0?   
                                                        <a className="icon item" rel="prev" aria-label="« Previous" onClick={() => this.handleClick(this.props.page-1)}> <i className="left chevron icon"></i> </a>
                                                        :''}   
                                                        {
                                                        [...Array(this.props.totalPages)].map((e, i) => (this.props.page) == i ?<a className="item active"  onClick={() => this.handleClick(i)} key={i}>{i+1}</a>
                                                                                                                                :<a className="item"  onClick={() => this.handleClick(i)} key={i}>{i+1}</a>)         
                                                        }        
                                                        {this.props.page  < (this.props.totalPages-1)?
                                                        <a className="icon item" rel="next" aria-label="Next »" onClick={() => this.handleClick(this.props.page+1)}> <i className="right chevron icon"></i> </a>
                                                        :''}
                                                    </div>   
                                                </div>
                                            :''}
                                        </div>
                                        <div className="tab-pane fade " id="pills-my-purchases" role="tabpanel">
                                            <div className="table-responsive mt-30">
                                    
                                                <table className="table ucp-table">
                                                    <thead className="thead-s">
                                                        <tr>
                                                            <th className="text-center" scope="col">No.</th>
                                                            <th className="text-center" >Thumbnail</th>
                                                            <th className="cell-ta" >Title</th>
                                                            <th className="cell-ta" >Price</th>
                                                            <th className="text-center" >Status</th>
                                                            <th className="text-center" >Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.props.coursesByDraft&&this.props.coursesByDraft.map((draf,n) => {
                                                                return (
                                                                    <tr key={n}>
                                                                        <td className="text-center">IT-{n + 1 + this.props.pageDraft*10}</td>
                                                                        <td className="text-center"><img src={draf.imageVideoDescription} style={{height:"40px", width:"60px"}}/></td>
                                                                        <td className="cell-ta">{draf.title}</td>
                                                                        <td className="cell-ta">${draf.price}</td>
                                                                        <td className="text-center">{draf.activate ? <b className="course_active">Activate</b>:<b className="course_inactive">Draf</b>}</td>
                                                                        
                                                                        <td className="text-center" > 
                                                                            <Link to={`/course/${draf.id}`} params={draf.id} title="Detail" className="gray-s"><i class="uil uil-file icon_142"></i></Link>
                                                                            <Link to={`/status-course/${draf.id}`} params={draf.id} title="Edit" className="gray-s"><i className="uil uil-edit-alt" ></i></Link>

                                                                        </td>
                                                                    </tr>); 
                                                                }
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            {this.props.totalPagesDraft>1?
                                                <div className="step-footer step-tab-pager text-center">
                                                        <div class="ui pagination menu" role="navigation">  
                                                        {this.props.pageDraft > 0?   
                                                        <a className="icon item" rel="prev" aria-label="« Previous" onClick={() => this.handleClickDraft(this.props.pageDraft-1)}> <i className="left chevron icon"></i> </a>
                                                        :''}   
                                                        {
                                                        [...Array(this.props.totalPagesDraft)].map((e, k) => (this.props.pageDraft) == k ?<a className="item active"  onClick={() => this.handleClickDraft(k)} key={k}>{k+1}</a>
                                                                                                                                :<a className="item"  onClick={() => this.handleClickDraft(k)} key={k}>{k+1}</a>)         
                                                        }        
                                                        {this.props.pageDraft  < (this.props.totalPagesDraft-1)?
                                                        <a className="icon item" rel="next" aria-label="Next »" onClick={() => this.handleClickDraft(this.props.pageDraft+1)}> <i className="right chevron icon"></i> </a>
                                                        :''}
                                                    </div>   
                                                </div>
                                            :''}
                                        </div>
                                        <div className="tab-pane fade " id="pills-upcoming-courses" role="tabpanel">
                                            <div className="table-responsive mt-30">
                                                
                                                <table className="table ucp-table">
                                                    <thead className="thead-s">
                                                        <tr>
                                                            <th className="text-center" scope="col">No.</th>
                                                            <th className="text-center" >Thumbnail</th>
                                                            <th className="cell-ta" >Title</th>
                                                            <th className="cell-ta" >Price</th>
                                                            <th className="text-center" >Status</th>
                                                            <th className="text-center">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.props.coursesByActivate&&this.props.coursesByActivate.map((activate,m) => {
                                                                return (
                                                                    <tr key={m}>
                                                                        <td className="text-center">IT-{m + 1 + this.props.pageActivate*10}</td>
                                                                        <td className="text-center"><img src={activate.imageVideoDescription} style={{height:"40px", width:"60px"}}/></td>
                                                                        <td className="cell-ta">{activate.title}</td>
                                                                        <td className="cell-ta">${activate.price}</td>
                                                                        <td className="text-center">{activate.activate ? <b className="course_active">Activate</b>:<b className="course_inactive">Draf</b>}</td>
                                                                        
                                                                        <td className="text-center" > 
                                                                            <Link to={`/course/${activate.id}`} params={activate.id} title="Detail" className="gray-s"><i class="uil uil-file icon_142"></i></Link>
                                                                            <Link to={`/status-course/${activate.id}`} params={activate.id} title="Edit" className="gray-s"><i className="uil uil-edit-alt" ></i></Link>
                                                                            
                                                                        </td>
                                                                    </tr>); 
                                                                }
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            {this.props.totalPagesActivate>1?
                                                <div className="step-footer step-tab-pager text-center">
                                                        <div class="ui pagination menu" role="navigation">  
                                                        {this.props.pageActivate > 0?   
                                                        <a className="icon item" rel="prev" aria-label="« Previous" onClick={() => this.handleClickActivate(this.props.pageActivate-1)}> <i className="left chevron icon"></i> </a>
                                                        :''}   
                                                        {
                                                        [...Array(this.props.totalPagesActivate)].map((e, j) => (this.props.pageActivate) == j ?<a className="item active"  onClick={() => this.handleClickActivate(j)} key={j}>{j+1}</a>
                                                                                                                                :<a className="item"  onClick={() => this.handleClickActivate(j)} key={j}>{j+1}</a>)         
                                                        }        
                                                        {this.props.pageActivate  < (this.props.totalPagesActivate-1)?
                                                        <a className="icon item" rel="next" aria-label="Next »" onClick={() => this.handleClickActivate(this.props.pageActivate+1)}> <i className="right chevron icon"></i> </a>
                                                        :''}
                                                    </div>   
                                                </div>
                                            :''}
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
    return {        
        courses: state.course.courses,
        page: state.course.page,
        totalPages: state.course.totalPages,

        coursesByDraft : state.course.coursesByDraft,
        pageDraft: state.course.pageDraft,
        totalPagesDraft: state.course.totalPagesDraft,

        coursesByActivate : state.course.coursesByActivate,
        messageSuccess: state.course.messageSuccess,
        pageActivate: state.course.pageActivate,
        totalPagesActivate: state.course.totalPagesActivate,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCourseRequest:(e) => dispatch (fetchCourseRequest(e)),
        deleteCourseRequest:(e) => dispatch (deleteCourseRequest(e)),
        fetchCourseByDraftRequest:(e) =>dispatch (fetchCourseByDraftRequest(e)),
        fetchCourseByActivateRequest:(e) =>dispatch (fetchCourseByActivateRequest(e)),
        searchCourseAdRequest:(e) => dispatch (searchCourseAdRequest(e)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(CourseInfo);