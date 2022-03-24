import React, { Component } from "react";
import FooterUser from "../Layout/footerUser";
import {connect} from 'react-redux';
import { withRouterParams } from "../../Admin/Auth/withRouter";
import {courseByIdRequest} from "../../actions/course";
import {Link} from "react-router-dom";
import { addToCart,removeFromCart } from "../../actions/cart";
import Success from "../../Alert/success";
import Warning from "../../Alert/warning";
import {fetchSavedRequest, fetchUnsavedRequest } from "../../actions/savedCourse";
import { Icon } from '@iconify/react';
import moment from 'moment';
import { fetchCreateReviewRequest,fetchDeleteReviewRequest,fetchUpdateReviewRequest } from "../../actions/review";



class CourseById extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            id : this.props.params.id,      
            save:'', 
            show: false,
            review:{}
        }

    }

    createReview = (form, id) => {
        form.courseId = id
        this.props.fetchCreateReviewRequest(form, id)
    }

    updateReview = (form, id) => {
        form.courseId = id
        let newForm = Object.assign(this.props.course.userReview,form);
        this.props.fetchUpdateReviewRequest(newForm, id)
        this.setState({show:false})
    }

    deleteReview = (idReview, id) => {
        this.props.fetchDeleteReviewRequest(idReview ,id)
    }

    formReview = e => {   
        let formData = Object.assign({}, this.state.review); 
        //console.log(formDataLecture)
        formData[e.target.name] = e.target.value;        
        this.setState({review:formData});  
        console.log(formData);
    }

    showEdit = () => {
        this.state.show? this.setState({show: false}) : this.setState({show: true})
    }

    savedCourse = (id) => {
        this.props.fetchSavedRequest(id);
    }

    unsavedCourse = (id) => {
        this.props.fetchUnsavedRequest(id);
    }

    componentDidMount(){
        this.props.courseByIdRequest(this.state.id);
    } 

    
    render(){
        let dem = 0;
      return (
        <div className="wrapper _bg4586">
            <div className="modal vd_mdl fade" id="videoModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {this.props.course.urlVideoDescription?
                        <div class="modal-body">
                            <iframe  src={this.props.course.urlVideoDescription} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        :''}
                    </div>
                </div>
            </div>
            <div className="_215b01">
                <div className="container-fluid">			
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section3125">							
                                <div className="row justify-content-center">						
                                    <div className="col-xl-4 col-lg-5 col-md-6">						
                                        <div className="preview_video">						
                                            <a href="#" className="fcrse_img" data-toggle="modal" data-target="#videoModal">
                                                <img src={this.props.course.imageVideoDescription} alt="" style={{height:"250px"}}/>
                                                <div className="course-overlay">
                                                    {/* <div className="badge_seller">Bestseller</div> */}
                                                    <span className="play_btn1"><i className="uil uil-play"></i></span>
                                                    <span className="_215b02">Preview this course</span>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="_215b10">		
                                        	{localStorage.getItem("role")=="ROLE_USER"?		
                                            <Link to='' className="_215b11">										
                                                {this.props.course.saved?
                                                    <span type="button" onClick={()=>this.unsavedCourse(this.props.course.id)}><Icon icon="el:heart" hFlip={true} style={{marginRight:"8px"}}/>Unsaved</span>
                                                    :<span type="button" onClick={()=>this.savedCourse(this.props.course.id)}><Icon icon="el:heart-empty" hFlip={true} style={{marginRight:"8px"}} /> Save</span>
                                                }
                                            </Link>:''}
                                            {/* <a href="#" className="_215b12">										
                                                <span><i className="uil uil-windsock"></i></span>Report abuse
                                            </a> */}
                                        </div>
                                    </div>
                                    <div className="col-xl-8 col-lg-7 col-md-6">
                                        <div className="_215b03">
                                            <h2>{this.props.course.title}</h2>
                                            <span class="_215b04">{this.props.course.shortDescription}</span>
                                        </div>
                                        
                                        <div className="_215b05">
                                            <div className="crse_reviews mr-2">
                                                <i className="uil uil-star"></i>{this.props.course.avgRatting&&this.props.course.avgRatting.toFixed(1)}
                                            </div>
                                            ({this.props.course.reviews&&this.props.course.reviews.length} ratings)
                                            <div class="_215b05">										
                                                {this.props.course.totalSold} customers enrolled
                                            </div>
  

                                        </div>
                                         <div className="_215b05">										
                                            <span><i className='uil uil-comment'></i></span>
                                            {this.props.course.language=='VN'?'Vietnamese':this.props.course.language=='ENG'?'English':this.props.course.language=='FR'?'French':this.props.course.language=='JP'?'Japanese':''}

                                        </div>
                                        {this.props.course.updatedDate? 
                                        <div className="_215b05">										
                                            Last updated:  {moment(this.props.course.updatedDate).format('MMM DD, YYYY')}
                                        </div> :'' }
                                        {localStorage.getItem("isLogin")?
                                        (this.props.course.purchased?
                                        
                                        <ul className="_215b31">										
                                            <a href = {`/learn/${this.props.course.id}`} params={this.props.course.id} ><button className="btn_adcart" type="button">Enroll now</button></a>
                                        </ul>:
                                        <ul className="_215b31">										
                                        <li><button className="btn_adcart" type="button" onClick={() => this.props.addToCart(this.props.cartItems, this.props.course)}>Add to Cart</button></li>
                                        <Link to = "/checkout"><button className="btn_buy" type="button" onClick={() => this.props.addToCart(this.props.cartItems, this.props.course)}>Buy Now</button></Link>
                                        </ul>)
                                        :<ul className="_215b31">										
                                        <li><button className="btn_adcart" type="button" onClick={() => this.props.addToCart(this.props.cartItems, this.props.course)}>Add to Cart</button></li>
                                        </ul>}
                                    </div>							
                                </div>							
                            </div>							
                        </div>															
                    </div>
                </div>
            </div>
            <div  id="success" style={{display:"none"}}><Success name="Add to cart"/></div>
                        <div  id="login" style={{display:"none"}}><Success name="Login Successful"/></div>
                        <div  id="warning" style={{display:"none"}} ><Warning name="Already exits"/></div>
                        <div  id="review" style={{display:"none"}}><Success name={this.props.reviewSuccess}/></div>
                    
            <div className="_215b15 _byt1458">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* <div className="user_dt5">
                                <div className="user_dt_left">
                                    <div className="live_user_dt">
                                        <div className="user_img5">
                                            <a href="#"><img src="images/left-imgs/img-1.jpg" alt=""/></a>												
                                        </div>
                                        <div className="user_cntnt">
                                            <a href="#" className="_df7852">Johnson Smith</a>
                                            <button className="subscribe-btn">Subscribe</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="user_dt_right">
                                    <ul>
                                        <li>
                                            <a href="#" className="lkcm152"><i className="uil uil-eye"></i><span>1452</span></a>
                                        </li>
                                        <li>
                                            <a href="#" className="lkcm152"><i className="uil uil-thumbs-up"></i><span>100</span></a>
                                        </li>
                                        <li>
                                            <a href="#" className="lkcm152"><i className="uil uil-thumbs-down"></i><span>20</span></a>
                                        </li>
                                        <li>
                                            <a href="#" className="lkcm152"><i className="uil uil-share-alt"></i><span>9</span></a>
                                        </li>
                                    </ul>
                                </div>
                            </div> */} 
                            <div className="course_tabs">
                                <nav>
                                    <div className="nav nav-tabs tab_crse justify-content-center" id="nav-tab" role="tablist">
                                        <a className="nav-item nav-link active" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-selected="true">About</a>
                                        <a className="nav-item nav-link" id="nav-courses-tab" data-toggle="tab" href="#nav-courses" role="tab" aria-selected="false">Courses Content</a>
                                        <a className="nav-item nav-link" id="nav-reviews-tab" data-toggle="tab" href="#nav-reviews" role="tab" aria-selected="false">Reviews</a>
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
                                    <div className="tab-pane fade show active" id="nav-about" role="tabpanel">
                                        <div className="_htg451">
                                            <div className="_htg452">
                                                    <h3>Requirements</h3>
                                                    <ul className="_abc124">
                                                        <li><span className="_5f7g11">{this.props.course.requirement}</span></li>
                                                    </ul>
                                            </div>
                                            <div className="_htg452 mt-35">
                                                    <h3>Description</h3>
                                                    {/* <p>Hi! Welcome to the Web Developer Bootcamp, the <strong>only course you need to learn web development</strong>. There are a lot of options for online developer training, but this course is without a doubt the most comprehensive and effective on the market.  Here's why:</p> */}
                                                    <ul className="_abc124">
                                                        <li><span className="_5f7g11">{this.props.course.description}</span></li>
                                                    </ul>
                                                    {/* <p>When you're learning to program you often have to sacrifice learning the exciting and current technologies in favor of the "beginner friendly" classNamees.  With this course, you get the best of both worlds.  This is a course designed for the complete beginner, yet it covers some of the most exciting and relevant topics in the industry.</p> */}
                                            </div>
                                            <div className="_htg452 mt-35">
                                                <h3>Who this course is for </h3>
                                                <ul className="_abc124">												
                                                    <li><span className="_5f7g11">{this.props.course.whoThisCourseIsFor}</span></li>
                                            </ul>
                                            </div>	
                                            <div className="_htgdrt mt-35">
                                                <h3>What you'll learn</h3>
                                                <div className="_scd123">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <ul className="_htg452 _abcd145">												
                                                                <li><div className="_5f7g15"><i className="fas fa-check-circle"></i><span>{this.props.course.whatYouWillLearn}</span></div></li>
                                                                {/* <li><div className="_5f7g15"><i className="fas fa-check-circle"></i><span>Suspendisse semper feugiat urna dictum interdum.</span></div></li> */}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>							
                                        </div>							
                                    </div>
                                    <div className="tab-pane fade" id="nav-courses" role="tabpanel">
                                        <div className="crse_content">
                                             {
                                                 this.props.course.lessons?
                                                 this.props.course.lessons.map((les,k) =>
                                                    {
                                                        les.lectures.map((lec) => {
                                                            return dem++
                                                        })
                                                    }
                                            ):''} 
                                            
                                            <h3>{this.props.course.title}</h3>
                                            <div className="_112456">
                                                <ul className="accordion-expand-holder">
                                                    <li><span className="_fgr123"> {dem} lectures</span></li>
                                                    {/* <li><span className="_fgr123">{this.props.course.videoDuration}</span></li> */}
                                                </ul>
                                            </div>
                                            <div id="accordion" className="ui-accordion ui-widget ui-helper-reset">
                                                {
                                                
                                                this.props.course.lessons?
                                                this.props.course.lessons.map((lesson,index) => {
                                                    let count =0
                                                    {lesson.lectures.map((lecture,i)=> count++)}
                                                    return (
                                                        <div key={index}>
                                                            <a  className="accordion-header ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all">												
                                                                <div className="section-header-left">
                                                                    <span className="section-title-wrapper">
                                                                        <i className='uil uil-presentation-play crse_icon'></i>
                                                                        <span className="section-title-text">{lesson.title}</span>
                                                                    </span>
                                                                </div>
                                                                
                                                                <div className="section-header-right">
                                                                    <span className="num-items-in-section">{count} lectures</span>
                                                                    {/* <span className="section-header-length">22:08</span> */}
                                                                </div>
                                                            </a>
                                                            
                                                                    <div className="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom">
                                                                        {lesson.lectures.map((lecture,i)=>{
                                                                           
                                                                        return (
                                                                                
                                                                                <div className="lecture-container" key={i}>
                                                                                    <div className="left-content">
                                                                                        <i className='uil uil-file icon_142'></i>
                                                                                        <div className="top">
                                                                                            <div className="title">{lecture.title}</div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="details">
                                                                                    {lecture.videoUrl?
                                                                                        lecture.preview?<a href="#" className="preview-text" data-toggle="modal" data-target={"#videoModalLecture"+lecture.id}>Preview</a>:''
                                                                                    :''}
                                                                                        <span className="content-summary">{lecture.videoDuration}</span>
                                                                                    </div>
                                                                                    <div className="modal vd_mdl fade" id={"videoModalLecture"+lecture.id}   role="dialog" aria-hidden="true">
                                                                                        <div className="modal-dialog modal-lg" role="document">
                                                                                            <div className="modal-content">
                                                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                                    <span aria-hidden="true">&times;</span>
                                                                                                </button>
                                                                                                {lecture.videoUrl?
                                                                                                <div className="modal-body">
                                                                                                    <iframe  src={lecture.videoUrl} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                                                                                </div>
                                                                                                :console.log(lecture.videoUrl)}
                                                                                                
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                )
                                                                        })}
                                                                    </div>
                                                                
                                                            
                                                        </div>
                                                        
                                                    )
                                                }):''
                                                }
                                               
                                                {/* <a  className="accordion-header ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all">												
                                                    <div className="section-header-left">
                                                        <span className="section-title-wrapper">
                                                            <i className='uil uil-presentation-play crse_icon'></i>
                                                            <span className="section-title-text">Introduction to Front End Development</span>
                                                        </span>
                                                    </div>
                                                    <div className="section-header-right">
                                                        <span className="num-items-in-section">6 lectures</span>
                                                        <span className="section-header-length">27:26</span>
                                                    </div>
                                                </a>
                                                <div className="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom">
                                                    <div className="lecture-container">
                                                        <div className="left-content">
                                                            <i className='uil uil-play-circle icon_142'></i>
                                                            <div className="top">
                                                                <div className="title">Unit Objectives</div>
                                                            </div>
                                                        </div>
                                                        <div className="details">
                                                        <a href="#" className="preview-text">Preview</a>
                                                            <span className="content-summary">01.40</span>
                                                        </div>
                                                    </div>
                                                    <div className="lecture-container">
                                                        <div className="left-content">
                                                            <i className='uil uil-file icon_142'></i>
                                                            <div className="top">
                                                                <div className="title">Note about Setting Up Front-End Developer Environment</div>
                                                            </div>
                                                        </div>
                                                        <div className="details">
                                                            <span className="content-summary">00:30</span>
                                                        </div>
                                                    </div>
                                                    <div className="lecture-container">
                                                        <div className="left-content">
                                                            <i className='uil uil-play-circle icon_142'></i>
                                                            <div className="top">
                                                                <div className="title">Setting Up Front-End Developer Environment</div>
                                                            </div>
                                                        </div>
                                                        <div className="details">
                                                            <span className="content-summary">03:11</span>
                                                        </div>
                                                    </div>
                                                    <div className="lecture-container">
                                                        <div className="left-content">
                                                            <i className='uil uil-file icon_142'></i>
                                                            <div className="top">
                                                                <div className="title">Note about Introduction to the Web</div>
                                                            </div>
                                                        </div>
                                                        <div className="details">
                                                            <span className="content-summary">00:11</span>
                                                        </div>
                                                    </div>
                                                    <div className="lecture-container">
                                                        <div className="left-content">
                                                            <i className='uil uil-play-circle icon_142'></i>
                                                            <div className="top">
                                                                <div className="title">Introduction to the Web</div>
                                                            </div>
                                                        </div>
                                                        <div className="details">
                                                            <span className="content-summary">10.08</span>
                                                        </div>
                                                    </div>
                                                    <div className="lecture-container">
                                                        <div className="left-content">
                                                            <i className='uil uil-play-circle icon_142'></i>
                                                            <div className="top">
                                                                <div className="title">The Front End Holy Trinity</div>
                                                            </div>
                                                        </div>
                                                        <div className="details">
                                                            <a href="#" className="preview-text">Preview</a>
                                                            <span className="content-summary">11:46</span>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                
                                                									
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="nav-reviews" role="tabpanel">
                                        <div className="student_reviews">
                                            <div className="row">
                                                {localStorage.getItem("isLogin")&&this.props.course.purchased?
                                                <div className="col-lg-5">
                                                    {this.props.course.userReview?
                                                    <div className="reviews_left">
                                                    <h3> 
                                                        <div className="eps_dots" style={{marginRight:"40px"}}>
                                                            <a type="button" title='Delete' onClick={()=>this.deleteReview(this.props.course.userReview.id, this.props.course.id)}><i className="uil uil-trash-alt"></i></a>																										
                                                        </div> Your Review
                                                        <Link to='' title="Edit" className="gray-s" onClick={()=>this.showEdit()} ><i className="uil uil-edit-alt" ></i></Link>
                                                    
                                                    </h3>
                                                   
                                                    <div className="review_usr_dt">
                                                            {/* <img src="images/left-imgs/img-1.jpg" alt=""/> */}
                                                        {/* <div className="rv1458">
                                                            <h4 className="tutor_name1">{this.props.course.userReview.username}</h4>
                                                            <span className="time_145">2 hour ago</span>
                                                        </div> */}
                                                    </div>
                                                    <div className="rating-box mt-20">
                                                        {[...Array(5)].map((e, i) => (i < this.props.course.userReview.ratting) ?
                                                            <span className="rating-star full-star" key={i}></span>:
                                                            <span className="rating-star empty-star" key={i}></span>)}
                                                        </div>
                                                        <p className="rvds10">{this.props.course.userReview.feedback}</p>
                                                        {this.state.show?
                                                        <div className="total_rating">												
                                                            <div className="rate" onChange={this.formReview}>
                                                                <input type="radio" id="star5" name="ratting" value="5" />
                                                                <label for="star5" title="text"></label>
                                                                <input type="radio" id="star4" name="ratting" value="4" />
                                                                <label for="star4" title="text"></label>
                                                                <input type="radio" id="star3" name="ratting" value="3" />
                                                                <label for="star3" title="text"></label>
                                                                <input type="radio" id="star2" name="ratting" value="2" />
                                                                <label for="star2" title="text"></label>
                                                                <input type="radio" id="star1" name="ratting" value="1" />
                                                                <label for="star1" title="text"></label>
                                                                </div>
                                                            <div className="_rate002">Course Rating</div>	
                                                        </div>:''}
                                                        {this.state.show?
                                                        <div className="_rate003">
                                                            <textarea className="_cmnt001" placeholder="Add a public comment" name="feedback" onChange={this.formReview}></textarea>
                                                            <button className="cmnt-btn" type="button" onClick={()=>this.updateReview(this.state.review,this.props.course.id)}>Update</button>
                                                        </div>:''}
                                                        
                                                    </div>
                                                    :
                                                    <div className="reviews_left">
                                                        <h3>Customer Feedback</h3>
                                                        <div className="total_rating">											
                                                            <div className="rate" onChange={this.formReview}>
                                                                <input type="radio" id="star5" name="ratting" value="5" />
                                                                <label for="star5" title="text"></label>
                                                                <input type="radio" id="star4" name="ratting" value="4" />
                                                                <label for="star4" title="text"></label>
                                                                <input type="radio" id="star3" name="ratting" value="3" />
                                                                <label for="star3" title="text"></label>
                                                                <input type="radio" id="star2" name="ratting" value="2" />
                                                                <label for="star2" title="text"></label>
                                                                <input type="radio" id="star1" name="rattting" value="1" />
                                                                <label for="star1" title="text"></label>
                                                                </div>
                                                            <div className="_rate002">Course Rating</div>	
                                                        </div>
                                                        <div className="_rate003">
                                                            <textarea className="_cmnt001"name="feedback" placeholder="Add a public comment" onChange={this.formReview}></textarea>
                                                            <button className="cmnt-btn" type="button" onClick={()=>this.createReview(this.state.review, this.props.course.id)}>Send</button>
                                                        </div>
                                                    </div>
                                                    }											
                                                </div>
                                                :''}
                                                <div className="col-lg-7">
                                                    <div className="review_right">
                                                        <div className="review_right_heading">
                                                            <h3>Reviews</h3>
                                                        </div>
                                                    </div>
                                                    <div className="review_all120">
                                                        {this.props.course.reviews&&this.props.course.reviews.length>0? this.props.course.reviews.map((review, r) => {
                                                            return (
                                                                <div className="review_item">
                                                                    <div className="review_usr_dt">
                                                                        {/* <img src="images/left-imgs/img-1.jpg" alt=""/> */}
                                                                        <div className="rv1458">
                                                                            <h4 className="tutor_name1">{review.username}</h4>
                                                                            {/* <span className="time_145">2 hour ago</span> */}
                                                                        </div>
                                                                    </div>
                                                        
                                                                <div className="rating-box mt-20">
                                                                {[...Array(5)].map((e, i) => (i < review.ratting) ?
                                                                    <span className="rating-star full-star" key={i}></span>:
                                                                    <span className="rating-star empty-star" key={i}></span>)}
                                                                
                                                                </div>
                                                                    <p className="rvds10">{review.feedback}</p>
                                                                </div>
                                                                )
                                                        }):
                                                        <div className="review_item">
                                                            No review stars on this course !
                                                        </div>}
                                                        
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
            <FooterUser/>
	    </div>
      );
    }
  
};

const mapStateToProps = state => {
    return {        
        course: state.course.courseById,
        cartItems: state.cart.items,
        savedSuccess: state.savedCourse.savedSuccess,
        reviewSuccess: state.review.reviewSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        courseByIdRequest:(e) => dispatch (courseByIdRequest(e)),
        addToCart:(e,p) => dispatch (addToCart(e,p)),
        fetchSavedRequest:(e) => dispatch (fetchSavedRequest(e)),
        fetchUnsavedRequest:(e) => dispatch (fetchUnsavedRequest(e)),
        fetchCreateReviewRequest:(e,i) => dispatch (fetchCreateReviewRequest(e,i)),
        fetchUpdateReviewRequest:(e,i) => dispatch (fetchUpdateReviewRequest(e,i)),
        fetchDeleteReviewRequest:(e,i) => dispatch (fetchDeleteReviewRequest(e,i)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouterParams(CourseById));;
