import React from 'react'
import Footer from '../Layout/footer'
import {Link} from "react-router-dom"
import { getUserByIdRequest } from '../../actions/user'
import {connect} from 'react-redux';
import { withRouterParams } from "../../Admin/Auth/withRouter";

class DetailUser extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.params.id,
            detail: [],
        }
    }

    componentDidMount(){
        this.props.getUserByIdRequest(this.state.id);
    }
    render () {
        const { userById } = this.props
        return (
            <div className="wrapper _bg4586">
                <div className="_216b01">
                    <div className="container-fluid">			
                        <div className="row justify-content-md-center">
                            <div className="col-md-10">
                                <div className="section3125 rpt145">							
                                    <div className="row">						
                                        <div className="col-lg-7">
                                            <a href="#" className="_216b22">										
                                                <span><i className="uil uil-cog"></i></span>Setting
                                            </a>
                                            <div className="dp_dt150">						
                                                <div className="img148">
                                                    <img src={userById.avatarImage} alt=""/>										
                                                </div>
                                                <div className="prfledt1">
                                                    <h2>{userById.fullname}</h2>
                                                    <span>{userById.username}</span>
                                                </div>										
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            <div className="rgt-145">
                                                <ul className="tutor_social_links">
                                                    <li><a href="#" className="fb"><i className="fab fa-facebook-f"></i></a></li>
                                                    <li><a href="#" className="tw"><i className="fab fa-twitter"></i></a></li>
                                                    <li><a href="#" className="ln"><i className="fab fa-linkedin-in"></i></a></li>
                                                    <li><a href="#" className="yu"><i className="fab fa-youtube"></i></a></li>
                                                </ul>
                                            </div>
                                            <ul className="_bty149">
                                           
                                                <li><Link to='/users'><button className="studio-link-btn btn500">Back</button></Link></li>
                                                <li><Link to={`/edit-user/${userById.id}`} params={userById.id}><button className="msg125 btn500">Edit</button></Link></li>								
                                            </ul>
                                            
                                        </div>													
                                    </div>							
                                </div>							
                            </div>															
                        </div>
                    </div>
                </div>
                <div className="_215b17">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="course_tab_content">
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="tab-pane fade show active" id="nav-about" role="tabpanel">
                                            <div className="_htg451">
                                                <div className="_htg452">
                                                    <h3>About Me</h3>
                                                    <div className="basic_form">
                                                        <div className="row">
                                                            <div className="col-lg-8">
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <div className="ui search focus mt-30">
                                                                            <div class="row">
                                                                                <div class="col-md-6">
                                                                                    <label>Name</label>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <p>{userById.fullname}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-md-6">
                                                                                    <label>Email</label>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <p>{userById.email}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-md-6">
                                                                                    <label>Phone</label>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <p>{userById.phone}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-md-6">
                                                                                    <label>Adress</label>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <p>{userById.address}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>  
                                                </div>																	
                                            </div>				
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {        
        userById: state.user.userById,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
        getUserByIdRequest:(e) => dispatch (getUserByIdRequest(e))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouterParams(DetailUser));