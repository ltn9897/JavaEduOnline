import React from "react";
import {connect} from 'react-redux';
import { fetchCatalogRequest, searchCatalogRequest,updateCatalogRequest} from "../../actions/catalog";
import Success from "../../Alert/success";

class Catalog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            catalogs: [],
            editCatalog: {
                id:'',
                name:'',
                description:'',
            },
            searchCatalog:'',
        }
    }

    getCatalog = (catalogId, name, desscsription) => {
        this.setState({editCatalog : {
            id:catalogId,
            name:name,
            description:desscsription,
        }}); 
    }

    handleInputEditCatalogChange = e => {   
        let formData = Object.assign({}, this.state.editCatalog);    
        console.log(formData)
        formData[e.target.name] = e.target.value;        
        this.setState({editCatalog:formData});  
        console.log(formData)  
    }

    updateCatalog = (editCatalog) => {
        this.props.updateCatalogRequest(editCatalog);
    }

    handleInputSearchCatalogChange = e => {   
        let value = e.target.value       
        this.setState({searchCatalog:value});  
    }

    searchCatalog = (searchCatalog) => {
        this.props.searchCatalogRequest(searchCatalog)
    }

    componentDidMount(){
        this.props.fetchCatalogRequest();
    } 

    render(){
        console.log('hi',this.props.updateSuccess)
        return (
            <div className="tab-pane fade show active" id="pills-my-courses" role="tabpanel">
                <div className="table-responsive mt-30">
                    <div>
                        <div className="section3125">
                            <div className="explore_search">
                                <div className="ui search focus">
                                    <div className="ui left icon input swdh11">
                                        <input className="prompt srch_explore" type="text" placeholder="Search for Catalogs..." onChange={this.handleInputSearchCatalogChange} onKeyPress={e=> e.key==='Enter' && this.searchCatalog(this.state.searchCatalog)}/>
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
                                <th cclass="cell-ta" scope="col">Name</th>
                                <th class="cell-ta" scope="col">Subcatalog</th>
                                <th className="text-center" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.catalogs.map((catalog,index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="text-center">{index + 1}</td>
                                            <td class="cell-ta">{catalog.name}</td>
                                            <td class="cell-ta">
                                            {catalog.subCatalogs.map(sub => {
                                                return (
                                                    <div><span className="_5f7g11"> {sub.name}</span></div>
                                                )
                                            } )}
                                            </td>
                                            <td className="text-center"> 
                                                <a  title="Edit" className="gray-s" data-toggle="modal" data-target={'#id'+catalog.id}  onClick={() => this.getCatalog(catalog.id, catalog.name, catalog.description)}><i className="uil uil-edit-alt"></i></a>
                                            </td>
                                            <div className="modal fade"  tabindex="-1" id={'id'+catalog.id} aria-hidden="true">
                                                <div className="modal-dialog modal-lg">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">Edit Catalog</h5>
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
                                                                            <input className="form_input_1" type="hidden" name="id" value={catalog.id}/>
                                                                                <label className="label25">Catalog Name*</label>
                                                                                <input className="form_input_1" type="text" name="name" defaultValue={catalog.name} onChange={this.handleInputEditCatalogChange}/>
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
                                                                                        <textarea rows="3" name="description" defaultValue={catalog.description} onChange={this.handleInputEditCatalogChange}></textarea>
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
                                                            <button type="button" className="main-btn" value={'edit'} data-dismiss="modal" onClick={()=>this.updateCatalog(this.state.editCatalog)}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </tr>);
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
        updateSuccess: state.catalog.updateSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCatalogRequest:() => dispatch (fetchCatalogRequest()),
        searchCatalogRequest:(e) => dispatch (searchCatalogRequest(e)),
        updateCatalogRequest:(e) => dispatch (updateCatalogRequest(e))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Catalog);