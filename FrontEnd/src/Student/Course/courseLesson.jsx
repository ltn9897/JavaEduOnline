import React, { Component } from "react";
import {connect} from 'react-redux';
import { withRouterParams } from "../../Admin/Auth/withRouter";
import {courseByIdRequest} from "../../actions/course";
import authHeader from "../../config/authHeader";
import axios from "axios";
import {logout} from "../../actions/auth";
import {fetchDetailUserRequest} from "../../actions/detail"
import { fetchAllEnrollRequest} from "../../actions/course"
import {withRouter} from "../../Admin/Auth/withRouter"

let arr

class CourseLesson extends React.Component {
    constructor(props) {
        super(props);
        this.state ={  
            id : this.props.params.id,  
			lectureShow: '',
			prvId:'', 
        }

    }

    componentDidMount(){
		this.props.fetchDetailUserRequest();
		console.log(this.state.id)
		axios.get('http://localhost:8080/api/course/enroll',{ headers: authHeader() }).then((res) => {
			res.data.data.map((en) =>
			en.id == this.state.id?
			this.props.courseByIdRequest(en.id):''
			)
        })
		
    } 

	getLecture = (id, i) => {
		console.log(i)
		axios.get('http://localhost:8080/api/lecture/'+id,{ headers: authHeader() }).then((res) => {
            this.setState({lectureShow:res.data.data})
			this.setState({prvId:res.data.data.id})
        })
	}
    
	prev = (id) => {
		var vt = 0
		arr.map((ar)=>(
			ar==id? vt=arr.indexOf(ar):''
		))
		if(vt>0){
		axios.get('http://localhost:8080/api/lecture/'+arr[vt-1],{ headers: authHeader() }).then((res) => {
            this.setState({lectureShow:res.data.data})
			this.setState({prvId:res.data.data.id})
        })
		}
	}

	next = (id) => {
		var vt = 0
		arr.map((ar)=>(
			ar==id? vt=arr.indexOf(ar):''
		))
		if(vt<arr.length){
		axios.get('http://localhost:8080/api/lecture/'+arr[vt+1],{ headers: authHeader() }).then((res) => {
            this.setState({lectureShow:res.data.data})
			this.setState({prvId:res.data.data.id})
        })
		}
	}

    render(){
        const {course} = this.props
		arr=[]
        return (
		<>
		<div className="lecture-header d-flex">
                
                <div className="lecture-header-left d-flex">
					<a href ={`/course/${course.id}`} params={course.id} className="back-to-curriculum" data-toggle="tooltip" title="" data-original-title="Go to purchased Courses">
                        <i className="fas fa-angle-left"></i>
                    </a>
                    <a className="nav-icon-list d-sm-block d-md-block d-lg-none"><i className="fas fa-list"></i></a>
                </div>
                <div className="lecture-header-right d-flex">
                    <a href="#" className="nav-btn" onClick={()=>this.prev(this.state.prvId)}>
                        <span className="nav-text">
                            <i className="fas fa-long-arrow-alt-left mr-2"></i>
                            Previous
                        </span>
                    </a>				
                    <a href="#" className="nav-btn" onClick={()=>this.next(this.state.prvId)}>
                        <span className="nav-text">
                            Next						
                            <i className="fas fa-long-arrow-alt-right ml-2"></i>
                        </span>
                    </a>							
                </div>
                <div className="header_right">
                    <ul>
                        <li className="ui dropdown">
                            <a href="#" className="opts_account" title="Account">
                                <img src={this.props.user.avatarImage} alt=""/>
                            </a>
                            <div className="menu dropdown_account">
                                <div className="channel_my">
                                    <div className="profile_link">
                                        <img src={this.props.user.avatarImage} alt=""/>
                                        
                                        <div className="pd_content">
                                            <div className="rhte85">
                                                <h6>{this.props.user.username}</h6>
                                                <div className="mef78" title="Verify">
                                                    <i className='uil uil-check-circle'></i>
                                                </div>
                                            </div>
                                            <span>{this.props.user.email}</span>
                                        </div>		
                                    </div>
                                </div>
                                <div className="night_mode_switch__btn">
                                    <a href="#" id="night-mode" className="btn-night-mode">
                                        <i className="uil uil-moon"></i> Night
                                        <span className="btn-night-mode-switch">
                                            <span className="uk-switch-button"></span>
                                        </span>
                                    </a>
                                </div>
                                
                                <a href='/detail' className="item channel_item" >View Profile</a>
                                <a href='/change-password' className="item channel_item" >Change Password</a>	
                                	
                                <a href="help.html" className="item channel_item">Help</a>
                                <a href='/' className="item channel_item" onClick={this.props.logout}>Sign Out</a>
                            </div>
                        </li> 
                    </ul>
                </div>
            </div>
		
		<div className="lecture-container-wrap d-flex">
			<div className="lecture-sidebar">
				<h4 className="p-4 lecture-sidebar-course-title">{course.title}</h4>
				<div className="lecture-sidebar-curriculum-wrap">
					
					{course.lessons?
						course.lessons.map((lesson,i)=>{
						
						return(
						<div className="course-course-section">
							<div className="section-header pp-2 d-flex">
								<span className="section-name flex-grow-1 ms-2 d-flex">
									<strong className="flex-grow-1">{lesson.title}</strong>
								</span>
							</div>
							<div className="course-section-body">                                                              
								
								{lesson.lectures.map((lecture,j)=>{
									return(
										arr.push(lecture.id),
										<div className="sidebar-section-item" type="button" onClick={()=>this.getLecture(lecture.id, )}>
											<div className="section-item-title">
												<a className="pp-2 d-flex" >
													<span className="lecture-status-icon pr-1">
														<i class="uil uil-play-circle icon_142"></i>
													</span>
													<div className="title-container pl-2 flex-grow-1 d-flex">
														<span className="lecture-name flex-grow-1">
															{lecture.title} 
															<small> ({lecture.videoDuration})</small>
														</span>
													</div>
												</a>
											</div>
										</div> 
									)
								})}                          
								
							</div>
						</div>      
					)}):''}                        
				</div>
			</div>
			{this.state.lectureShow?
			<div className="lecture-container">
				<h2 className="lecture-title mb-4">{this.state.lectureShow.title} </h2>                          
				<div className="lecture-content-inner mt-35">
					<div className="lecture-content-inner-video">
						<div className="video-responsive">
							<iframe src={this.state.lectureShow.videoUrl} className="lec-responsive-width"></iframe>
						</div>
					</div>             
				</div>  
			</div>
			:
			<div className="lecture-container">
				<h2 className="lecture-title mb-4">{course.title}</h2>                          
				<div className="lecture-content-inner mt-35">
					<div className="lecture-content-inner-video">
						<div className="video-responsive">
							<iframe src={course.urlVideoDescription} className="lec-responsive-width"></iframe>
						</div>
					</div>             
				</div>  
				<div className="lecture-content-txt mt-35">
					<p className="mb-0">{course.description}</p>
				</div>
			</div>}
			
		</div>
		</>
		);
    }
  
};

const mapStateToProps = state => {
    return {        
        course: state.course.courseById,
		username: state.auth.username,
        token: state.auth.token,
        user: state.detail.user,
		enroll: state.course.coursesEnroll

    }
}

const mapDispatchToProps = dispatch => {
    return {
		logout: () => {
            dispatch(logout())
            localStorage.removeItem("isLogin");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            this.props.navigate('/index');
            window.location.reload();
        },
        fetchDetailUserRequest:() => dispatch (fetchDetailUserRequest()),
        courseByIdRequest:(e) => dispatch (courseByIdRequest(e)),
		fetchAllEnrollRequest:() => dispatch (fetchAllEnrollRequest())
	
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withRouterParams(CourseLesson)));
