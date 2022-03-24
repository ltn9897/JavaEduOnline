import React from "react";
import FooterUser from "../Layout/footerUser"
import {connect} from 'react-redux';
import {fetchDetailUserRequest} from "../../actions/detail";
import {Link} from "react-router-dom";
import { addToCart, removeFromCart } from "../../actions/cart";
import {withRouter} from "../../Admin/Auth/withRouter"
import {fetchAllSavedRequest, fetchUnsavedRequest} from "../../actions/savedCourse";
import moment from 'moment';
import Success from "../../Alert/success";
import Warning from "../../Alert/warning";

class SavedCourse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
		this.props.fetchDetailUserRequest();
        this.props.fetchAllSavedRequest();
    } 

    unsavedCourse = (id) =>{
        this.props.fetchUnsavedRequest(id);
    }

    render(){
        console.log(this.props.unsavedSuccess)
        const { courses } = this.props;
        return (
            <div className="wrapper">
		<div className="sa4d25">
			<div className="container-fluid">			
				<div className="row">
                    
                    <div  id="success" style={{display:"none"}}><Success name="Add to cart"/></div>
                    <div  id="login" style={{display:"none"}}><Success name="Login Successful"/></div>
                    <div  id="warning" style={{display:"none"}} ><Warning name="Already exits"/></div>
                    <div  id="unsaved" style={{display:"none"}}><Success name={this.props.unsavedSuccess}/></div>

					
					<div className="col-md-9">
                        <div className="row">
                            <div className="col-lg-12">	
                                <h2 className="st_title"> <i className="uil uil-heart-alt"></i>Favorite Courses</h2>
                            </div>								
                        </div>
						<div className="_14d25 mb-20">						
							<div className="row">
								<div className="col-md-12">
                                    {courses.map((course,index) => {
                                        return (
                                        <div className="fcrse_1 mt-30">
                                            <Link to={`/course/${course.id}`} params={course.id}  className="hf_img">
                                                <img src={course.imageVideoDescription} alt="" style={{height:"220px"}}/>
                                                <div className="course-overlay">
                                                    {/* <div className="badge_seller">Bestseller</div>
                                                    <div className="crse_reviews">
                                                        <i className="uil uil-star"></i>4.5
                                                    </div> */}
                                                    <span className="play_btn1"><i className="uil uil-play"></i></span>
                                                    <div className="crse_timer">
                                                        {course.videoDuration}
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="hs_content">
                                                
                                                    {/* <a href="#"><i className="uil uil-ellipsis-v"></i></a> */}
                                                    <div className="eps_dots">
                                                        <a href="#" onClick={()=>this.unsavedCourse(course.id)}><i className='uil uil-times'></i></a>																										
                                                    </div>
                                                    {/* <div className="dropdown-content">
                                                        <span type="button" onClick={()=>this.unsavedCourse(course.id)}><i className='uil uil-times'></i>Remove</span>															
                                                    </div>																											 */}
                                                
                                                {/* <div className="vdtodt">
                                                    <span className="vdt14">5M views</span>
                                                    <span className="vdt14">15 days ago</span>
                                                </div> */}
                                                <Link to={`/course/${course.id}`} params={course.id} className="crse14s title900">{course.title}</Link>
                                                <Link to={`/course/${course.id}`} params={course.id} class="crse-cate">{course.language=='VN'?'Vietnamese':course.language=='ENG'?'English':course.language=='FR'?'French':course.language=='JP'?'Japanese':''} </Link>
                                                
                                                <div className="auth1lnkprce">
                                                    {course.updatedDate? 
                                                    <div className="cr1fot">										
                                                        Update {moment(course.updatedDate).format('MMM DD, YYYY')}
                                                    </div> :'' }
                                                    <div className="prce142">${course.price}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )})}
								</div>									
							</div>																		
						</div>								
					</div>				
				</div>
			</div>
		</div>
		<FooterUser/>
	</div>
      );
    }
  
};

const mapStateToProps = state => {
    return {        
        user: state.detail.user,
        courses: state.savedCourse.courses,
        cartItems: state.cart.items,
        unsavedSuccess: state.savedCourse.unsavedSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailUserRequest:() => dispatch (fetchDetailUserRequest()),
        fetchAllSavedRequest:() => dispatch (fetchAllSavedRequest()),
        addToCart:(e,p) => dispatch (addToCart(e,p)),
        fetchUnsavedRequest:(e) => dispatch (fetchUnsavedRequest(e)),
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SavedCourse));
