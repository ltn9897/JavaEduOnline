import React from "react";
import {Link} from "react-router-dom";
import { fetchCourseRequest } from "../../actions/course";
import {connect}  from "react-redux";
import { fetchCatalogRequest} from "../../actions/catalog";

class HeaderGuest extends React.Component {
    constructor(){
        super()
       
    }

    componentDidMount(){
        this.props.fetchCourseRequest(0);
    }
    render() {
        return (
            <div class="coming_soon_style">
            <div className="wrapper coming_soon_wrapper">		
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="cmtk_group">
						<div className="ct-logo">
							<a href="index.html"><img src="/images/ct_logo.svg" alt=""/></a>
						</div>
						<div className="cmtk_dt">
							<h1 className="title_404">404</h1>
							<h4 className="thnk_title1">The page you were looking for could not be found.</h4>
							<a href="index.html" className="bk_btn">Go To Homepage</a>
						</div>
						<div className="tc_footer_main">
							<div className="tc_footer_left">
								<ul>
									<li><a href="about_us.html">About</a></li>
									<li><a href="press.html">Press</a></li>
									<li><a href="contact_us.html">Contact Us</a></li>
									<li><a href="coming_soon.html">Advertise</a></li>
									<li><a href="coming_soon.html">Developers</a></li>
									<li><a href="terms_of_use.html">Copyright</a></li>
									<li><a href="terms_of_use.html">Privacy Policy</a></li>
									<li><a href="terms_of_use.html">Terms</a></li>
								</ul>						
							</div>
							<div className="tc_footer_right">
								<p>© 2020 <strong>Cursus</strong>. All Rights Reserved.</p>
							</div>
						</div>
					</div> 	
				</div>	
			</div>	
		</div>		
	</div>	</div>
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

export default connect(mapStateToProps,mapDispatchToProps)(HeaderGuest)