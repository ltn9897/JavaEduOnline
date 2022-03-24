import React from "react";
import {Link} from "react-router-dom"

class FooterUser extends React.Component {
    render() {
        return(
            <footer className="footer mt-40">
                <div className="container-fluid">
                    <div className="row">					
                        <div className="col-lg-12">
                            <div className="item_f1">
                                <Link to="/privacy">Copyright Policy</Link>
                                <Link to="/privacy">Terms</Link>
                                <Link to="/privacy">Privacy Policy</Link>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="footer_bottm">
                                <div className="row">
                                    <div className="col-md-6">
                                        <ul className="fotb_left">
                                            <li>
                                                <a href="index.html">
                                                    <div className="footer_logo">
                                                        <img src="images/logo1.svg" alt=""/>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <p>© 2022 <strong>Cursus</strong>. All Rights Reserved.</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="edu_social_links">
                                            <a href="https://www.facebook.com"><i className="fab fa-facebook-f"></i></a>
                                            <a href="https://twitter.com/?lang=vi"><i className="fab fa-twitter"></i></a>
                                            <a href="https://www.linkedin.com"><i className="fab fa-google-plus-g"></i></a>
                                            <a href="https://www.linkedin.com"><i className="fab fa-linkedin-in"></i></a>
                                            <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                                            <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
                                            <a href="https://www.pinterest.com/"><i className="fab fa-pinterest-p"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
};

export default FooterUser;