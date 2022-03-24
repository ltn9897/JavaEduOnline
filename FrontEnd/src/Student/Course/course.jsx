import React from "react";
import FooterUser from "../Layout/footerUser";
import {connect} from 'react-redux';
import { fetchCourseRequest } from "../../actions/course"
import {Link} from "react-router-dom"
import { addToCart } from "../../actions/cart";
import Success from "../../Alert/success";
import Warning from "../../Alert/warning";
import {fetchSavedRequest } from "../../actions/savedCourse";
import moment from 'moment';

let date
class Course extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    handleClick(data) {
        console.log(data);
        if(data >= 0 && data< this.props.totalPages)
        {   
            this.props.fetchCourseRequest(data);
        }
    }
 
    componentDidMount(){
        this.props.fetchCourseRequest(this.props.page);
    } 

    handleInputSearchCourseChange = e => {   
        let value = e.target.value       
        this.setState({searchCourse:value});  
    }

    searchCourse = (searchCourse) => {
        this.props.searchCourseRequest(searchCourse)
    }
    
    savedCourse = (id) => {
        this.props.fetchSavedRequest(id);
    }

    render(){
      return (
        <div class="wrapper">
            <div class="sa4d25">
                <div class="container-fluid">			
                    <div class="row">
                        <div class="col-xl-12 col-lg-8">
                        
                            <div class="section3125">
                                        <div  id="success" style={{display:"none"}}><Success name="Add to cart"/></div>
                                        <div  id="login" style={{display:"none"}}><Success name="Login Successful"/></div>
                                        <div  id="warning" style={{display:"none"}} ><Warning name="Already exits"/></div>
                                        <div  id="saved" style={{display:"none"}}><Success name={this.props.savedSuccess}/></div>
 
                                {/* <div class="explore_search">
                                    
                                    <div class="ui search focus">
                                        <div class="ui left icon input swdh11">
                                            
                                            <input class="prompt srch_explore" type="text" placeholder="Search for Tuts Videos, Tutors, Tests and more.."/>
                                            <i class="uil uil-search-alt icon icon2"></i>
                                        </div>
                                    </div>
                                </div>							 */}
                            </div>							
                        </div>
                        <div class="col-md-12">
                            <div class="_14d25">
                                <div class="row">
                                {
                                    this.props.courses.map((course,index) => {
                                        return (
                                            <div class="col-lg-3 col-md-4" >
                                                <div class="fcrse_1 mt-30" >
                                                    <Link to={`/course/${course.id}`} params={course.id} class="fcrse_img" >
                                                        <img  src={course.imageVideoDescription} alt="" style={{height:"200px"}}/>
                                                        <div class="course-overlay">
                                                            <span class="play_btn1"><i class="uil uil-play"></i></span>
                                                            {course.avgRatting?
                                                                <div class="crse_reviews">
                                                                    <i class='uil uil-star'></i>{course.avgRatting.toFixed(1)}
                                                                </div>:
                                                                <div class="crse_reviews">
                                                                <i class='uil uil-star'></i>0.0
                                                            </div>}
                                                            <div class="crse_timer">
                                                                {course.videoDuration}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <div class="fcrse_content">
                                                        <div class="eps_dots more_dropdown">
                                                            {/* <Link to={`/course/${course.id}`} params={course.id}><i class="uil uil-ellipsis-v"></i></Link> */}
                                                            {/* <div class="dropdown-content">
                                                                <span><i class='uil uil-share-alt'></i>Share</span>
                                                                {course.saved?
                                                                <span type="button" onClick={()=>this.savedCourse(course.id)}><i className="iconify" data-icon="bi:heart-fill" style={{marginRight:"10px",marginLeft:"5px"}}></i> Unsaved</span>
                                                                :<span type="button" onClick={()=>this.savedCourse(course.id)}><i className="uil uil-heart"></i>Save</span>
                                                                }
                                                                <span><i class='uil uil-ban'></i>Not Interested</span>
                                                                <span><i class="uil uil-windsock"></i>Report</span>
                                                            </div>																											 */}
                                                        </div>
                                                        <div class="vdtodt">
                                                            {/* <span class="vdt14">109k views</span> */}
                                                            {course.updatedDate?
                                                            <span class="vdt14">Update {moment(course.updatedDate).format('MMM DD, YYYY')}</span>:''}
                                                            
                                                        </div>
                                                        <Link to={`/course/${course.id}`} params={course.id} class="crse14s">{course.title}</Link>
                                                        
                                            
                                                        <Link to={`/course/${course.id}`} params={course.id} class="crse-cate">{course.language=='VN'?'Vietnamese':course.language=='ENG'?'English':course.language=='FR'?'French':course.language=='JP'?'Japanese':''} </Link>
                                                        <div class="auth1lnkprce">
                                                        <div class="prce142">${course.price}</div>
                                                            {/* <button class="shrt-cart-btn" title="cart" type="button" onClick={() => this.props.addToCart(this.props.cartItems, course)}><i class="uil uil-shopping-cart-alt"></i></button> */}
                                                        </div>
                                                    </div>
                                                </div>													
                                            </div>  
                                        )
                                    })
                                }   
                                </div>	
                            </div>		
                        </div>		
                    </div>
                    <br></br>
                    
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
                    :'' } 
                </div>
            </div>
            
            <FooterUser/>
	    </div>  
      );
    }
  
};

const mapStateToProps = state => {
    return {        
        courses: state.course.courses,
        page: state.course.page,
        totalPages: state.course.totalPages,
        cartItems: state.cart.items,
        savedSuccess: state.savedCourse.savedSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCourseRequest:(e) => dispatch (fetchCourseRequest(e)),
        addToCart:(e,p) => dispatch (addToCart(e,p)),
        fetchSavedRequest:(e) => dispatch (fetchSavedRequest(e)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Course);
