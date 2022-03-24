import axios from "axios";
import $ from "jquery";
import moment from 'moment';
import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { courseByIdRequest } from "../../actions/course";
import { createLectureRequest, deleteLectureRequest, fetchLectureByIdRequest, updateLectureRequest } from "../../actions/lecture";
import { createLessonRequest, deleteLessonRequest, fetchLessonByCourseIdRequest, fetchLessonByIdRequest, updateLessonRequest } from "../../actions/lesson";
import { withRouterParams } from "../../Admin/Auth/withRouter";
import Error from "../../Alert/error";
import Success from "../../Alert/success";
import authHeader from "../../config/authHeader";
import Footer from "../Layout/footer";
import validator from 'validator';

class CourseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            id : this.props.params.id,  
            newLesson:{},
            status:'',     
            switch: '',
            changeSwitch: false,
            newLecture:{},
            addLecture:{
                title:'',
                videoDuration:'',
                videoUrl:'',
                sort:'',
                preview:'false'
            },
            course: this.props.course,
            error:{},
        }
    }

    componentDidMount(){
        this.props.courseByIdRequest(this.state.id);
    } 

    getSwitch = (preview) => {
        this.setState({switch:preview})
    }
    
    switch =  () => {
        this.state.changeSwitch?
            this.setState({
                changeSwitch: false,
            }):
            this.setState({
                changeSwitch: true,
            });
    }

    changeSwitch =  () => {
        this.state.switch?
            this.setState({
                switch: false
            }):
            this.setState({
                switch: true
            });
    }

    handleInputLessonChange = (e) => {   
        let formData = Object.assign({}, this.state.newLesson);    
        formData[e.target.name] = e.target.value;        
        this.setState({newLesson:formData});  
        console.log(formData)  
    }

    handleInputLectureChange = (e) => {   
        let formData = Object.assign({}, this.state.newLecture);    
        formData[e.target.name] = e.target.value;        
        this.setState({newLecture:formData});  
        console.log(formData)  
    }

    handleInputLectureCreateChange = (e) => {   
        let formData = Object.assign({}, this.state.addLecture);    
        formData[e.target.name] = e.target.value;        
        this.setState({addLecture:formData});  
        console.log(formData)  
    }

    updateLesson = (lesson, courseId, edit) => {
        edit.courseId=courseId;
        let newForm = Object.assign(lesson,edit);
        this.props.updateLessonRequest(newForm,courseId);
        this.setState({newLesson:{}}); 
    }

   

    createLesson = (courseId, add) => {
        add.courseId=courseId;
        this.props.createLessonRequest(add,courseId);
        Array.from(document.querySelectorAll('.lesson')).forEach(input=>(input.value=""))
        this.setState({newLesson:{}}); 

    }

    deleteLesson = (id, courseId) => {
        
        this.props.deleteLessonRequest(id, courseId);
          
        // Array.from(document.querySelectorAll('input')).forEach(input=>(input.defaultValue=""))
    }

    closeModal = () => {
        this.setState({
            error: {}
        })
    }
    
    validate = (sort,idLes, data) => {
        const error = {}
        let isValid = true;
        data.map((les) => 
        (les.id == idLes) ? (
            les.lectures.map((lec) => (
                (lec.sort==sort)?(
                    isValid = false,
                    error['sort'] = 'Sort already exists'
                ):''
            ))
        ):''
        )
        if (this.state.newLecture.videoUrl !== undefined) {
            var pattern = new RegExp(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch))((\w|-){11})(?:\S+)?$/i);
            if (!pattern.test(this.state.newLecture.videoUrl)) {
              isValid = false;
              error["videoUrl"] = "Please enter valid youtube url.";
            }
        }
        
        this.setState({
            error: error
        })

        return isValid;
    }

    updateLecture = (lecture, lessonId, courseId, edit) => {
        axios.get('http://localhost:8080/api/course/'+courseId+'/lessons',{ headers: authHeader() }).then((res) => {
        if(this.validate(edit.sort, lessonId, res.data.data)){
        edit.lessonId=lessonId;
        let newForm = Object.assign(lecture,edit);
        console.log(newForm);
        this.props.updateLectureRequest(newForm,courseId);
        this.setState({newLecture:{
            
        }})
        $('#idlec'+lecture.id).hide();
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        }
        
        })
    } 

    validateCreate = (sort,idLes, data) => {
        const error = {}
        let isValid = true;
        data.map((les) => 
        (les.id == idLes) ? (
            les.lectures.map((lec) => (
                (lec.sort==sort)?(
                    isValid = false,
                    error['sortCreate'] = 'Sort already exists'
                ):''
            ))
        ):''
        )
        
        if(validator.isEmpty(this.state.addLecture.sort)){            
            error['sortCreate'] = 'The field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addLecture.title)){            
            error['titleCreate'] = 'The field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addLecture.videoUrl)){            
            error['videoUrlCreate'] = 'The field is required.';
            isValid = false;
        }
        else {
            var pattern = new RegExp(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch))((\w|-){11})(?:\S+)?$/i);
            if (!pattern.test(this.state.addLecture.videoUrl)) {
              isValid = false;
              error["videoUrlCreate"] = "Please enter valid youtube url.";
            }
        }

        if(validator.isEmpty(this.state.addLecture.videoDuration)){            
            error['videoDurationCreate'] = 'The field is required.';
            isValid = false;
        }                
       
        this.setState({
            error: error
        })

        return isValid;
    }

    createLecture = (courseId, lessonId, add) => {
        axios.get('http://localhost:8080/api/course/'+courseId+'/lessons',{ headers: authHeader() }).then((res) => {
          
        if(this.validateCreate(add.sort, lessonId, res.data.data)){
        add.lessonId=lessonId;
        // console.log(add)
        this.props.createLectureRequest(add,courseId);
        Array.from(document.querySelectorAll('.lecture')).forEach(input=>(input.value=""))
        this.setState({changeSwitch:false})
        this.setState({addLecture:{
            title:'',
            videoDuration:'',
            videoUrl:'',
            sort:'',
            preview:'false'
        }})
        $('#idlecCreate'+lessonId).hide();
        $('body').removeClass('modal-open');
        $('.modal-backdrop').hide()
        }
        })
    }

    deleteLecture = (id, courseId) => {
        this.props.deleteLectureRequest(id, courseId);
    }

    render(){
        let dem = 0;
        console.log( this.props.course.lessons)
        console.log(this.props.course)
      return (
        <div className="wrapper _bg4586">
            
            {this.props.messageSuccessLesson=="Success"?
            <div  id="success" style={{display:"none"}}><Success name={this.props.messageSuccessLesson}/></div>:
            <div  id="error" style={{display:"none"}}><Error name={this.props.messageSuccessLesson}/></div>}
            {this.props.messageSuccessLecture=="Success"?
            <div  id="success" style={{display:"none"}}><Success name={this.props.messageSuccessLecture}/></div>:
            <div  id="error" style={{display:"none"}}><Error name={this.props.messageSuccessLecture}/></div>}

            <div  id="sort" style={{display:"none"}}><Error name='Sort already exists'/></div>

            <div className="_215b01">
                <div className="container-fluid">			
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section3125">							
                                <div className="row justify-content-center">						
                                    <div className="col-xl-4 col-lg-5 col-md-6">						
                                        <div className="preview_video">						
                                            <a href="#" className="fcrse_img" data-toggle="modal" data-target="#videoModal">
                                                <img src={this.props.course.imageVideoDescription} alt="" style={{height:"190px"}}/>
                                                <div className="course-overlay">
                                                    {/* <div className="badge_seller">Bestseller</div> */}
                                                    <span className="play_btn1"><i className="uil uil-play"></i></span>
                                                    <span className="_215b02">Preview this course</span>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="_215b10">										
                                           
                                        </div>
                                    </div>
                                    <div className="modal vd_mdl fade" id="videoModal"   role="dialog" aria-hidden="true">
                                        <div className="modal-dialog modal-lg" role="document">
                                            <div className="modal-content">
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                                <div className="modal-body">
                                                    <iframe  src={this.props.course.urlVideoDescription} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-8 col-lg-7 col-md-6">
                                        <div className="_215b03">
                                            <h2>{this.props.course.title}</h2>
                                            <span className="_215b04">{this.props.course.shortDescription}</span>
                                        </div>
                                        
                                        {/* <div className="_215b05">
                                            <div className="crse_reviews mr-2">
                                                <i className="uil uil-star"></i>4.5
                                            </div>
                                            (81,665 ratings)
                                        </div>
                                        <div className="_215b05">										
                                            114,521 students enrolled
                                        </div>
                                        <div className="_215b06">										
                                            <div className="_215b07">										
                                                <span><i className='uil uil-comment'></i></span>
                                                English
                                            </div>
                                            <div className="_215b08">										
                                                <span><i className='uil uil-closed-captioning'></i></span>
                                                <span>English, Dutch
                                                    <span className="caption_tooltip">
                                                        12 more
                                                        <span className="caption-content">
                                                            <span>French</span>
                                                            <span>Hindi</span>
                                                            <span>German [Auto-generated]</span>
                                                            <span>Indonesian [Auto-generated]</span>
                                                            <span>Italian [Auto-generated]</span>
                                                            <span>Japanese [Auto-generated]</span>
                                                            <span>Korean</span>
                                                            <span>Polish</span>
                                                            <span>Portuguese [Auto-generated]</span>
                                                            <span>Spanish [Auto-generated]</span>
                                                            <span>Traditional Chinese</span>
                                                            <span>Turkish [Auto-generated]</span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="_215b05">										
                                            Last updated 1/2020
                                        </div> */} 
                                        <div className="_215b05">										
                                            <span><i className='uil uil-comment'></i></span>
                                            {this.props.course.language=='VN'?'Vietnamese':this.props.course.language=='ENG'?'English':this.props.course.language=='FR'?'French':this.props.course.language=='JP'?'Japanese':''}
                                        </div>
                                        {this.props.course.updatedDate? 
                                        <div className="_215b05">										
                                            Last updated:  {moment(this.props.course.updatedDate).format('MMM DD, YYYY')}
                                        </div> :'' }
                                        <ul className="_215b31">										
                                            <li><Link to={`/edit-course/${this.props.course.id}`} params={this.props.course.id} ><button className="btn_adcart" type="button" >Edit</button></Link></li>
                                            {/* <li><button className="btn_adcart" type="button" > Add more Lesson</button></li>
                                            <li><button className="btn_adcart" type="button" >Add more Lecture</button></li> */}
                                        </ul>
                                    </div>							
                                </div>							
                            </div>							
                        </div>															
                    </div>
                </div>
            </div>
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
                                        {/* <div className="_112456">
                                            
                                            <ul className="accordion-expand-holder">
                                                
                                            
                                                
                                                <li><button className="btn_adcart" type="button" >Edit</button></li>
                                            </ul>
                                        </div> */}
                                            <div className="_htg452">
                                                <h3>Requirements</h3>
                                                <ul className="_abc124">
                                                    <li><span className="_5f7g11">{this.props.course.requirement}</span></li>
                                                </ul>
                                            </div>
                                            
                                            <div className="_htg452 mt-35">
                                                <h3>Description</h3>
                                                <ul className="_abc124">
                                                    <li><span className="_5f7g11">{this.props.course.description}</span></li>
                                                </ul>
                                           </div>
                                            <div className="_htg452 mt-35">
                                                <h3>Who this course is for :</h3>
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
                                                    <li><button className="btn_adcart" type="button"  data-toggle="modal" data-target={'#idlesCreate'+this.props.course.id}><i class="far fa-plus-square mr-2" style={{fontSize:"17px"}}></i>Lesson</button></li>
                                                    {/* <li><span className="accordion-expand-all _d1452">Expand all</span></li> */}
                                                    
                                                    {/* <li><span className="_fgr123">{this.props.course.videoDuration}</span></li> */}
                                                </ul>
                                            </div>
                                            
                                            {/* ----- POPUP CREATE LESSON */}
                                            <div className="modal fade"    id={'idlesCreate'+this.props.course.id} aria-hidden="true">
                                                <div className="modal-dialog modal-lg">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">Add New Lesson</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="new-section-block">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="new-section">
                                                                            <div className="form_group">
                                                                            <input className="form_input_1" type="hidden" name="courseId" value={this.props.course.id}/>
                                                                                <label className="label25">Lesson Title*</label>
                                                                                <input className="form_input_1 lesson" type="text" name="title"  onChange={this.handleInputLessonChange} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="main-btn cancel" data-dismiss="modal">Close</button>
                                                            <button type="button" className="main-btn" data-dismiss="modal" value={'add'} onClick={()=>this.createLesson(this.props.course.id,this.state.newLesson)}>ADD</button>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="accordion" className="ui-accordion ui-widget ui-helper-reset">
                                                { this.props.course.lessons?
                                                     this.props.course.lessons.map((lesson,index) => {
                                                        let lecture=0;
                                                        {lesson.lectures.map((lec)=> {lecture++})}
                                                        return (
                                                            // ----------------------------- EDIT LESSON
                                                            <div id="accordion" className="ui-accordion ui-widget ui-helper-reset">
                                                                <a  className="accordion-header ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all">												
                                                                    <div className="section-header-left">
                                                                        <span className="section-title-wrapper">
                                                                            <i className='uil uil-presentation-play crse_icon' ></i>
                                                                            <span className="section-title-text">{lesson.title}
                                                                            <span style={{marginLeft:"20px"}} className="section-header-length" >
                                                                            <Link to='' title="Edit" className="gray-s" data-toggle="modal" data-target={'#idles'+lesson.id} ><i class="far fa-edit"></i></Link>
                                                                            </span></span>
                                                                            
                                                                        </span>
                                                                    </div>
                                                                    
                                                                    <div className="section-header-right">
                                                                        <span stype="button" data-toggle="modal" data-target={'#idlecCreate'+lesson.id} ><i class="far fa-plus-square mr-2" style={{fontSize:"17px"}} ></i>Lecture</span>
                                                                        {/* <span className="num-items-in-section">{lecture} lectures</span> */}
                                                                        {/* <span className="section-header-length">
                                                                            <Link to='' title="Edit" className="gray-s" data-toggle="modal" data-target={'#idles'+lesson.id} ><i className="uil uil-edit-alt" ></i></Link>
                                                                        </span> */}
                                                                    </div>
                                                                    {/* ----- POPUP ADD MORE LECTURE */}
                                                                    <div className="modal fade"    id={'idlecCreate'+lesson.id} aria-hidden="true">
                                                                                    <div className="modal-dialog modal-lg">
                                                                                        <div className="modal-content">
                                                                                            <div className="modal-header">
                                                                                                <h5 className="modal-title">Add New Lecture</h5>
                                                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                                    <span aria-hidden="true">&times;</span>
                                                                                                </button>
                                                                                            </div>
                                                                                            <div className="modal-body">
                                                                                                <div className="new-section-block">
                                                                                                    <div className="row">
                                                                                                        <div className="col-md-12">
                                                                                                            <div className="new-section">
                                                                                                                <div className="form_group">
                                                                                                                <input className="form_input_1" type="hidden" name="id" value={lecture.id} />
                                                                                                                    <label className="label25">Lecture Title*</label>
                                                                                                                    <input className="form_input_1 lecture" type="text" name="title" onChange={this.handleInputLectureCreateChange}/>
                                                                                                                </div>
                                                                                                               {this.state.error.titleCreate && <div className="validation alert alert-warning">{this.state.error.titleCreate}</div>}

                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="col-lg-4 col-md-6">
                                                                                                            <div className="ui search focus mt-30 lbel25">
                                                                                                                <label>Sort*</label>
                                                                                                                <div className="ui left icon input swdh19">
                                                                                                                    <input className="prompt srch_explore lecture" type="number" min="1" max="100" placeholder="1" name="sort" onChange={this.handleInputLectureCreateChange} />
                                                                                                                </div>
                                                                                                                {this.state.error.sortCreate && <div className="validation alert alert-warning">{this.state.error.sortCreate}</div>}

                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="col-lg-5 col-md-6">
                                                                                                            <div className="ui search focus mt-30 lbel25">
                                                                                                                <label>Duration*</label>
                                                                                                                <div className="ui left icon input swdh19">
                                                                                                                    <input className="prompt srch_explore lecture" type="number" min="1" max="100" placeholder="1" name="videoDuration" onChange={this.handleInputLectureCreateChange} />
                                                                                                                </div>
                                                                                                                {this.state.error.videoDurationCreate && <div className="validation alert alert-warning">{this.state.error.videoDurationCreate}</div>}

                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="col-lg-3 col-md-3">
                                                                                                            <div className="mt-30 lbel25">
                                                                                                                    <label>Preview*</label>
                                                                                                            </div>
                                                                                                            <div className="preview-dt">
                                                                                                                {
                                                                                                                this.state.changeSwitch?
                                                                                                                    <label className="switch" >
                                                                                                                        <input  type="checkbox" name="preview" checked value="false" onClick={()=>this.switch()} onChange={this.handleInputLectureCreateChange}/>
                                                                                                                        <span  style={{width:"40px"}}></span>
                                                                                                                    </label>
                                                                                                                :
                                                                                                                <label className="switch" >
                                                                                                                    <input  type="checkbox"  name="preview" value="true" onClick={()=>this.switch()} onChange={this.handleInputLectureCreateChange}/>
                                                                                                                    <span style={{width:"40px"}}></span>
                                                                                                                </label>
                                                                                                                }
                                                                                                                
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        
                                                                                                        <div className="col-lg-9 col-md-12">
                                                                                                            <div className="ui search focus mt-30 lbel25">
                                                                                                                <label>Youtube URL*</label>
                                                                                                                <div className="ui left icon input swdh19 swdh95">
                                                                                                                    <input className="prompt srch_explore lecture" type="text" placeholder="Youtube video URL" name="videoUrl" onChange={this.handleInputLectureCreateChange} />
                                                                                                                </div>
                                                                                                                {this.state.error.videoUrlCreate && <div className="validation alert alert-warning">{this.state.error.videoUrlCreate}</div>}

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="modal-footer">
                                                                                                <button type="button" className="main-btn cancel" data-dismiss="modal">Close</button>
                                                                                                <button type="button" className="main-btn" value={'edit'}  onClick={()=>this.createLecture(this.props.course.id,lesson.id,this.state.addLecture)}>Add</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                    {/* --------- POPUP EDIT LESSON */}
                                                                    <div className="modal fade"   id={'idles'+lesson.id} aria-hidden="true">
                                                                        <div className="modal-dialog modal-lg">
                                                                            <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                    <h5 className="modal-title">Edit Lesson</h5>
                                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                        <span aria-hidden="true">&times;</span>
                                                                                    </button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                    <div className="new-section-block">
                                                                                        <div className="row">
                                                                                            <div className="col-md-12">
                                                                                                <div className="new-section">
                                                                                                    <div className="form_group" key={`ok${lesson.id}`}>
                                                                                                    <input className="form_input_1" type="hidden" name="id" value={lesson.id}/>
                                                                                                    <input className="form_input_1" type="hidden" name="courseId" value={this.props.course.id}/>
                                                                                                        <label className="label25">Lesson Title*</label>
                                                                                                        <input className="form_input_1" type="text" name="title"  defaultValue={lesson.title} onChange={(value)=>this.handleInputLessonChange(value)} />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                    <button type="button" className="main-btn cancel" data-dismiss="modal">Close</button>
                                                                                    <button type="button" className="main-btn" data-dismiss="modal" value={'edit'} onClick={()=>this.updateLesson(lesson,this.props.course.id,this.state.newLesson)}>UPDATE</button>
                                                                                    {/* <button type="button" className="main-btn" data-dismiss="modal" value={'delete'} onClick={()=>this.deleteLesson(lesson.id, this.props.course.id)} ><i className="uil uil-trash-alt"></i>DELETE</button> */}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    
                                                                </a>
                                                                {/* -------------- EDIT LECTURE */}
                                                                <div className="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom">
                                                                    {lesson.lectures.map((lecture,i)=>{
                                                                        
                                                                    return (
                                                                            
                                                                            <div className="lecture-container">
                                                                                <div className="left-content">
                                                                                    <i className='uil uil-file icon_142'></i>
                                                                                    <div className="top">
                                                                                        <div className="title">{lecture.title}</div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="details">
                                                                                    {lecture.videoUrl?
                                                                                    (lecture.preview?
                                                                                    <a href="#" className="preview-text" data-toggle="modal" data-target={"#videoModalLecture"+lecture.id}>Preview</a>:''):''}
                                                                                    {/* <span className="content-summary">{lecture.videoDuration}</span> */}
                                                                                    <span className="content-summary">
                                                                                    <Link to='' title="Edit" className="gray-s" data-toggle="modal" data-target={'#idlec'+lecture.id} onClick={()=>this.getSwitch(lecture.preview)}><i class="fas fa-edit"></i></Link>
                                                                                    </span>
                                                                                
                                                                                </div>

                                                                                {/* ------------------------ POPUP EDIT LECTURE */}
                                                                                <div className="modal fade update"  id={'idlec'+lecture.id} aria-hidden="true">
                                                                                    <div className="modal-dialog modal-lg">
                                                                                        <div className="modal-content">
                                                                                            <div className="modal-header">
                                                                                                <h5 className="modal-title">Edit Lecture</h5>
                                                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                                    <span aria-hidden="true">&times;</span>
                                                                                                </button>
                                                                                            </div>
                                                                                            <div className="modal-body">
                                                                                                <div className="new-section-block">
                                                                                                    <div className="row">
                                                                                                        <div className="col-md-12">
                                                                                                            <div className="new-section">
                                                                                                                <div className="form_group" key={`title${lecture.id}`}>
                                                                                                                    <label className="label25">Lecture Title*</label>
                                                                                                                    <input className="form_input_1 lec" type="text" name="title"  defaultValue={lecture.title} onChange={this.handleInputLectureChange}/>
                                                                                                                    
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="col-lg-4 col-md-6">
                                                                                                            <div className="ui search focus mt-30 lbel25">
                                                                                                                <label>Sort*</label>
                                                                                                                <div className="ui left icon input swdh19" key={`sort${lecture.id}`} >
                                                                                                                    <input className="prompt srch_explore lec" type="number" min="1" max="100" placeholder="1" name="sort" defaultValue={lecture.sort} onChange={this.handleInputLectureChange} />
                                                                                                                </div>
                                                                                                                {this.state.error.sort && <div className="validation alert alert-warning">{this.state.error.sort}</div>}


                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="col-lg-5 col-md-6">
                                                                                                            <div className="ui search focus mt-30 lbel25">
                                                                                                                <label>Duration*</label>
                                                                                                                <div className="ui left icon input swdh19" key={`duration${lecture.id}`}>
                                                                                                                    <input className="prompt srch_explore lec" type="number" min="1" max="100" placeholder="1" name="videoDuration" defaultValue={lecture.videoDuration} onChange={this.handleInputLectureChange} />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="col-lg-3 col-md-3">
                                                                                                            <div className="mt-30 lbel25">
                                                                                                                    <label>Preview*</label>
                                                                                                            </div>
                                                                                                            <div className="preview-dt">
                                                                                                                {
                                                                                                                this.state.switch?
                                                                                                                    <label className="switch">
                                                                                                                        <input  type="checkbox" name="preview" checked value="false"  onClick={()=>this.changeSwitch()} onChange={this.handleInputLectureChange}/>
                                                                                                                        <span  style={{width:"40px"}}></span>
                                                                                                                    </label>
                                                                                                                :
                                                                                                                <label className="switch" >
                                                                                                                    <input  type="checkbox"  name="preview" value="true" onClick={()=>this.changeSwitch()} onChange={this.handleInputLectureChange}/>
                                                                                                                    <span style={{width:"40px"}}></span>
                                                                                                                </label>
                                                                                                                }
                                                                                                                
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        
                                                                                                        <div className="col-lg-9 col-md-12">
                                                                                                            <div className="ui search focus mt-30 lbel25" >
                                                                                                                <label>Youtube URL*</label>
                                                                                                                <div className="ui left icon input swdh19 swdh95" key={`youtube${lecture.id}`}>
                                                                                                                    <input className="prompt srch_explore lec" type="text" placeholder="Youtube video URL" name="videoUrl" defaultValue={lecture.videoUrl} onChange={this.handleInputLectureChange}/>
                                                                                                                </div>
                                                                                                                {this.state.error.videoUrl && <div className="validation alert alert-warning">{this.state.error.videoUrl}</div>}

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="modal-footer">
                                                                                                <button type="button" className="main-btn cancel" data-dismiss="modal" onClick={()=>this.closeModal()}>Close</button>
                                                                                                <button type="button" className="main-btn" value={'edit'}  onClick={()=>this.updateLecture(lecture,lesson.id,this.props.course.id,this.state.newLecture)}   >Update</button>
                                                                                                {/* <button type="button" className="main-btn" data-dismiss="modal" value={'delete'} onClick={()=>this.deleteLecture(lecture.id, this.props.course.id)} ><i className="uil uil-trash-alt"></i>DELETE</button> */}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="modal vd_mdl fade" id={"videoModalLecture"+lecture.id}   role="dialog" aria-hidden="true">
                                                                                    <div className="modal-dialog modal-lg" role="document">
                                                                                        <div className="modal-content">
                                                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                                <span aria-hidden="true">&times;</span>
                                                                                            </button>
                                                                                            <div className="modal-body">
                                                                                                <iframe  src={lecture.videoUrl} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                                                                            </div>
                                                                                            
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            )
                                                                    })}
                                                                </div>
                                                                    
                                                            </div>
                                                            
                                                        )
                                                    })
                                                    
                                                :''}			
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="nav-reviews" role="tabpanel">
                                        <div className="student_reviews">
                                            <div className="row">
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
            <Footer/>
	    </div>
      );
    }
  
};

const mapStateToProps = state => {
    return {        
        course: state.course.courseById,
        lesson: state.lesson.lesson,
        messageSuccessLesson: state.lesson.messageSuccess,
        lecture: state.lecture.lecture,
        messageSuccessLecture: state.lecture.messageSuccess,
        lessons: state.lesson.lessons,
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        courseByIdRequest:(e) => dispatch (courseByIdRequest(e)),
        fetchLessonByCourseIdRequest:(e) => dispatch(fetchLessonByCourseIdRequest(e)),

        fetchLessonByIdRequest:(e) => dispatch (fetchLessonByIdRequest(e)),
        updateLessonRequest:(e,i) => dispatch (updateLessonRequest(e,i)),
        createLessonRequest:(e,i) => dispatch (createLessonRequest(e,i)),
        deleteLessonRequest:(e,i) => dispatch (deleteLessonRequest(e,i)),

        fetchLectureByIdRequest: (e) => dispatch (fetchLectureByIdRequest(e)),
        updateLectureRequest:(e,i) => dispatch (updateLectureRequest(e,i)),
        createLectureRequest:(e,i) => dispatch (createLectureRequest(e,i)),
        deleteLectureRequest:(e,i) => dispatch (deleteLectureRequest(e,i))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouterParams(CourseDetail));;
