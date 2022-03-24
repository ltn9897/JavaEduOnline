import React from "react";
import FooterUser from "../Layout/footerUser"
import {connect} from 'react-redux';
import {fetchDetailUserRequest} from "../../actions/detail";
import {Link} from "react-router-dom";
import { addToCart, removeFromCart } from "../../actions/cart";
import {withRouter} from "../../Admin/Auth/withRouter"
import moment from 'moment';
import Success from "../../Alert/success";
import Warning from "../../Alert/warning";
import {fetchAllEnrollRequest} from "../../actions/course"

class Enroll extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
		this.props.fetchDetailUserRequest();
        this.props.fetchAllEnrollRequest();
    } 

    render(){
        const { enroll } = this.props;
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
                                <h2 className="st_title"> <i class="uil uil-bag"></i>Enroll</h2>
                            </div>								
                        </div>
						<div className="_14d25 mb-20">						
							<div className="row">
								<div className="col-md-12">
                                    {enroll.map((course,index) => {
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
        enroll: state.course.coursesEnroll,
        cartItems: state.cart.items,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailUserRequest:() => dispatch (fetchDetailUserRequest()),
        addToCart:(e,p) => dispatch (addToCart(e,p)),
        fetchAllEnrollRequest:() => dispatch (fetchAllEnrollRequest()),

    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Enroll));
 