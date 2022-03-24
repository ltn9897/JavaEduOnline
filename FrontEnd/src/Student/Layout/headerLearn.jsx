import React from "react";
import {Link} from "react-router-dom"
import { fetchCourseRequest } from "../../actions/course";
import {connect}  from "react-redux";
import {fetchDetailUserRequest} from "../../actions/detail"
import {withRouter} from "../../Admin/Auth/withRouter";
import {login, logout} from "../../actions/auth"

class HeaderLearn extends React.Component {
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.fetchDetailUserRequest();
    }

    render() {
        return (
            <div className="lecture-header d-flex">
                
                <div className="lecture-header-left d-flex">
                    <a href="#" className="back-to-curriculum" data-toggle="tooltip" title="" data-original-title="Go to purchased Courses">
                        <i className="fas fa-angle-left"></i>
                    </a>
                    <a className="nav-icon-list d-sm-block d-md-block d-lg-none"><i className="fas fa-list"></i></a>
                </div>
                <div className="lecture-header-right d-flex">
                    <a href="" className="nav-btn disabled">
                        <span className="nav-text">
                            <i className="fas fa-long-arrow-alt-left mr-2"></i>
                            Previous
                        </span>
                    </a>				
                    <a className="nav-btn" href="#">
                        <span className="nav-text">
                            Next						
                            <i className="fas fa-long-arrow-alt-right ml-2"></i>
                        </span>
                    </a>							
                </div>
                <div className="header_right">
                    <ul>
                        <li className="ui dropdown">
                            <a href="#" className="opts_account" title="Account">
                                <img src={this.props.user.avatarImage} alt=""/>
                            </a>
                            <div className="menu dropdown_account">
                                <div className="channel_my">
                                    <div className="profile_link">
                                        <img src={this.props.user.avatarImage} alt=""/>
                                        
                                        <div className="pd_content">
                                            <div className="rhte85">
                                                <h6>{this.props.user.username}</h6>
                                                <div className="mef78" title="Verify">
                                                    <i className='uil uil-check-circle'></i>
                                                </div>
                                            </div>
                                            <span>{this.props.user.email}</span>
                                        </div>		
                                    </div>
                                </div>
                                <div className="night_mode_switch__btn">
                                    <a href="#" id="night-mode" className="btn-night-mode">
                                        <i className="uil uil-moon"></i> Night
                                        <span className="btn-night-mode-switch">
                                            <span className="uk-switch-button"></span>
                                        </span>
                                    </a>
                                </div>
                                
                                <Link to='/detail' className="item channel_item" >View Profile</Link>
                                <Link to='/change-password' className="item channel_item" >Change Password</Link>	
                                	
                                <a href="help.html" className="item channel_item">Help</a>
                                <Link to='/' className="item channel_item" onClick={this.props.logout}>Sign Out</Link>
                            </div>
                        </li> 
                    </ul>
                </div>
            </div>
        );
    } 
};
 
const mapStateToProps = state => {
    return {        
        username: state.auth.username,
        token: state.auth.token,
        user: state.detail.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logout())
            localStorage.removeItem("isLogin");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            this.props.navigate('/index');
            window.location.reload();
        },
        fetchDetailUserRequest:() => dispatch (fetchDetailUserRequest()),
        
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderLearn))