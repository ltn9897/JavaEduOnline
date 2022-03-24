import React from "react";
import {connect} from 'react-redux';
import { fetchSubCatalogRequest, searchSubCatalogRequest,updateSubCatalogRequest, createSubCatalogRequest } from "../../actions/subCatalog";
import { fetchCatalogRequest} from "../../actions/catalog";
import Success from "../../Alert/success";

class SubCatalog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addSubCatalog: {
                catalogId:'',
                name:'',
                description:'',
            },
            editSubCatalog: {
                id:'',
                catalogId:'',
                name:'',
                description:'',
            },
            searchSubCatalog:'',
            updateSuccess: false,
        }
    }

    handleInputSubCatalogChange = e => {   
        let formData = Object.assign({}, this.state.addSubCatalog);    
        console.log(formData)
        formData[e.target.name] = e.target.value;        
        this.setState({addSubCatalog:formData});  
        console.log(formData)  
    }

    handleSubmitSubCatalog = (addSubCatalog) => {
        this.props.createSubCatalogRequest(addSubCatalog);
        this.props.fetchSubCatalogRequest();
        this.props.fetchCatalogRequest();
        Array.from(document.querySelectorAll('.sub')).forEach(input=>(input.value=""))
        this.setState({addSubCatalog: {
            catalogId:'',
            name:'',
            description:'',
        }})
        
    }

    getSubCatalog = (subCatalogId, name, desscsription) => {
        this.setState({editSubCatalog : {
            id: subCatalogId,
            name: name,
            catalogId: '',
            description: desscsription,
        }}); 
    }

    handleInputEditSubCatalogChange = e => {   
        let formData = Object.assign({}, this.state.editSubCatalog);    
        console.log(formData)
        formData[e.target.name] = e.target.value;        
        this.setState({editSubCatalog:formData});  
        console.log(formData)  
    }

    updateSubCatalog = (editSubCatalog) => {
        this.props.updateSubCatalogRequest(editSubCatalog);
        this.props.fetchSubCatalogRequest();
        this.props.fetchCatalogRequest();
        
    }

    handleInputSearchSubCatalogChange = e => {   
        let value = e.target.value       
        this.setState({searchSubCatalog:value});  
    }

    searchSubCatalog = (searchSubCatalog) => {
        this.props.searchSubCatalogRequest(searchSubCatalog)
    }

    componentDidMount(){
        this.props.fetchSubCatalogRequest();
    } 

    render(){
        return (
            <div className="tab-pane fade" id="pills-my-purchases" role="tabpanel">
                
                <div className="table-responsive mt-30">
                    <div className="panel panel-default" id="accordion">
                        <div className="panel-heading" role="tab" id="headingOne">
                            <div className="panel-title adcrse1250">
                                <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    Create New SubCatalog
                                </a>
                            </div>
                        </div>
                        <div  id="success" style={{display:"none"}}><Success name="Success"/></div>

                        <div id="collapseOne" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                            <div className="panel-body adcrse_body">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div className="discount_form">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="mt-20 lbel25">	
                                                        <label>Catalog*</label>
                                                    </div>
                                                    <select className="ui hj145 dropdown cntry152 prompt srch_explore sub" name="catalogId" onChange={this.handleInputSubCatalogChange}>
                                                        <option value="" selected disabled>Select Catalog</option>
                                                        {
                                                            this.props.catalogs.map((catalog,index) => {
                                                                return (
                                                                    <option value={catalog.id}>{catalog.name}</option>
                                                                );
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="col-lg-6 col-md-6">	
                                                    <div className="ui search focus mt-20 lbel25">
                                                        <label>Name</label>
                                                        <div className="ui left icon input swdh19">
                                                            <input className="prompt srch_explore sub" type="text" name="name" required="" placeholder="Name here" onChange={this.handleInputSubCatalogChange}/>															
                                                        </div>
                                                    </div>										
                                                </div>
                                                <div className="col-lg-12 col-md-12">	
                                                    <div className="ui search focus mt-20 lbel25">
                                                        <label>Description</label>
                                                        <div className="ui form swdh30">
                                                            <div className="field">
                                                                <textarea className="sub" rows="3" name="description" id="" placeholder="Subcatalog description here..." onChange={this.handleInputSubCatalogChange}></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="help-block">220 words</div>
                                                    </div>										
                                                </div>
                                                <div className="col-lg-6 col-md-6">	
                                                    <button className="discount_btn" type="button" value={'AddSubCatalog'} onClick={()=>this.handleSubmitSubCatalog(this.state.addSubCatalog)} >Save Changes</button>										
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="section3125">
                            <div className="explore_search">
                                <div className="ui search focus">
                                    <div className="ui left icon input swdh11">
                                        <input className="prompt srch_explore" type="text" placeholder="Search for SubCatalogs..." onChange={this.handleInputSearchSubCatalogChange} onKeyPress={e=> e.key==='Enter' && this.searchSubCatalog(this.state.searchSubCatalog)}/>
                                        <i className="uil uil-search-alt icon icon2"></i>
                                    </div>
                                </div>
                            </div>							
                        </div>							
                    </div>
                    <table className="table ucp-table">
                        <thead className="thead-s">
                            <tr>
                                <th className="text-center" scope="col">No.</th>
                                <th className="cell-ta" scope="col">Name</th>
                                <th className="text-center" scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.subCatalogs.map((subCatalog,index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="cell-ta">{subCatalog.name}</td>
                                            <td className="text-center"> 
                                                <a  title="Edit" className="gray-s" data-toggle="modal" data-target={'#idSub'+subCatalog.id} onClick={() => this.getSubCatalog(subCatalog.id, subCatalog.name, subCatalog.description)}><i className="uil uil-edit-alt"></i></a>
                                            </td>
                                            <div className="modal fade"  tabindex="-1" id={'idSub'+subCatalog.id} aria-hidden="true">
                                                <div className="modal-dialog modal-lg">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">Edit SubCatalog</h5>
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
                                                                                <select className="ui hj145 dropdown cntry152 prompt srch_explore" name="catalogId" onChange={this.handleInputEditSubCatalogChange}>
                                                                                    <option value="" selected disabled>Select Catalog</option>
                                                                                    {
                                                                                        this.props.catalogs.map((catalog,index) => {
                                                                                            return (
                                                                                                <option value={catalog.id}>{catalog.name}</option>
                                                                                            );
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="new-section-block">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="new-section">
                                                                            <div className="form_group">
                                                                                <label className="label25">Catalog Name*</label>
                                                                                <input className="form_input_1" type="text" name="name" defaultValue={subCatalog.name} onChange={this.handleInputEditSubCatalogChange}/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="new-section-block">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="new-section">
                                                                            <div className="form_group">
                                                                                <label className="label25">Description</label>
                                                                                <div className="ui form swdh30">
                                                                                    <div className="field">
                                                                                        <textarea rows="3" name="description" defaultValue={subCatalog.description} onChange={this.handleInputEditSubCatalogChange}></textarea>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="help-block">220 words</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="main-btn cancel" data-dismiss="modal">Close</button>
                                                            <button type="button" className="main-btn" value={'edit'} data-dismiss="modal" onClick={()=>this.updateSubCatalog(this.state.editSubCatalog)}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </tr>
                                        );
                                    }
                                )
                            }
                        </tbody>
                    </table>
                </div>								
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {        
        catalogs: state.catalog.catalogs,
        subCatalogs: state.subCatalog.subCatalogs,
        updateSuccess: state.subCatalog.updateSuccess,
        createSuccess: state.subCatalog.createSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCatalogRequest:() => dispatch (fetchCatalogRequest()),
        fetchSubCatalogRequest:() => dispatch (fetchSubCatalogRequest()),
        searchSubCatalogRequest:(e) => dispatch (searchSubCatalogRequest(e)),
        updateSubCatalogRequest:(e) => dispatch (updateSubCatalogRequest(e)),
        createSubCatalogRequest:(e) => dispatch (createSubCatalogRequest(e)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(SubCatalog);