import React from "react";
import {Link} from "react-router-dom"

class Menu extends React.Component {
    

    render() {
        return(
            <nav className="vertical_nav">
                <div className="left_section menu_left" id="js-menu" >
                    <div className="left_section">
                        <ul>
                            <li className="menu--item">
                                <Link to='/dashboard' className="menu--link" title="Dashboard">
                                    <i className="uil uil-apps menu--icon"></i>
                                    <span className="menu--label">Dashboard</span>
                                </Link>
                            </li>
                            <li className="menu--item">
                                <Link to="detail" className="menu--link" title="Profile">
                                    <i className='uil uil-clipboard-alt menu--icon'></i>
                                    <span className="menu--label">Profile</span>
                                </Link>
                            </li>
                            <li className="menu--item">
                                <Link to="users" className="menu--link" title="User">
                                    <i className='uil uil-user menu--icon'></i>
                                    <span className="menu--label" >User</span>
                                </Link>
                            </li>
                            <li className="menu--item">
                                <Link to="category" className="menu--link" title="Category">
                                    <i className='uil uil-layers menu--icon'></i>
                                    <span className="menu--label">Category</span>
                                </Link>
                            </li>
                            <li className="menu--item">
                                <Link to="courses" className="menu--link" title="Courses">
                                    <i className='uil uil-book-alt menu--icon'></i>
                                    <span className="menu--label">Courses</span>
                                </Link>
                            </li>
                            <li className="menu--item">
                                <Link to="orders" className="menu--link" title="Orders">
                                    <i class='uil uil-shopping-cart-alt menu--icon'></i>
                                    <span className="menu--label" >Order</span>
                                </Link>
                            </li>
                            
                            
                        </ul>
                    </div>
                    <div className="left_footer">
                        <ul>
                            <li><Link to ="/privacy">Privacy Policy</Link></li>
                        </ul>
                        <div className="left_footer_content">
                            <p>© 2022 <strong>Cursus</strong>. All Rights Reserved.</p>
                        </div>
                    </div>
                    {/* <div className="left_section pt-2">
                        <ul>
                            <li className="menu--item">
                                <a href="setting.html" className="menu--link" title="Setting">
                                    <i className='uil uil-cog menu--icon'></i>
                                    <span className="menu--label">Setting</span>
                                </a>
                            </li>
                            <li className="menu--item">
                                <a href="feedback.html" className="menu--link" title="Send Feedback">
                                    <i className='uil uil-comment-alt-exclamation menu--icon'></i>
                                    <span className="menu--label">Send Feedback</span>
                                </a>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </nav>
        );
    }
};

export default Menu;