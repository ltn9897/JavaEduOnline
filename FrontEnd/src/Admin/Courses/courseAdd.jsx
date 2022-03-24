import React, { Component } from 'react';
import Footer from '../Layout/footer';
import axios from 'axios';
import { fetchCatalogRequest} from "../../actions/catalog";
import {fetchSubCatalogRequest} from "../../actions/subCatalog";
import {connect} from 'react-redux';
import authHeader from "../../config/authHeader";
import $, { data } from 'jquery';
import validator from 'validator';
import {withRouter} from '../Auth/withRouter';
import Success from "../../Alert/success";
import Error from "../../Alert/error";
import {Link} from "react-router-dom";
import {imageRequest} from "../../actions/course"

let lectures = [];
let lessons =[] ;
let lesslec = [] ;
let idLesson = 1;
let idLecture = 1 ;    

class CourseAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {

            addCourse: {
                language:'',
                title:'',
                shortDescription:'',
                description:'',
                requirement:'',
                whoThisCourseIsFor:'',
                whatYouWillLearn:'',
                price:'',
                videoDuration:'',
                urlVideoDescription:'',
                imageVideoDescription:'',
                activate:'',
                },

            addLesson: {
                id: '',
                title:'',
            },
            
            addLecture:{
                id:'',
                title:'',
                videoUrl:'',
                videoDuration:'',
                preview:'false',
                sort:'',
            },

            select:'',

            show:'1',

            classStep1:'active',
            classStep2:'',
            classStep3:'',
            classStep4:'',
            classStep5:'',

            image:'',
            video:'',
            
            error: {},

            lesson:[],

            switch:false,

            status: '',

            course:'',

            ava:'',
        }
    }

    
    // ------------------------- Alert + Step + NextPage + PrevPage  --------------
    handleSuccess = () => {
        $('#success').fadeIn('fast').delay(2000).fadeOut('fast');
		
		setTimeout(()=>{
			this.props.navigate('/courses')
		},1000);
		
	} 

    handleError = () => {
        $('#error').fadeIn('fast').delay(2000).fadeOut('slow');
		
	} 

    changeSwitch =  () => {
        this.state.switch?
            this.setState({
                switch: false
            }):
            this.setState({
                switch: true
            });
        console.log(this.state.switch)
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

    handleClick = (num) =>{
        if(num==1){
            this.setState({classStep1:'active',classStep2:'',classStep3:'',classStep4:'',classStep5:'',show: '1'
        })
        }
        if(num==2 && this.validateStep1()){
            this.setState({classStep1:'done',classStep2:'active',classStep3:'',classStep4:'', classStep5:'',show: '2'
            })
        }
        if(num==3 && this.validateStep2()){
            this.setState({classStep1:'done',classStep2:'done',classStep3:'active',classStep4:'',classStep5:'',show: '3'
        })
        }
        if(num==4 && this.validateStep3()){
            this.setState({classStep1:'done',classStep2:'done',classStep3:'done',classStep4:'active',classStep5:'',show: '4'
        })
        }
        if(num==5 && this.validateStep4()){
            this.setState({classStep1:'done',classStep2:'done',classStep3:'done',classStep4:'done',classStep5:'active',show: '5'
        })
        }
    }
    
    handleSelect = e => {            
        this.setState({select: e.target.value});  
        console.log(e.target.value)
    }

    handleLesson = e => {
        let select = Object.assign({}, this.state.lesson); 
        console.log(select)
        select[e.target.name] = e.target.value;        
        this.setState({lesson:select});  
        console.log(select);

        //this.setState({...this.state.lesson, title: e.target.value});  
        // console.log(e.target.value)
        // console.log(this.state.lesson)
    }

    pageNext = () => {
        
        this.state.show=='1'?
            this.validateStep1()&&this.setState({show: '2', classStep1:'done',classStep2:'active',classStep3:'',classStep4:'', classStep5:''
            }):this.state.show=='2'?
            this.validateStep2()&&this.setState({classStep1:'done',classStep2:'done',classStep3:'active',classStep4:'',classStep5:'',show: '3'
            }):this.state.show=='3'?
            this.validateStep3()&&this.setState({classStep1:'done',classStep2:'done',classStep3:'done',classStep4:'active',classStep5:'',show: '4'
            }):
            this.validateStep4()&&this.setState({classStep1:'done',classStep2:'done',classStep3:'done',classStep4:'done',classStep5:'active',show: '5'
            })
        
    }

    pagePrev = () => {
        this.state.show=='5'?
            this.setState({show: '4'
            }):this.state.show=='4'?
            this.setState({show: '3'
            }):this.state.show=='3'?
            this.setState({show: '2'
            }):
            this.setState({show: '1'
            })
    }

    // -------------------------  Lesson  -----------------------------

    formLesson = e => {   
        let formDataLesson = Object.assign({}, this.state.addLesson);    
        formDataLesson[e.target.name] = e.target.value;        
        this.setState({addLesson:formDataLesson});  
        // console.log(formDataLesson)  
    }

    newLesson = (add) => {
        if(this.validateLesson()){
        idLesson++;
        add.id=idLesson;
        lessons.push(add);
        this.setState({addLesson: {id: '' ,title:'',}});
        Array.from(document.querySelectorAll('input')).forEach(input=>(input.value=""))
        }
    }

    removeLesson = (del) => {
        
        for (var i=0; i< lessons.length; i++){
            if(lessons[i].id === del){
                lessons.splice(i,1);
            }
        }
        this.setState({addLesson:lessons});
    }

    // -------------------------  Lecture  -----------------------------
    formLecture = e => {   
        let formDataLecture = Object.assign({}, this.state.addLecture); 
        //console.log(formDataLecture)
        formDataLecture[e.target.name] = e.target.value;        
        this.setState({addLecture:formDataLecture});  
        console.log(formDataLecture);
    }

    validateSort = (sort,select) => {
        const error = {}
        let isValid = true;
        console.log(select)
        lesslec.map((less) => (
            less.title==select?(
            less.lectures.map((lec) => (
                lec.sort==sort?(
                    error['sort'] = 'Sort already exists',
                    isValid = false
                ):''
            ))):''
        ))
        this.setState({
            error: error
        })

        return isValid;
    } 

    newLecture = (lesson, add) => {
        if(this.validateSort(add.sort,lesson.title)&&this.validateLecture()){
        idLecture++;
        add.id=idLecture;
        lectures.push(add);
        console.log(lectures)
        lesson.lectures = lectures;
        lesslec.push(lesson);
        console.log(lesslec)
        this.setState({addLecture: {id:'', title:'',
                videoUrl:'',
                videoDuration:'',
                preview:'false',
                sort:'',}});
        this.setState({switch:''})
        lectures=[];
        lesson=[];
        Array.from(document.querySelectorAll('input')).forEach(input=>(input.value=""));
        Array.from(document.querySelectorAll('select')).forEach(select=>(select.value=""))  ;
        //console.log(lesslec);
        this.setState({course:lesslec})
        }
    }

    removeLecture = (del) => {
        
        let tmp =[]
        for (var i=0; i< lesslec.length; i++){
            tmp = lesslec[i].lectures;
            for (var j=0; j<tmp.length;j++){
                console.log('lecture', tmp[j].id)
                console.log('delte',del)
                if(tmp[j].id === del){
                    lesslec.splice(i,1);
                }   

            }
        }
        this.setState({addLecture: {id:'', title:'',
        videoUrl:'',
        videoDuration:'',
        preview:'false',
        sort:'',}});

        console.log(lectures);
        console.log(lesslec);
    }

    // -------------------------  Course  -----------------------------
    formCourse = e => {   
        let formDataCourse = Object.assign({}, this.state.addCourse);  
        if (e.target.files && e.target.files[0]) {
            if (e.target.accept=="image/*"){
                this.setState({
                    image: URL.createObjectURL(e.target.files[0])
                })
                formDataCourse[e.target.name] = 'http://localhost:8080/images/'+e.target.files[0].name
                this.setState({ava:e.target.files[0]})
            }
            else{
                this.setState({
                    video: e.target.files[0].name
                  })
                formDataCourse[e.target.name] = e.target.files[0].name
            }
            
            this.setState({addCourse:formDataCourse});  
        }
        else {
        formDataCourse[e.target.name] = e.target.value;        
        this.setState({addCourse:formDataCourse});  
        console.log(formDataCourse)  
        }
    }

    course = (courseAdd) => {
        let tmp
        lessons.map((les,i) =>
            (
                tmp =[],
                lesslec.map((lec,k) => (
                    les.title==lec.title? (
                        lec.lectures.map((le,j)=>(
                            delete le.id,
                            tmp.push(le)
                        )),
                        // tmp.push(lec.lectures),
                        les.lectures=tmp):''
                ))
            )
        )
        lessons.map((les,i) =>
            (
                delete les.id
            )
        )
        
        courseAdd.lessons = lessons
        console.log(courseAdd)
        this.props.imageRequest(this.state.ava)
        axios.post('http://localhost:8080/api/course/create', courseAdd , { headers: authHeader()}).then(res=>{
           
            this.handleSuccess();
        }).catch(error => {this.handleError()})


    }

    courseDraf = (courseAdd) => {
        console.log(courseAdd)
        this.props.imageRequest(this.state.ava)
        axios.post('http://localhost:8080/api/course/create-draft', courseAdd , { headers: authHeader()}).then(res=>{
           
            this.handleSuccess();
        }).catch(error => {this.handleError()})


    }
    
    // ---------------------------- Validate --------------------------
    validateStep1 = () => {
        let isValid = true;

        const error = {}

        if(validator.isEmpty(this.state.addCourse.title)){            
            error['title'] = 'The Title field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addCourse.shortDescription)){            
            error['shortDescription'] = 'The Short Description field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addCourse.description)){            
            error['description'] = 'The Description field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addCourse.requirement)){            
            error['requirement'] = 'The field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addCourse.whatYouWillLearn)){            
            error['whatYouWillLearn'] = 'The field is required.';
            isValid = false;
        }
        if(validator.isEmpty(this.state.addCourse.whoThisCourseIsFor)){            
            error['whoThisCourseIsFor'] = 'The field is required.';
            isValid = false;
        }
        if(validator.isEmpty(this.state.addCourse.price)){            
            error['price'] = 'The field is required.';
            isValid = false;
        }
        if(validator.isEmpty(this.state.addCourse.videoDuration)){            
            error['videoDuration'] = 'The field is required.';
            isValid = false;
        }

        this.setState({
            error: error
        })

        return isValid;
    }

    validateStep2 = () => {
        let isValid = true;

        const error = {}

        if(validator.isEmpty(this.state.addCourse.urlVideoDescription)){            
            error['urlVideoDescription'] = 'The URL field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addCourse.imageVideoDescription)){            
            error['imageVideoDescription'] = 'The Image field is required.';
            isValid = false;
        }

        if (this.state.addCourse.urlVideoDescription !== '') {
            var pattern = new RegExp(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch))((\w|-){11})(?:\S+)?$/i);
            if (!pattern.test(this.state.addCourse.urlVideoDescription)) {
              isValid = false;
              error["urlVideoDescription"] = "Please enter valid youtube url.";
            }
          }

        this.setState({
            error: error
        })

        return isValid;
    }

    validateStep3 = () => {
        let isValid = true;

        const error = {}

        if(lessons == []){            
            error['titleLesson'] = 'The field is required.';
            isValid = false;
        }

        this.setState({
            error: error
        })

        return isValid;
    }

    validateStep4 = () => {
        let isValid = true;

        const error = {}

        if(lesslec==[]){            
            error['titleLecture'] = 'The field is required.';
            isValid = false;
        }

        this.setState({
            error: error
        })

        return isValid;
    }

    validateLesson= ()=> {
        let isValid = true;

        const error = {}

        if(validator.isEmpty(this.state.addLesson.title)){            
            error['titleLesson'] = 'The field is required.';
            isValid = false;
        }

        this.setState({
            error: error
        })

        return isValid;
    }

    validateLecture=()=>{
        let isValid = true;

        const error = {}

        if(validator.isEmpty(this.state.addLecture.title)){            
            error['titleLecture'] = 'The field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addLecture.videoUrl)){            
            error['videoUrlLecture'] = 'The field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addLecture.sort)){            
            error['sortLecture'] = 'The field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addLecture.videoDuration)){            
            error['videoDurationLecture'] = 'The field is required.';
            isValid = false;
        }

        this.setState({
            error: error
        })

        return isValid;
    }

    componentDidMount () {
        this.props.fetchCatalogRequest();
        this.props.fetchSubCatalogRequest();
       
    }
    
    
    render() {
        return (
            <div className="wrapper">
                <div className="sa4d25">
                    <div className="container">			
                        <div className="row">
                            <div className="col-lg-12">	
                                <h2 className="st_title"><i className="uil uil-analysis"></i> Create New Course</h2>
                            </div>					
                        </div>				
                        <div  id="success" style={{display:"none"}}><Success name="Create Successful"/></div>
                        <div  id="error" style={{display:"none"}}><Error name="Create Course Fail"/></div>
                        <div className="row">
                            <div className="col-12">
                                <div className="course_tabs_1">
                                    <div id="add-course-tab" className="step-app">
                                        <ul className="step-steps">
                                            <li className={this.state.classStep1} onClick={()=>{this.handleClick(1)}}>
                                                <a >
                                                    <span className="number"></span>
                                                    <span className="step-name">Basic</span>
                                                </a>
                                            </li>
                                            <li className={this.state.classStep2}  onClick={()=>{this.handleClick(2)}}>
                                                <a >
                                                    <span className="number"></span>
                                                    <span className="step-name">Media</span>
                                                </a>
                                            </li>
                                            <li className={this.state.classStep3}  onClick={()=>{this.handleClick(3)}}>
                                                <a >
                                                    <span className="number"></span>
                                                    <span className="step-name">Lesson</span>
                                                </a>
                                            </li>
                                            <li className={this.state.classStep4}  onClick={()=>{this.handleClick(4)}}>
                                                <a >
                                                    <span className="number"></span>
                                                    <span className="step-name">Lecture</span>
                                                </a>
                                            </li>
                                            <li className={this.state.classStep5}  onClick={()=>{this.handleClick(5)}}>
                                                <a >
                                                    <span className="number"></span>
                                                    <span className="step-name">Publish</span>
                                                </a>
                                            </li>
								        </ul>
                                        <div className="step-content">
            {/* // ____________________ STEP 1 : BASIC _______________________ */}
                                            {this.state.show=='1'?
                                            <div className="step-tab-panel step-tab-info active " id="tab_step1"> 
                                                <div className="tab-from-content">
                                                    <div className="title-icon">
                                                        <h3 className="title"><i className="uil uil-info-circle"></i>Basic Information</h3>
                                                    </div>
                                                    <div className="course__form">
                                                        <div className="general_info10">
                                                            <div className="row">
                                                                <div className="col-lg-12 col-md-12">															
                                                                    <div className="ui search focus mt-30 lbel25">
                                                                        <label>Course Title*</label>
                                                                        <div className="ui left icon input swdh19">
                                                                            <input className="prompt srch_explore" type="text" placeholder="Course title here" name="title" data-purpose="edit-course-title" maxlength="60" onChange={this.formCourse}  />															
                                                                            <div className="badge_num">60</div>
                                                                        </div>
                                                                        {this.state.error.title && <div className="validation alert alert-warning">{this.state.error.title}</div>}
                                                                        <div className="help-block">(Please make this a maximum of 60 characters and unique.)</div>
                                                                    </div>									
                                                                </div>
                                                                <div className="col-lg-12 col-md-12">															
                                                                    <div className="ui search focus lbel25 mt-30">	
                                                                        <label>Short Description*</label>
                                                                        <div className="ui form swdh30">
                                                                            <div className="field">
                                                                                <textarea rows="3" name="shortDescription" placeholder="Item description here..." onChange={this.formCourse}></textarea>
                                                                            </div>
                                                                            {this.state.error.shortDescription && <div className="validation alert alert-warning">{this.state.error.shortDescription}</div>}
                                                                        </div>
                                                                        <div className="help-block">220 words</div>
                                                                    </div>								
                                                                </div>
                                                                <div className="col-lg-12 col-md-12">
                                                                    <div className="course_des_textarea mt-30 lbel25">
                                                                        <label>Course Description*</label>
                                                                        <div className="course_des_bg">
                                                                            {/* <ul className="course_des_ttle">
                                                                                <li><Link to=''><i className="uil uil-bold"></i></Link></li>
                                                                                <li><a href="#"><i className="uil uil-italic"></i></a></li>
                                                                                <li><a href="#"><i className="uil uil-list-ul"></i></a></li>
                                                                                <li><a href="#"><i className="uil uil-left-to-right-text-direction"></i></a></li>
                                                                                <li><a href="#"><i className="uil uil-right-to-left-text-direction"></i></a></li>
                                                                                <li><a href="#"><i className="uil uil-list-ui-alt"></i></a></li>
                                                                                <li><a href="#"><i className="uil uil-link"></i></a></li>
                                                                                <li><a href="#"><i className="uil uil-text-size"></i></a></li>
                                                                                <li><a href="#"><i className="uil uil-text"></i></a></li>
                                                                            </ul> */}
                                                                            <div className="textarea_dt">															
                                                                                <div className="ui form swdh339">
                                                                                    <div className="field">
                                                                                        <textarea rows="5" name="description" placeholder="Insert your course description" onChange={this.formCourse}></textarea>
                                                                                    </div>
                                                                                </div>		
                                                                                {this.state.error.description && <div className="validation alert alert-warning">{this.state.error.description}</div>}								
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12 col-md-12">															
                                                                    <div className="ui search focus lbel25 mt-30">	
                                                                        <label>Requirements*</label>
                                                                        <div className="ui form swdh30">
                                                                            <div className="field">
                                                                                <textarea rows="3" name="requirement" placeholder="Item description here..." onChange={this.formCourse}></textarea>
                                                                            </div>
                                                                            {this.state.error.requirement && <div className="validation alert alert-warning">{this.state.error.requirement}</div>}
                                                                        </div>
                                                                        <div className="help-block">220 words</div>
                                                                    </div>								
                                                                </div>
                                                                <div className="col-lg-6 col-md-12">															
                                                                    <div className="ui search focus lbel25 mt-30">	
                                                                        <label>What will students learn in your course?*</label>
                                                                        <div className="ui form swdh30">
                                                                            <div className="field">
                                                                                <textarea rows="3" name="whatYouWillLearn" placeholder="" onChange={this.formCourse}></textarea>
                                                                            </div>
                                                                            {this.state.error.whatYouWillLearn && <div className="validation alert alert-warning">{this.state.error.whatYouWillLearn}</div>}
                                                                        </div>
                                                                        <div className="help-block">Student will gain this skills, knowledge after completing this course. (One per line).</div>
                                                                    </div>								
                                                                </div>
                                                                
                                                                <div className="col-lg-6 col-md-12">															
                                                                    <div className="ui search focus lbel25 mt-30">	
                                                                        <label>Who this course is for?*</label>
                                                                        <div className="ui form swdh30">
                                                                            <div className="field">
                                                                                <textarea rows="3" name="whoThisCourseIsFor" placeholder="" onChange={this.formCourse}></textarea>
                                                                            </div>
                                                                            {this.state.error.whoThisCourseIsFor && <div className="validation alert alert-warning">{this.state.error.whoThisCourseIsFor}</div>}
                                                                        </div>
                                                                        <div className="help-block">What knowledge, technology, tools required by users to start this course. (One per line).</div>
                                                                    </div>								
                                                                </div>
                                                                <div className="col-lg-4 col-md-6">
                                                                    <div className="mt-30 lbel25">
                                                                        <label>Course Catalog*</label>
                                                                    </div>
                                                                    <div className="form_group optgroup">
                                                                        <select className="ui fluid  dropdown cntry152 prompt srch_explore" name="catalogId" onChange={this.handleSelect}>
                                                                            <option value="" selected disabled>Select Catalog</option>
                                                                            {
                                                                                this.props.catalogs.map((catalog) => {
                                                                                    return (
                                                                                        <option value={catalog.id}>{catalog.name}</option>
                                                                                        
                                                                                    );
                                                                                })
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                </div>	
                                                                <div className="col-lg-4 col-md-6">
                                                                    <div className="mt-30 lbel25">
                                                                        <label>Course SubCatalog*</label>
                                                                    </div>
                                                                    <div className="form_group optgroup">
                                                                        <select className="ui fluid  dropdown cntry152 prompt srch_explore" name="subCatalogId" onChange={this.formCourse}>
                                                                            <option value="" selected disabled>Select SubCatalog</option>
                                                                            {
                                                                                this.props.catalogs.map((cata) => {
                                                                                    if (cata.id == this.state.select)
                                                                                    return(
                                                                                        cata.subCatalogs.map(sub => {
                                                                                            return (
                                                                                                <option value={sub.id}>{sub.name}</option>
                                                                                            )
                                                                                        } )
                                                                                    )
                                                                                })
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                </div>	
                                                                <div className="col-lg-4 col-md-6">
                                                                    <div className="ui search focus mt-30 lbel25">
                                                                        <label>Language*</label>
                                                                    </div>
                                                                    <div className="form_group optgroup">
                                                                        <select className="ui fluid dropdown cntry152 prompt srch_explore" name="language" onChange={this.formCourse}>
                                                                            <option value="" selected disabled>Select language</option>
                                                                            <option value="ENG">English</option>
                                                                            <option value="VN">Vietnamese</option>
                                                                            <option value="FR">French</option>
                                                                            <option value="JP">Japanese</option>
                                                                            
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6 col-md-6">
                                                                    <div className="license_pricing mt-30">
                                                                        <label className="label25">Duration*</label>
                                                                        <div className="row">
                                                                            <div className="col-lg-12 col-md-6 col-sm-6">
                                                                                <div className="loc_group">
                                                                                    <div className="ui left icon input swdh19">
                                                                                        <input className="prompt srch_explore" type="number" min="1" max="100" placeholder="1" name="videoDuration" onChange={this.formCourse} />															
                                                                                    </div>
                                                                                    <span className="slry-dt">Hour</span>
                                                                                    {this.state.error.videoDuration && <div className="validation alert alert-warning">{this.state.error.videoDuration}</div>}

                                                                                </div>
                                                                            </div>
                                                                        </div>																		
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-lg-6 col-md-6">
                                                                    <div className="license_pricing mt-30">
                                                                        <label className="label25">Regular Price*</label>
                                                                        <div className="row">
                                                                            <div className="col-lg-12 col-md-6 col-sm-6">
                                                                                <div className="loc_group">
                                                                                    <div className="ui left icon input swdh19">
                                                                                        <input className="prompt srch_explore" type="text" placeholder="$0" name="price" onChange={this.formCourse} />															
                                                                                    </div>
                                                                                    <span className="slry-dt">USD</span>
                                                                                    {this.state.error.price && <div className="validation alert alert-warning">{this.state.error.price}</div>}
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
                // ____________________ STEP 2 : MEDIA _______________________
                                            :this.state.show=='2'?
                                            <div className="step-tab-panel step-tab-gallery active " id="tab_step2">
                                                <div className="tab-from-content">
                                                    <div className="title-icon">
                                                        <h3 className="title"><i className="uil uil-image"></i>Media</h3>
                                                    </div>
                                                    <div className="lecture-video-dt mb-30">
                                                        <span className="video-info">Intro Course overview provider type.</span>
                                                        <div className="video-category">
                                                           
                                                            {/* <label ><input type="radio" name="colorRadio" value="mp4" /><span>HTML5(mp4)</span></label> */}
                                                            <div className="youtube intro-box" style={{display: "block"}}>
                                                                <div className="new-section">
                                                                    <div className="ui search focus mt-30 lbel25">
                                                                        <label>Youtube URL*</label>
                                                                        <div className="ui left icon input swdh19">
                                                                            <input className="prompt srch_explore" type="text" placeholder="Youtube Video URL" name="urlVideoDescription" onChange={this.formCourse} />															
                                                                        </div>
                                                                        {this.state.error.urlVideoDescription && <div className="validation alert alert-warning">{this.state.error.urlVideoDescription}</div>}
                                                                        
                                                                    </div>
                                                                </div>														
                                                            </div>
                                                            {/* <div className="mp4 intro-box">
                                                                <div className="row">
                                                                    <div className="col-lg-5 col-md-12">
                                                                        <div className="upload-file-dt mt-30">
                                                                            <div className="upload-btn">													
                                                                                <input className="uploadBtn-main-input" type="file" id="myVideo" name="urlVideoDescription" onChange={this.formCourse} accept="video/*" />
                                                                                {this.state.video?
                                                                                <label htmlFor="myVideo" title="Zip">{this.state.video}</label>
                                                                                :<label htmlFor="myVideo" title="Zip">UPLOAD VIDEO</label>}
                                                                            </div>
                                                                            <span className="uploadBtn-main-file">File Format: .mp4</span>
                                                                            <span className="uploaded-id"></span>
                                                                        </div>
                                                                    </div>	 
                                                                        													
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                    <div className="thumbnail-into">
                                                        <div className="row">
                                                            <div className="col-lg-5 col-md-6">
                                                                <label className="label25 text-left">Course thumbnail*</label>
                                                                <div className="thumb-item">
                                                                    {this.state.image?
                                                                    <img src={this.state.image} alt=""/>
                                                                    :<img src="images/thumbnail-demo.jpg" alt=""/>
                                                                    }
                                                                    <div className="thumb-dt">													
                                                                        <div className="upload-btn" >													
                                                                            <input className="uploadBtn-main-input" id="myInput" type="file" name="imageVideoDescription" onChange={this.formCourse} accept="image/*" />
                                                                            <label htmlFor="myInput" >Choose Thumbnail</label>
                                                                        </div>
                                                                        <span className="uploadBtn-main-file">Size: 590x300 pixels. Supports: jpg,jpeg, or png</span>
                                                                    </div>
                                                                </div>
                                                                {this.state.error.imageVideoDescription && <div className="validation alert alert-warning">{this.state.error.imageVideoDescription}</div>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                // ____________________ STEP 3 : LESSON _______________________   
                                            :this.state.show=='3'?
                                            <div className="step-tab-panel step-tab-location active " id="tab_step3">
                                                <div className="tab-from-content">
                                                    <div className="title-icon">
                                                        <h3 className="title"><i className="uil uil-notebooks"></i>Lesson</h3>
                                                    </div>
                                                    <div className="curriculum-section">
                                                        <div className="row">
                                                            <div class="col-lg-12">
                                                                <div class="extra_info">
                                                                    <h4 class="part__title">New Lesson </h4>
                                                                </div>
                                                                <div class="view_info10">
                                                                    <div class="row">
                                                                        <div class="col-lg-12 col-md-12">
                                                                            <div class="ui search focus mt-30 lbel25">
                                                                                <label>Lesson Title*</label>
                                                                                <div class="ui left icon input swdh19">
                                                                                    <input class="prompt srch_explore" type="text" placeholder="Insert your course content title." name="title" data-purpose="edit-course-title" maxlength="60" onChange={this.formLesson} />
                                                                                    <div className="badge_num">60</div>
                                                                                </div>
                                                                                {this.state.error.titleLesson && <div className="validation alert alert-warning">{this.state.error.titleLesson}</div>}
                                                                        
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div class="col-lg-12 col-md-12">
                                                                            <div class="save_content">
                                                                                <button class="save_content_btn" type="button" value={'add'} onClick={()=>this.newLesson(this.state.addLesson)}>Save Lesson</button>
                                                                            </div> 
                                                                            <div class="table-responsive mt-30">
                                                                                    <table class="table ucp-table" id="content-table">
                                                                                        <thead class="thead-s">
                                                                                            <tr>
                                                                                                <th class="text-center" scope="col">Lesson</th>
                                                                                                <th class="cell-ta">Title</th>
                                                                                                <th class="text-center" scope="col">Action</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {lessons.map((less,i) => {
                                                                                                return (
                                                                                                    <tr>
                                                                                                        <td class="text-center">{i+1}</td>
                                                                                                        <td class="cell-ta">{less.title}</td>
                                                                                                        <td className="text-center"> 
                                                                                                            <a type="button" value='delete' name={less.title} onClick={()=>this.removeLesson(less.id)} title="Delete" className="gray-s"><i className="uil uil-trash-alt"></i></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    
                                                                                                )
                                                                                            })}
                                                                                        </tbody>
                                                                                    </table>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                // ____________________ STEP 4 : LECTURE _______________________
                                            :this.state.show=='4'?
                                            <div className="step-tab-panel step-tab-location active " id="tab_step4">
                                                <div className="tab-from-content">
                                                    <div className="title-icon">
                                                        <h3 className="title"><i className="uil uil-notebooks"></i>Lecture</h3>
                                                    </div>
                                                    <div className="curriculum-section">
                                                        <div className='row'>                          
                                                            <div class="col-lg-12">
                                                                <div class="extra_info">
                                                                    <h4 class="part__title">New Lecture </h4>
                                                                </div>
                                                                <div class="view_info10">
                                                                    <div class="row">
                                                                        <form action="" method="post" enctype="multipart/form-data" id="lecturefrom" class="row">
                                                                            <div class="col-lg-6 col-md-12">
                                                                                <div class="ui search focus mt-30 lbel25">
                                                                                    <label>Lecture Title*</label>
                                                                                    <div class="ui left icon input swdh19">
                                                                                        <input class="prompt srch_explore" type="text" placeholder="Insert your lecture title." name="title" data-purpose="edit-course-title" maxlength="60" onChange={this.formLecture}/>
                                                                                        <div className="badge_num">60</div>
                                                                                    </div>
                                                                                    
                                                                                    {this.state.error.titleLecture && <div className="validation alert alert-warning">{this.state.error.titleLecture}</div>}
                                                                        
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-3 col-md-6">
                                                                                <div className="mt-30 lbel25">
                                                                                    <label>Lesson*</label>
                                                                                </div>
                                                                                <div className="form_group optgroup">
                                                                                    <select className="ui fluid  dropdown cntry152 prompt srch_explore" name="title" onChange={this.handleLesson}>
                                                                                        <option value="">Select Lesson</option>
                                                                                        {
                                                                                            lessons.map((lesson,i) => {
                                                                                                return (
                                                                                                    <option value={lesson.title}>{lesson.title}</option>
                                                                                                    
                                                                                                );
                                                                                            })
                                                                                        }
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-3 col-md-6">
                                                                                <div class="ui search focus mt-30 lbel25">
                                                                                    <label>Sort*</label>
                                                                                    <div class="ui left icon input swdh19">
                                                                                        <input class="prompt srch_explore" type="number" min="0" max="100" placeholder="0" name="sort" onChange={this.formLecture} />
                                                                                    </div>
                                                                                    {this.state.error.sort && <div className="validation alert alert-warning">{this.state.error.sort}</div>}
                                                                                    {this.state.error.sortLecture && <div className="validation alert alert-warning">{this.state.error.sortLecture}</div>}
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-6 col-md-12">
                                                                                <div class="ui search focus mt-30 lbel25">
                                                                                    <label>Youtube URL*</label>
                                                                                    <div class="ui left icon input swdh19 swdh95">
                                                                                        <input class="prompt srch_explore" type="text" placeholder="Youtube video URL" name="videoUrl" onChange={this.formLecture}/>
                                                                                        
                                                                                    </div>
                                                                                    {this.state.error.videoUrlLecture && <div className="validation alert alert-warning">{this.state.error.videoUrlLecture}</div>}
                                                                        
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-lg-3 col-md-6">
                                                                                <div class="ui search focus mt-30 lbel25">
                                                                                    <label>Duration*</label>
                                                                                    <div class="ui left icon input swdh19">
                                                                                        <input class="prompt srch_explore" type="number" min="0" max="100" placeholder="0" name="videoDuration" onChange={this.formLecture} />
                                                                                    </div>
                                                                                    {this.state.error.videoDurationLecture && <div className="validation alert alert-warning">{this.state.error.videoDurationLecture}</div>}
                                                                        
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            {/* </div>
                                                                            <div className="col-lg-3 col-md-6">
                                                                                <div className="mt-30 lbel25">
                                                                                    <label>Preview*</label>
                                                                                </div>
                                                                                <div className= "optgroup form_group">
                                                                                
                                                                                    <select class="ui hj145 dropdown cntry152 prompt srch_explore" name="preview" onChange={this.formLecture}>
                                                                                        <option value="">Select </option>
                                                                                        <option value="1">No</option>
                                                                                        <option value="0">Yes</option>
                                                                                    </select>
                                                                                </div>*/}
                                                                            	 
                                                                            <div className="col-lg-3 col-md-3">
                                                                                <div className="mt-30 lbel25">
                                                                                        <label>Preview*</label>
                                                                                </div>
                                                                                <div className="preview-dt">
                                                                                    {this.state.switch?
                                                                                        <label className="switch" >
                                                                                            <input type="checkbox" name="preview" checked  value="false" onClick={()=>this.changeSwitch()} onChange={this.formLecture}/>
                                                                                            <span  style={{width:"40px"}}></span>
                                                                                        </label>
                                                                                    :
                                                                                    <label className="switch" >
                                                                                        <input type="checkbox" name="preview" value="true" onClick={()=>this.changeSwitch()} onChange={this.formLecture}/>
                                                                                        <span style={{width:"40px"}}></span>
                                                                                    </label>
                                                                                    }
                                                                                    
                                                                                </div>
                                                                            </div>
                                                                            
                                                                        </form>
                                                                        
                                                                        <div class="col-lg-12 col-md-12">
                                                                            <div class="save_content">
                                                                                <button class="save_content_btn" type="button" value={'add'} onClick={()=>this.newLecture(this.state.lesson,this.state.addLecture)}>Save Leture</button>
                                                                            </div> 
                                                                            {/* <div class="save_content">
                                                                                <button class="save_content_btn" type="button" value={'add'} onClick={()=>this.course(this.state.addCourse)}>TEST</button>
                                                                            </div>  */}
                                                                            <div class="table-responsive mt-30">
                                                                                    <table class="table ucp-table" id="content-table">
                                                                                        <thead class="thead-s">
                                                                                            <tr>
                                                                                                <th class="text-center" scope="col">ID</th>
                                                                                                <th class="cell-ta">Lecture</th>
                                                                                                <th class="cell-ta" scope="col">Lesson</th>
                                                                                                <th class="text-center" scope="col">Sort</th>
                                                                                                <th class="cell-ta" scope="col">Youtube URL</th>
                                                                                                <th class="text-center" scope="col">Duration</th>
                                                                                                <th class="text-center" scope="col">Preview</th>
                                                                                                <th class="text-center" scope="col">Action</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {lesslec.map((less,i) => {
                                                                                                return(
                                                                                                    less.lectures.map((lecture,k) =>{
                                                                                                        return (
                                                                                                            <tr>
                                                                                                                <td class="text-center">{i+1}</td>
                                                                                                                <td class="cell-ta">{lecture.title}</td>
                                                                                                                <td class="cell-ta">{less.title}</td>
                                                                                                                <td class="text-center">{lecture.sort}</td>
                                                                                                                <td class="cell-ta">{lecture.videoUrl}</td>
                                                                                                                <td class="text-center">{lecture.videoDuration}</td>
                                                                                                                <td class="text-center">{lecture.preview=="true"?'Free':'None'}</td>
                                                                                                                <td className="text-center"> 
                                                                                                                    <a type="button" onClick={()=>this.removeLecture(lecture.id)} value='delete' name={lecture.title} title="Delete" className="gray-s"><i className="uil uil-trash-alt"></i></a>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            )
                                                                                                        } ));
                                                                                                    }
                                                                                                )
                                                                                            }
                                                                                        </tbody>
                                                                                    </table>
                                                                            </div>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                // ____________________ STEP 5 : PUBLISH _______________________
                                            :<div className="step-tab-panel step-tab-location active" id="tab_step5">
                                                <div className="tab-from-content">
                                                    <div className="title-icon">
                                                        <h3 className="title"><i className="uil uil-info-circle"></i>Publish</h3>
                                                    </div>
                                                </div>
                                                
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
                                                        <p>Your course is in an <b>Activate</b> state. Students can view, purchase or enroll in this course.</p> 
                                                    :
                                                    <p>Your course is in a <b>Draf</b> state. Students cannot view, purchase or enroll in this course.</p>
                                                    }
                                                </div>
                                            </div>
                                            }
                                        </div>
                                        <div className="step-footer step-tab-pager">
                                            {this.state.show>1?
                                            <button data-direction="prev" className="btn btn-default steps_btn" onClick={this.pagePrev} >Previous</button>
                                            :''}
                                            {this.state.show==2?
                                            <button data-direction="prev" className="btn btn-default steps_btn"  type="button" value={'add'} onClick={()=>this.courseDraf(this.state.addCourse)} >Submit Course</button>
                                            :''}
                                            {this.state.show<5?
                                            <button data-direction="next" className="btn btn-default steps_btn" onClick={this.pageNext}>Next</button>
                                            :this.state.course?
                                            <button data-direction="finish" className="btn btn-default steps_btn" type="button" value={'add'} onClick={()=>this.course(this.state.addCourse)} >Submit</button>
                                            
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
        catalogs: state.catalog.catalogs,
        subCatalogs: state.subCatalog.subCatalogs,
        img: state.course.img
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCatalogRequest:() => dispatch (fetchCatalogRequest()),
        fetchSubCatalogRequest:() => dispatch (fetchSubCatalogRequest()),
        imageRequest:(e) => dispatch (imageRequest(e)),
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CourseAdd));