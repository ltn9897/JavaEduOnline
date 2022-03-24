import React from "react";
import Footer from '../Layout/footer';
import { Link } from 'react-router-dom';
import Catalog from './catalog';
import SubCatalog from './subCatalog';
import Success from "../../Alert/success";

class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render(){
        return (
            <div className="wrapper" >
                <div className="sa4d25">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2 className="st_title"><i className='uil uil-layers'></i> Category</h2>
                            </div>
                            <div className="col-md-12">
                                <div className="card_dash1">
                                    <div className="card_dash_left1">
                                        <i className='uil uil-layers'></i>
                                        <h1>Jump Into Catalog Creation</h1>
                                    </div>
                                    <div className="card_dash_right1">
                                        <Link to="/add-catalog"><button className="create_btn_dash">Create New Catalog</button></Link>
                                    </div>
                                </div>
                            </div>		
                        </div> 
                        <div  id="success" style={{display:"none"}}><Success name="Success"/></div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="my_courses_tabs">
                                    <ul className="nav nav-pills my_crse_nav" id="pills-tab" role="tablist">
                                        <li className="nav-item col-md-6" style={{paddingRight:"0px", paddingLeft:"0px", textAlign:"center"}}>
                                            <a className="nav-link active" id="pills-my-courses-tab" data-toggle="pill" href="#pills-my-courses" role="tab" aria-controls="pills-my-courses" aria-selected="true"><i class="uil uil-book-alt"></i>Catalog</a>
                                        </li>
                                        <li className="nav-item col-md-6" style={{paddingRight:"0px", paddingLeft:"0px", textAlign:"center"}}>
                                            <a className="nav-link" id="pills-my-purchases-tab" data-toggle="pill" href="#pills-my-purchases" role="tab" aria-controls="pills-my-purchases" aria-selected="false"><i class="uil uil-book-alt"></i>Subcatalog</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <Catalog/>
                                        <SubCatalog/>                 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Category;