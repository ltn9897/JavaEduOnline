import React, { Component } from 'react';
import Footer from '../Layout/footer';
import Axios from 'axios'

class CourseTest extends Component {

    constructor(props) {
        super(props);

        this.state = {
                title: "",
                description: "",
                requirement: "",
                typeLevel: "",
                status: true,
                totalSold: 0,
                price: 0 ,
                videoDuration: null,
                urlVideoDescription: null,
                imageVideoDescription: null
            
        }
        this.handleChangeInput = this.handleChangeInput.bind(this)
    }

    handleChangeInput(event){

        let name = event.target.name
        let value = event.target.value
        this.setState({
            [name] : value
        })
        console.log('state', this.state)
    }

    hanldeSubmit(){
        let payload = {
            title : this.state.title,
            description : this.state.description,
            requirement : this.state.requirement,
            typeLevel : this.state.typeLevel,
            status : true,
            totalSold : this.state.totalSold,
            price : this.state.price,
            videoDuration : null,
            urlVideoDescription : null,
            imageVideoDescription: null
        }
        Axios({
            url: 'http://localhost:8080/api/course/create',
            method: "POST",
            data: payload
        }).then(res => {
            console.log('res', res)
        })
    }

    render() {
        return (
            <div className="wrapper">
                <div className="sa4d25">
                    <div className="container">

                        <div className="col-lg-12">
                            <h2 className="st_title"><i className="uil uil-analysis"></i> Create New Course</h2>
                        </div>
                        <div className="col-12">

                            <div className="course_tabs_1">

                                <div id="add-course-tab" className="step-app">
                                    <div className="step-content">
                                        <div className="step-tab-panel step-tab-info active" id="tab_step1">
                                            <div className="tab-from-content">
                                                <div className="course__form">

                                                    <div className="general_info10">

                                                        <div className="row">
                                                            <div className="col-lg-12 col-md-12">

                                                                <div className="ui search focus mt-30 lbel25">

                                                                    <label>Course Title*</label>
                                                                    <div className="ui left icon input swdh19">
                                                                        <input className="prompt srch_explore" type="text" placeholder="Course title here" name="title" data-purpose="edit-course-title" maxlength="60" onChange={ this.handleChangeInput}  />
                                                                        <div className="badge_num">60</div>
                                                                    </div>
                                                                    <div className="help-block">(Please make this a maximum of 100 characters and unique.)</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12">

                                                                <div className="ui search focus mt-30 lbel25">

                                                                    <label>Type Level*</label>
                                                                    <div className="ui left icon input swdh19">
                                                                        <input className="prompt srch_explore" type="text" placeholder="Course title here" name="typeLevel" data-purpose="edit-course-title" maxlength="60" id="main[title]"   onChange={ this.handleChangeInput} />
                                                                        <div className="badge_num">60</div>
                                                                    </div>
                                                                    <div className="help-block">(Please make this a maximum of 100 characters and unique.)</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12">

                                                                <div className="ui search focus mt-30 lbel25">

                                                                    <label>Description*</label>
                                                                    <div className="ui left icon input swdh19">
                                                                        <input className="prompt srch_explore" type="text" placeholder="Course title here" name="description" data-purpose="edit-course-title" maxlength="60" id="main[title]"  onChange={ this.handleChangeInput} />
                                                                        <div className="badge_num">60</div>
                                                                    </div>
                                                                    <div className="help-block">(Please make this a maximum of 100 characters and unique.)</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12">

                                                                <div className="ui search focus mt-30 lbel25">

                                                                    <label>Requirement*</label>
                                                                    <div className="ui left icon input swdh19">
                                                                        <input className="prompt srch_explore" type="text" placeholder="Course title here" name="requirement" data-purpose="edit-course-title" maxlength="60" id="main[title]"  onChange={ this.handleChangeInput} />
                                                                        <div className="badge_num">60</div>
                                                                    </div>
                                                                    <div className="help-block">(Please make this a maximum of 100 characters and unique.)</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12">

                                                                <div className="ui search focus mt-30 lbel25">

                                                                    <label>TotalSold*</label>
                                                                    <div className="ui left icon input swdh19">
                                                                        <input className="prompt srch_explore" type="text" placeholder="Course title here" name="totalSold" data-purpose="edit-course-title" maxlength="60" id="main[title]"  onChange={ this.handleChangeInput} />
                                                                        <div className="badge_num">60</div>
                                                                    </div>
                                                                    <div className="help-block">(Please make this a maximum of 100 characters and unique.)</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12">
                                                                <label className="label25 text-left">Price</label>
                                                                <div className="ui left icon input swdh19">
                                                                    <input className="prompt srch_explore" type="text" placeholder="Course title here" name="price" data-purpose="edit-course-title" maxlength="60" id="main[title]" onChange={ this.handleChangeInput} />
                                                                    <div className="badge_num">60</div>
                                                                </div>
                                                                <div className="help-block">(Please make this a maximum of 100 characters and unique.)</div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="step-tab-panel step-tab-location" id="tab_step5">
                                            <div className="tab-from-content">
                                                <div className="title-icon">
                                                    <button onClick={() => this.hanldeSubmit()} className="title" ><i className="uil uil-upload"></i>Submit</button>
                                                </div>
                                            </div>
                                            <div className="publish-block">
                                                <i className="far fa-edit"></i>
                                                <p>Your course is in a draft state. Students cannot view, purchase or enroll in this course. For students that are already enrolled, this course will not appear on their student Dashboard.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="step-footer step-tab-pager">
                                        <button data-direction="prev" className="btn btn-default steps_btn">PREVIOUS</button>
                                        <button data-direction="next" className="btn btn-default steps_btn">Next</button>
                                        <button data-direction="finish" className="btn btn-default steps_btn">Submit for Review</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default CourseTest;