import React from "react";
import { connect } from "react-redux";
import { fetchCatalogRequest } from "../../actions/catalog";
import { fetchCourseRequest } from "../../actions/course";
import FooterUser from "./footerUser";


class Contact extends React.Component {
    constructor(){
        super()
       
    }

    componentDidMount(){
        this.props.fetchCourseRequest(0);
    }
    render() {
        return (
            <div  className="wrapper">		
               
                <div  className="contact1256">
                    <div  className="container">
                        <div  className="row">
                            <div  className="col-lg-12">
                                <div  className="title589 text-center">
                                    <h2>Contact us</h2>
                                    <img  className="line-title" src="images/line.svg" alt=""/>
                                </div>
                            </div>					
                            
                            <div  className="col-lg-8">
                                <div  className="contact_map">
                                    <div id="map">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.325642465107!2d106.66413961526037!3d10.786351961958788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ecb37e59e33%3A0xfe7c4d9f94f9e079!2zNTkwIEPDoWNoIE3huqFuZyBUaMOhbmcgOCwgUGjGsOG7nW5nIDExLCBRdeG6rW4gMywgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1647233337652!5m2!1svi!2s" style={{width:"690px", height:"350px" , border:"0"}} allowfullscreen="" loading="lazy"></iframe>
                                    </div>
                                </div>												
                            </div>
                            <div  className="col-lg-4">
                                <div  className="contact_info">
                                    <div  className="checkout_title">
                                        <h4>Contact Information</h4>
                                        <img src="images/line.svg" alt=""/>
                                    </div>
                                    <ul  className="contact_list_info">
                                        <li><div  className="txt_cntct"><span  className="cntct_895"><i  className="uil uil-location-point"></i>Main Address :</span><p>590, Cách Mạng Tháng Tám, P11, Quận 3, TPHCM</p></div></li>
                                        <li><div  className="txt_cntct"><span  className="cntct_895"><i  className="uil uil-envelope"></i>Email Address :</span><p>cursus@gmail.com</p></div></li>
                                        <li><div  className="txt_cntct"><span  className="cntct_895"><i  className="uil uil-mobile-android-alt"></i>Phone Number :</span><p>+911234567890, 01610000000</p></div></li>
                                    </ul>
                                    <div  className="edututs_links_social">
                                        <ul  className="tutor_social_links">
                                            <li><a href="https://www.facebook.com"  className="fb"><i  className="fab fa-facebook-f"></i></a></li>
                                            <li><a href="https://twitter.com/?lang=vi"  className="tw"><i  className="fab fa-twitter"></i></a></li>
                                            <li><a href="https://www.linkedin.com"  className="ln"><i  className="fab fa-linkedin-in"></i></a></li>
                                            <li><a href="https://www.youtube.com"  className="yu"><i  className="fab fa-youtube"></i></a></li>
                                        </ul>
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

export default connect(mapStateToProps,mapDispatchToProps)(Contact)