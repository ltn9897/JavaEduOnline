import React from "react";
import Footer from '../Layout/footer';
import { Link } from 'react-router-dom';
import axios from "axios";
import {CATALOG_INFO_BASE_URL} from "../../config/env";
import {SUBCATALOG_INFO_BASE_URL} from "../../config/env";
import authHeader from "../../config/authHeader";
import {withRouter} from '../Auth/withRouter';
import $ from "jquery";
import Success from "../../Alert/success"

let arr = [];
class CatalogAdd extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            addCatalog: {
                name:'',
                description:'',
            },
            addSubCatalog: {
                catalogId:'',
                name:'',
                description:'',
            },
            subCatalog: [],
        }

        this.handleInputCatalogChange = this.handleInputCatalogChange.bind(this);
        this.newSubCatalog = this.newSubCatalog.bind(this);
    }

    handleInputCatalogChange = e => {   
        let formData = Object.assign({}, this.state.addCatalog);    
        console.log(formData)
        formData[e.target.name] = e.target.value;        
        this.setState({addCatalog:formData});  
        console.log(formData)  
    }

    subCatalog = e => {   
        let formData = Object.assign({}, this.state.addSubCatalog);    
        console.log(formData)
        formData[e.target.name] = e.target.value;        
        this.setState({addSubCatalog:formData});  
        console.log(formData)  
    }
    
    newSubCatalog = (addSubCatalog) => {
            arr.push(addSubCatalog);
            this.setState({subCatalog: arr});
            Array.from(document.querySelectorAll('.sub')).forEach(input=>(input.value=""))

    }

    deleteSubCatalog = (name) => {
        for (var i=0; i< arr.length; i++){
            if(arr[i].name === name){
                arr.splice(i,1);
            }
        }
        this.setState({subCatalog:arr});
    }

    handleSubmitCatalog = (addCatalog, subCatalog) => {
        axios.post(CATALOG_INFO_BASE_URL + '/create', addCatalog , { headers: authHeader() }).then(res=>{
            subCatalog.map((sub,index) => {
                return (
                    sub.catalogId = res.data.data.id,
                    axios.post(SUBCATALOG_INFO_BASE_URL + '/create', sub, { headers: authHeader() }).then(res=>{})
                )})
            

            arr = [];
            if(res.data.message=='Success'){
                $('#success').fadeIn('fast').delay(2000).fadeOut('slow');
                setTimeout(()=>{
                    this.props.navigate('/category')
                },1000);
            }
        })
    }

    render(){
        return (
            <div className="wrapper">
                <div className="sa4d25">
                    <div className="container">			
                        <div className="col-lg-12">	
                            <h2 className="st_title"><i className='uil uil-layers'></i> Create New Catalog</h2>
                        </div>			
                    <div  id="success" style={{display:"none"}}><Success name="Success"/></div>

                        <div className="col-12">
                            <div className="step-content">
                                <div className="step-tab-panel step-tab-info active" id="tab_step1"> 
                                    <div className="tab-from-content">
                                        <div className="course__form">
                                            <div className="general_info10">
                                                <div class="row">
                                                    <div class="col-lg-8">
                                                        <div class="discount_form">
                                                            <div class="row">
                                                                <div class="col-lg-6 col-md-6">
                                                                    <div class="mt-20 lbel25">	
                                                                        <label>Name</label>
                                                                        <div class="ui left icon input swdh19">
                                                                            <input class="prompt srch_explore" type="text" name="name" required=""  placeholder="Name here" onChange={this.handleInputCatalogChange}/>															
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-12 col-md-12">	
                                                                    <div class="ui search focus mt-20 lbel25">
                                                                        <label>Description</label>
                                                                        <div class="ui form swdh30">
                                                                            <div class="field">
                                                                                <textarea rows="3" name="description" id="" placeholder="Item description here..." onChange={this.handleInputCatalogChange}></textarea>
                                                                            </div>
                                                                        </div>
                                                                        <div class="help-block">220 words</div>
                                                                    </div>										
                                                                </div>
                                                                <div class="col-lg-12 ">	
                                                                    <div class="mt-20 lbel25">
                                                                        <div class="section-add-item-wrap p-3">
                                                                        <button  title="Edit" className="gray-s" data-toggle="modal" data-target='#hoho' ><i class="far fa-plus-square mr-2"></i>New SubCatalog</button>
                                                                        </div>			
                                                                    </div>					
                                                                </div>
                                                                <div class="modal fade"  tabindex="-1" id='hoho' aria-hidden="true">
                                                                    <div class="modal-dialog modal-lg">
                                                                        <div class="modal-content">
                                                                            <div class="modal-header">
                                                                                <h5 class="modal-title">New SubCatalog</h5>
                                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                                    <span aria-hidden="true">&times;</span>
                                                                                    </button>
                                                                            </div>
                                                                            <div class="modal-body">
                                                                                <div class="new-section-block">
                                                                                    <div class="row">
                                                                                        <div class="col-md-12">
                                                                                            <div class="new-section">
                                                                                                <div class="form_group">
                                                                                                <input class="form_input_1 " type="hidden" name="id" value=''/>
                                                                                                    <label class="label25 ">SubCatalog Name*</label>
                                                                                                    <input class="form_input_1 sub" type="text" name="name" onChange={this.subCatalog}/>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="new-section-block">
                                                                                    <div class="row">
                                                                                        <div class="col-md-12">
                                                                                            <div class="new-section">
                                                                                                <div class="form_group">
                                                                                                    <label class="label25">Description</label>
                                                                                                    <div class="ui form swdh30">
                                                                                                        <div class="field">
                                                                                                            <textarea className="sub" rows="3" name="description" onChange={this.subCatalog}></textarea>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div class="help-block">220 words</div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="modal-footer">
                                                                                <button type="button" class="main-btn cancel" data-dismiss="modal">Close</button>
                                                                                <button type="button" class="main-btn" data-dismiss="modal" value={'add'} onClick={()=>this.newSubCatalog(this.state.addSubCatalog)}>Add</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6 col-md-6" >
                                                                    <div class="mt-20 lbel25">	
                                                                        <label>Subcatalog</label>
                                                                    </div>
                                                                    <div class="added-section-item mb-30">
                                                                       
                                                                        {
                                                                            this.state.subCatalog.map(sub => {
                                                                                return (
                                                                                    <div class="section-header">
                                                                                        {sub.name}&nbsp;
                                                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" value={'delete'} name={sub.name} onClick={()=>this.deleteSubCatalog(sub.name)}>
                                                                                            &times; &nbsp;
                                                                                        </button>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                        
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
                                <div className="step-tab-panel step-tab-location" id="tab_step5">
                                    <div className="tab-from-content">
                                        <div className="title-icon">
                                            <button className="save_btn" type="button" value={'Add'} onClick={()=>this.handleSubmitCatalog(this.state.addCatalog,this.state.subCatalog)} ><h3 className="title"><i className="uil uil-upload"></i>Submit</h3></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
	        </div>
        )
    }
}


export default withRouter(CatalogAdd)