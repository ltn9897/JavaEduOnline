import React from "react";
import { connect } from "react-redux";
import { fetchCatalogRequest } from "../../actions/catalog";
import { fetchCourseRequest } from "../../actions/course";
import FooterUser from "./footerUser";

class Report extends React.Component {
    constructor(){
        super()
       
    }

    componentDidMount(){
        this.props.fetchCourseRequest(0);
    }
    render() {
        return (
            <div className="wrapper">
                <div className="sa4d25">
                    <div className="container-fluid">			
                        <div className="row">
                            <div className="col-lg-12">
                                <h2 className="st_title"><i className='uil uil-windsock'></i> Report history</h2>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="report_history">
                                            <h4>Thanks for reporting</h4>
                                            <p>Any member of the Edututs+ community can flag content to us that they believe violates our Community Guidelines. When something is flagged, it’s not automatically taken down. Flagged content is reviewed in line with the following guidelines:</p>
                                            <ul>
                                                <li><p>Content that violates our Community Guidelines is removed from Edututs+.</p></li>
                                                <li><p>Content that may not be appropriate for all younger audiences may be age-restricted.</p></li>
                                            </ul>
                                            Learn more about reporting content on Edututs+.
                                            <span>You haven't submitted any reports.</span>
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
        cartItems: state.cart.items,
        catalogs: state.catalog.catalogs,
    }
}

const mapDispatchToProps = dispatch => {
    return {
     
        fetchCourseRequest:(e) => dispatch (fetchCourseRequest(e)),
        fetchCatalogRequest:() => dispatch (fetchCatalogRequest()),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Report)