import React from 'react';

class Error extends React.Component {
    render() {
        return (
            <div style={{backgroundColor: "#212529"}}>		
                <div className="cmtk_dt">
                                    <h1 className="title_404">404</h1>
                                    <h4 className="thnk_title1">The page you were looking for could not be found.</h4>
                                    <a href="index.html" className="bk_btn">Go To Homepage</a>
                                </div>
                                <div className="tc_footer_main"  style={{backgroundColor: "#212529"}}>
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
                                    <div className="tc_footer_right"  style={{backgroundColor: "#212529"}}>
                                        <p>© 2020 <strong>Cursus</strong>. All Rights Reserved.</p>
                                    </div>
                                </div>	
	        </div>	
        );
    }
}

export default Error;