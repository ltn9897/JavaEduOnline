import React from 'react'
import FooterUser from '../Layout/footerUser';
import {Link} from "react-router-dom"
import { fetchDetailUserRequest } from '../../actions/detail'
import {connect} from 'react-redux';
import { fetchAllEnrollRequest } from '../../actions/course';
import moment from 'moment';
import {withRouterParams} from '../../Admin/Auth/withRouter'

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            detail: [],
            name: this.props.params.name
        }
    }

    componentDidMount(){
        this.props.fetchDetailUserRequest();
        this.props.fetchAllEnrollRequest();
    }

    componentDidUpdate(prevProps){
        if(this.props.params.name!==prevProps.params.name){
            this.props.fetchDetailUserRequest();
            this.props.fetchAllEnrollRequest();
        }
    }

    render () {
        const {enroll} = this.props
        console.log(this.state.name)
        return (
            <div className="wrapper _bg4586">
                <div className="_216b01">
                    <div className="container-fluid">			
                        <div className="row justify-content-md-center">
                            <div className="col-md-10">
                                <div className="section3125 rpt145">							
                                    <div className="row">				
                                            <div className="dp_dt150 col-lg-7">						
                                                <div className="img148">
                                                    <img src={this.props.user.avatarImage} alt=""/>										
                                                </div>
                                                <div className="prfledt1">
                                                    <h2>{this.props.user.fullname}</h2>
                                                    <span>{this.props.user.username}</span>
                                                </div>										
                                            </div>
                                        <div className="col-lg-5">
                                            <div className="rgt-145">
                                                <ul className="tutor_social_links">
                                                    <li><a href="https://www.facebook.com" className="fb"><i className="fab fa-facebook-f"></i></a></li>
                                                    <li><a href="https://twitter.com/?lang=vi" className="tw"><i className="fab fa-twitter"></i></a></li>
                                                    <li><a href="https://www.linkedin.com" className="ln"><i className="fab fa-linkedin-in"></i></a></li>
                                                    <li><a href="https://www.youtube.com" className="yu"><i className="fab fa-youtube"></i></a></li>
                                                </ul>
                                            </div>
                                            <ul className="_bty149">
                                            {/* <li><Link to='/users'><button className="studio-link-btn btn500">Back</button></Link></li> */}

                                                <li><Link to='/edit-profile'><button className="studio-link-btn btn500">Edit</button></Link></li>								
                                            </ul>
                                            
                                        </div>													
                                    </div>							
                                </div>							
                            </div>															
                        </div>
                    </div>
                </div>
                <div  className="_215b15">
                    <div  className="container-fluid">
                        <div  className="row">
                            <div  className="col-lg-12">						
                                <div  className="course_tabs">
                                    <nav>
                                        <div  className="nav nav-tabs tab_crse" id="nav-tab" role="tablist">
                                            {this.state.name=="enroll"?
                                            <><a  className="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-selected="true">About</a>
                                            <a  className="nav-item nav-link active" id="nav-purchased-tab" data-toggle="tab" href="#nav-purchased" role="tab" aria-selected="false">Purchased</a> 
                                            </>
                                            :<><a  className="nav-item nav-link active" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-selected="true">About</a>
                                            <a  className="nav-item nav-link" id="nav-purchased-tab" data-toggle="tab" href="#nav-purchased" role="tab" aria-selected="false">Purchased</a> 
                                            </>}
                                        </div>
                                    </nav>						
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="_215b17">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="course_tab_content">
                                    <div className="tab-content" id="nav-tabContent">
                                        {this.state.name==='enroll'?
                                        <><div className="tab-pane fade show" id="nav-about" role="tabpanel">
                                            <div className="_htg451">
                                                <div className="_htg452" >
                                                    <h3>About Me</h3>
                                                    <div className="basic_form col-lg-6" style={{paddingLeft:"30px"}}>
                                                        <div className="row">
                                                            <div className="col-lg-8">
                                                                <div className="row">
                                                                    <div className="col-lg-8">
                                                                        <div className="ui search focus mt-30" >
                                                                            <div class="row">
                                                                                <div class="col-md-6">
                                                                                    <label>Name</label>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <p>{this.props.user.fullname}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-md-6">
                                                                                    <label>Email</label>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <p>{this.props.user.email}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-md-6">
                                                                                    <label>Phone</label>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <p>{this.props.user.phone}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-md-6">
                                                                                    <label>Adress</label>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <p>{this.props.user.address}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>  
                                                </div>																	
                                            </div>				
                                        </div>
                                        <div  className="tab-pane fade show  active" id="nav-purchased" role="tabpanel">
                                            <div  className="_htg451">
                                                <div  className="_htg452">
                                                    <h3>Purchased Courses</h3>
                                                    <div  className="row">
                                                        <div  className="col-md-9">
                                                            {enroll.map((course, k) => 
                                                                {
                                                                    return (
                                                                        <div  className="fcrse_1 mt-30">
                                                                            <Link to={`/course/${course.id}`} params={course.id} className="hf_img">
                                                                                <img src={course.imageVideoDescription} alt="" style={{height:"230px"}}/>
                                                                                <div  className="course-overlay">
                                                                                    <div  className="crse_reviews">
                                                                                        <i  className="uil uil-star"></i>{course.avgRatting}
                                                                                    </div>
                                                                                    <span  className="play_btn1"><i  className="uil uil-play"></i></span>
                                                                                    <div  className="crse_timer">
                                                                                        {course.videoDUration}
                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                            <div  className="hs_content">
                                                                                <Link to={`/course/${course.id}`} params={course.id} className="crse14s title900">{course.title}</Link>
                                                                                <Link to={`/course/${course.id}`} params={course.id} class="crse-cate">{course.language=='VN'?'Vietnamese':course.language=='ENG'?'English':course.language=='FR'?'French':course.language=='JP'?'Japanese':''} </Link>

                                                                                <div  className="purchased_badge">Purchased</div>
                                                                                <div className="auth1lnkprce">
                                                                                    {course.updatedDate? 
                                                                                    <div className="cr1fot">										
                                                                                        Update {moment(course.updatedDate).format('MMM DD, YYYY')}
                                                                                    </div> :'' }
                                                                                    <div className="prce142">${course.price}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            )}
                                                            
                                                        </div>									
                                                    </div>
                                                </div>																	
                                            </div>							
                                        </div></>
                                        :
                                        <>
                                        <div className="tab-pane fade show active" id="nav-about" role="tabpanel">
                                            <div className="_htg451">
                                                <div className="_htg452" >
                                                    <h3>About Me</h3>
                                                    <div className="basic_form col-lg-6" style={{paddingLeft:"30px"}}>
                                                        <div className="row">
                                                            <div className="col-lg-8">
                                                                <div className="row">
                                                                    <div className="col-lg-8">
                                                                        <div className="ui search focus mt-30" >
                                                                            <div class="row">
                                                                                <div class="col-md-6">
                                                                                    <label>Name</label>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <p>{this.props.user.fullname}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-md-6">
                                                                                    <label>Email</label>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <p>{this.props.user.email}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-md-6">
                                                                                    <label>Phone</label>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <p>{this.props.user.phone}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-md-6">
                                                                                    <label>Adress</label>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <p>{this.props.user.address}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>  
                                                </div>																	
                                            </div>				
                                        </div>
                                        <div  className="tab-pane fade show " id="nav-purchased" role="tabpanel">
                                        <div  className="_htg451">
                                            <div  className="_htg452">
                                                <h3>Purchased Courses</h3>
                                                <div  className="row">
                                                    <div  className="col-md-9">
                                                        {enroll.map((course, k) => 
                                                            {
                                                                return (
                                                                    <div  className="fcrse_1 mt-30">
                                                                        <Link to={`/course/${course.id}`} params={course.id}   className="hf_img">
                                                                            <img src={course.imageVideoDescription} alt="" style={{height:"230px"}}/>
                                                                            <div  className="course-overlay">
                                                                                <div  className="crse_reviews">
                                                                                    <i  className="uil uil-star"></i>{course.avgRatting}
                                                                                </div>
                                                                                <span  className="play_btn1"><i  className="uil uil-play"></i></span>
                                                                                <div  className="crse_timer">
                                                                                    {course.videoDUration}
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                        <div  className="hs_content">
                                                                            <Link to={`/course/${course.id}`} params={course.id} className="crse14s title900">{course.title}</Link>
                                                                            <Link to={`/course/${course.id}`} params={course.id} class="crse-cate">{course.language=='VN'?'Vietnamese':course.language=='ENG'?'English':course.language=='FR'?'French':course.language=='JP'?'Japanese':''} </Link>

                                                                            <div  className="purchased_badge">Purchased</div>
                                                                            <div className="auth1lnkprce">
                                                                                {course.updatedDate? 
                                                                                <div className="cr1fot">										
                                                                                    Update {moment(course.updatedDate).format('MMM DD, YYYY')}
                                                                                </div> :'' }
                                                                                <div className="prce142">${course.price}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        )}
                                                        
                                                    </div>									
                                                </div>
                                            </div>																	
                                        </div>							
                                        </div></>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterUser/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {        
        user: state.detail.user,
        enroll: state.course.coursesEnroll
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailUserRequest:() => dispatch (fetchDetailUserRequest()),
        fetchAllEnrollRequest:() => dispatch (fetchAllEnrollRequest()),
    };
}

export default withRouterParams(connect(mapStateToProps,mapDispatchToProps)(Profile)); 